<template>
  <div class="lp_wrap lp-FO_10M010000">
    <div class="lp_body">
      <div class="layout">
        <div class="search_wrap type-search">
          <comp-input
            v-model="searchKeyword"
            class-name="input-search"
            :placeholder="$t('ML00914')"
            use-form-box-wrap="false"
            @update:input="handleSearchKeywordChange"
          />
          <a
            href="javascript:;"
            @click="handleSubmitSearchKeywordClick"
          >{{ $t('ML00913') }}</a>
        </div>
        <div class="list_wrap type-search-best">
          <h3>{{ $t('ML00915') }}</h3>
          <p>
            <a
              v-for="(keyword, idx) in recommendKeywords"
              :key="idx"
              href="javascript:;"
              @click="handleButtonClick(keyword.name)"
            >{{ keyword.name }}</a>
          </p>
        </div>
        <div class="list_wrap type-search-history">
          <h3>{{ $t('ML00916') }}</h3>
          <ul>
            <li
              v-for="(keyword, idx) in reverseRecent"
              :key="idx"
            >
              <a
                href="javascript:;"
                class="search"
              >
                <span class="txt">{{ keyword.name }}</span>
                <span class="date">{{ keyword.createdDate }}</span>
              </a>
              <a
                href="javascript:;"
                class="del"
                @click="() => handleDeleteRecent(keyword.id)"
              >{{ $t('ML00128') }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="layout">
        <div class="banner_wrap type-search m_t_10">
          <a
            href="javascript:;"
            title=""
            @click="handleButtonClick('banner 1')"
          >
            <img
              src="~@images/mo/FO_10M010000/img_banner_1@3x.png"
              alt="banner1"
            >
          </a>
        </div>
        <div class="banner_wrap type-search">
          <a
            href="javascript:;"
            title=""
            @click="handleButtonClick('banner 2')"
          >
            <img
              src="~@images/mo/FO_10M010000/img_banner_2@3x.png"
              alt="banner2"
            >
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import CompInput from '@comp/common/Input/Input'

export default {
  components: {
    CompInput
  },
  data () {
    return {
      searchKeyword: '',
      recentKeywords: [],
      recommendKeywords: [
        { id: 'recommend-keyword-0', name: '폴로' },
        { id: 'recommend-keyword-1', name: '나파밸리' },
        { id: 'recommend-keyword-2', name: 'Prada' },
        { id: 'recommend-keyword-3', name: 'Hermes' },
        { id: 'recommend-keyword-4', name: 'Kinda' },
        { id: 'recommend-keyword-5', name: 'Adidas' },
        { id: 'recommend-keyword-6', name: 'A.P.C' }
      ],
      indexNumber: 0,
      temp: []
    }
  },
  computed: {
    reverseRecent () {
      return this.recentKeywords === [] ? this.recentKeywords : this.recentKeywords.reverse()
    }
  },
  mounted() {
    this.$updateSlideOptions({
      title: 'ML00913'
    })
    const getKeyword = window.localStorage.getItem('recentKeyword') || []
    console.log(getKeyword)
    if (getKeyword.length > 0) {
      this.recentKeywords = JSON.parse(getKeyword)
    }
  },
  methods: {
    handleButtonClick(val) {
      console.log(val, 'click')
    },
    handleDeleteClick(idx) {
      console.log('delete click', idx)
    },
    handleSearchKeywordChange(value) {
      this.searchKeyword = value
    },
    handleSubmitSearchKeywordClick() {
      console.log(this.searchKeyword, ' 검색')
      this.keyword = this.searchKeyword
      // 최근검색어
      let recent = window.localStorage.getItem('recentKeyword') || []
      console.log(recent)
      const list = {
        id: recent.length,
        name: this.keyword,
        date: new Date()
      }

      if(this.keyword.length > 0) {
        if (recent.length > 0) {
          recent = JSON.parse(recent)
        }
        const isSame = recent.some((item) => item.name === this.keyword)
        if (isSame) return false
        if (recent.length > 10) {
          recent.shift()
        }
        recent.push(list)
        window.localStorage.setItem('recentKeyword', JSON.stringify(recent))
      }
      this.recentKeywords = JSON.parse(window.localStorage.getItem('recentKeyword'))
      // const recentKeyword = []
    },
    handleDeleteRecent(index) {
      const items = JSON.parse(window.localStorage.getItem('recentKeyword'))
      const result = items.filter((item) => item.id !== index)
      window.localStorage.setItem('recentKeyword', JSON.stringify(result))
      this.recentKeywords = JSON.parse(window.localStorage.getItem('recentKeyword'))
    }
  }
}
</script>

<style lang="scss" scoped>
.lp-FO_10M010000 .lp_body {
    padding: 0 0 32px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
