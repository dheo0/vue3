import { createStore } from 'vuex'
import { defineAsyncComponent, markRaw } from 'vue'
import { MODULE_NAME as sampleModuleName, store as sampleStore } from '@modules/sample/sampleStore'
import { MODULE_NAME as memberModuleName, store as memberStore } from '@modules/member/memberStore'

const state = {
  sidePrev: [],
  temp: [],
  currentSidebar: null,
  slideOptions: {},
  isLayerOpen: false,
  sideIsOpen: false,
  imgFiles: []
}
const getters = {}
const mutations = {
  ADD_UPLOAD_ITEMS (state, payload) {
    state.imgFiles = payload
  },
  // 사이드패널 열릴때 또는 사이드패널 안에서 페이지 이동시 페이지 히스토리 저정
  ADD_HISTORY (state, payload) {
    state.temp.push(payload)
    state.sidePrev = state.temp.filter((v, i) => state.temp.indexOf(v) === i)
    state.sideIsOpen = true
    state.slideOptions = payload.options
    state.currentSidebar = markRaw(defineAsyncComponent(() => import(`@pages/${payload.path}/sideContents/${payload.pageName}`)))
    /**
     *
     state.currentSidebar = markRaw(defineAsyncComponent( () => ({
        // The component to load (should be a Promise)
        component: import(`@pages/${payload.path}/sideContents/${payload.pageName}`),
        // A component to use while the async component is loading
        loading: loadingComponent,
        // A component to use if the load fails
        error: ErrorComponent,
        // Delay before showing the loading component. Default: 200ms.
        delay: 200,
        // The error component will be displayed if a timeout is
        // provided and exceeded. Default: Infinity.
        timeout: 3000
      })))
     */
  },
  // 사이드패널 닫을 떄 히스토리 초기화
  REMOVE_ALL_HISTORY (state) {
    state.temp = []
    state.sidePrev = []
    state.slideOptions = {}
    state.sideIsOpen = false
  },
  // 사이드패널에서 뒤로가기(이전) 버튼 클릭시
  REMOVE_PAGE (state, payload) {
    state.temp.pop()
    state.sidePrev.pop()
    state.slideOptions = payload.options
    state.currentSidebar = markRaw(defineAsyncComponent(() => import(`@pages/${payload.path}/sideContents/${payload.pageName}`)))
  },
  UPDATE_HISTORY (state, payload) {
    state.slideOptions = payload.options
  },
  OPEN_LAYER_POP (state) {
    state.isLayerOpen = true
  }
}
const actions = {}
const modules = {
  [sampleModuleName]: sampleStore,
  [memberModuleName]: memberStore // 회원 관련 스토어
}

const store = createStore({
  state,
  getters,
  mutations,
  actions,
  modules,
  strict: process.env.NODE_ENV !== 'prd'
})

export default store
