<template>
  <!--quick_layout 시작-->
  <div id="quick_layout">
    <!--filter_wrap 시작-->
    <div
      v-if="showFilterMenu"
      class="filter_wrap"
    >
      <ul>
        <li
          v-for="filter in filters"
          :key="filter.id"
          :class="[filter.class, { active: filter.name === currentFilter?.name}]"
          @click="() => handleFilterClick(filter)"
        >
          <a
            class="btn-open"
            data-filter="category_wrap"
          >{{ $t(filter.name) }}</a>
          <div
            class="list"
            @click="(e) => e.stopPropagation()"
          >
            <strong>{{ filter.name }}</strong>
            <div class="ckGroup">
              <span
                v-for="subItem in filter.subItems"
                :key="subItem.id"
              >
                <input
                  :id="subItem.name"
                  v-model="checkedSubItems"
                  type="checkbox"
                  :value="subItem.name"
                >
                <label
                  :for="subItem.name"
                >{{ subItem.name }}</label>
              </span>
            </div>
            <a
              href="javascript:;"
              @click="handleFilterBoxCloseClick"
            >닫기</a>
          </div>
        </li>
      </ul>
    </div>
    <!--filter_wrap 끝-->
    <!--quick_wrap 시작-->
    <div class="quick_wrap">
      <a
        class="btn-open"
        href="javascript:;"
      >퀵메뉴 열기</a>
      <div class="list">
        <ul>
          <li>
            <a
              href="javascript:;"
              class="qList-1"
              @click="openMenu($event, 'buy', 'Step1')"
            >
              {{ $t('ML00885') }}
            </a>
          </li>
          <li>
            <a
              href="javascript:;"
              class="qList-2"
              @click="openMenu($event, 'sell', 'Step1')"
            >
              {{ $t('ML00886') }}
            </a>
          </li>
          <li>
            <a
              href="javascript:;"
              class="qList-3"
              @click="openMenu($event, 'deliveryAgency', 'Step1')"
            >
              {{ $t('ML00887') }}
            </a>
          </li>
          <li>
            <a
              href="javascript:;"
              class="qList-4"
              @click="openMenu($event, 'story', '')"
            >
              {{ $t('ML00888') }}
            </a>
          </li>
        </ul>
        <a
          class="btn-close"
          href="javascript:;"
        >퀵메뉴 닫기</a>
      </div>
      <a
        class="btn-top"
        href="javascript:;"
      >상단 이동</a>
    </div>
    <!--quick_wrap 끝-->
    <!--history_wrap 시작-->
    <div
     :class="['history_wrap', { 'open' : historyOpen }]"
    >
      <a
        :class="['btn-open', { 'open': sampleList.length > 1 } ]"
        href="javascript:;"
        v-if="sampleList.length > 1"
        @click="recentMore"
      >더보기</a>
      <div class="list">
        <ul>
          <li
            v-for="searchItem in sampleList"
            :key="searchItem.id"
          >
            <a
              class="thumb crop-out"
              href="javascript:;"
              title=""
            ><img
              :src="searchItem.src"
              alt=""
            ></a>
          </li>
        </ul>
        <a
          class="btn-close"
          href="javascript:;"
          @click="handleCloseHistory"
        >닫기</a>
      </div>
    </div>
    <!--history_wrap 끝-->
  </div>
  <!--quick_layout 끝-->
</template>

<script>
import { getCurrentInstance } from 'vue'
import { filterData, searchItemHistoryData } from '@constants/dummyData'
import pcJs from '@comp/js/pc.js'

export default {
  setup() {
    const app = getCurrentInstance()
    const globalFnc = app.appContext.config.globalProperties
    const openMenu = (elem, path, pageName, options) => {
      globalFnc.$changePage(path, pageName, options)
    }
    
    return {
      openMenu
    }
  },
  data() {
    return {
      showFilterMenu: true,
      currentFilter: null,
      checkedSubItems: [],
      filters: filterData,
      historyOpen: false,
      searchItems: this.$store.state.recentItem
    }
  },
  watch: {
    checkedSubItems(newValue) {
      console.log(newValue)
    },
    sampleList: {
      handler(newVal){
        console.log(newVal)
      },
      deep: true
    }
  },
  computed: {
    sampleList: function() {
      return this.$store.getters['recentList']
    }
  },
  created () {
    this.showFilterMenu = this.$route.fullPath === '/'
  },
  mounted() {
    // this.recentItem = JSON.parse(window.localStorage.getItem('recentItems'))
    // const recentItems = window.localStorage.getItem('recentItems') || []
    // console.log(typeof recentItems)
    // this.searchItems = JSON.parse(recentItems)
    pcJs.quickMenu.init('#quick_layout .quick_wrap')
   // pcJs.quickMenu.init('#quick_layout .history_wrap')
  },
  methods: {
    handleCloseHistory() {
      this.historyOpen = false
    },
    recentMore() {
      console.log('abc')
      this.historyOpen = true
    },
    handleFilterClick(filter) {
      this.currentFilter?.name === filter.name
        ? this.currentFilter = null
        : this.currentFilter = filter
    },
    handleFilterBoxCloseClick() {
      this.currentFilter = null
    }
  }
}
</script>