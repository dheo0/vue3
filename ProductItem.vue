<template>
  <li
    v-for="product in productList"
    :id="product.id"
    :key="product.id"
    class="product-item"
  >
    <a
      :id="product.id"
      href="javascript:;"
      class="likeit"
      :class="{ active: product.isLikeActive }"
      @click="handleLikeClick"
    >{{ product.likeCount }}</a>
    <a
      href="javascript:"
      @click="handleItemClick(product.id, product.type, product.thumbnail, product.name)"
      class="product"
    >
      <span class="thumb crop-out">
        <img
          :src="product.thumbnail"
          alt=""
        >
        <span :class="[ $isMobile() || isRecommend ? 'badge20' : 'badge26']">
          <span :class="['badge', product.type === 'BUY' ? 't-buy' : 't-sell']">{{ product.type === 'BUY' ? '사줘요' : '팔아요' }}</span>
          <span
            v-if="product.isMatching"
            class="badge t-matching flag-usa"
          >{{ $t('ML00007') }}</span>
        </span>
      </span>
      <span class="name">{{ product.name }}</span>
      <span v-if="!isRecommend">
        <span v-if="product.type === 'BUY'">
          <span :class="[ $isMobile() ? 'badge20' : 'badge26']">
            <span class="badge t-txt">D-{{ product.dueDate }}</span>
            <span class="badge t-txt">{{ $t('ML00008', {n: product.matchCount }) }}</span>
          </span>
        </span>
        <span v-else>
          <span
            class="won"
          >{{ product.price }}<span>{{ product.currency }}</span></span>
        </span>
      </span>
    </a>
    <a
      v-if="!isRecommend"
      href="javascript:;"
    >
      <span :class="[ $isMobile() ? 'badge13' : 'badge16']">
        <span class="badge flag-kor">{{ product.towner.townerId }}</span>
      </span>
      <span class="badge24">
        <span v-if="product.towner.badges.length">
          <span
            v-for="(badge, index) in product.towner.badges"
            :key="index"
            :class="['badge', `t-${badge.type}`]"
          > {{ badge.label }}</span>
        </span>
        <span v-else>
          <!-- 다국어 : 코드 정의 없음 -->
          <span class="badge t-nobadge">뱃지를 등록해 보세요</span>
        </span>
      </span>
    </a>
  </li>
</template>

<script>
export default {
  components: {},
  props: {
    productList: {
      type: Object,
      default: () => {
        return {
          thumbnail: ''
        }
      }
    },
    isRecommend: {
      type: Boolean,
      default: false
    },
    recentItems: []
  },
  mounted() {
    const recentItems = window.localStorage.getItem('recentItems')
    if (this.$isNull(recentItems)) {
      window.localStorage.setItem('recentItems', [])
    }
  },
  data() {  
    return {
      isLikeActive: false
    }
  },
  methods: {
    handleLikeClick(e) {
      e.preventDefault()
      e.target.classList.toggle('active')
    },
    handleItemClick(id, type, thumbnail, name) {
      const list = {
        id,
        type,
        src: thumbnail,
        name
      }
      this.$store.commit('SET_ITEMS', list)
    }
  }
}
</script>
