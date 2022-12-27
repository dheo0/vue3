<template>
  <div class="lp_body">
    <comp-step />
    <div class="layout">
      <!--form-list 시작-->
      <ul class="form-list m_t_24">
        <li class="form-box">
          <!-- 다국어 : 코드 텍스트 상이(ML00075) -->
          <comp-image-loader
            title="상품 사진"
            @uploadImageChange="handleUploadImageChange"
          />
        </li>
        <li class="form-box type-search m_t_33">
          <div class="grid-row">
            <div class="row1">
              <label for="">{{ $t('ML00080') }} <span>{{ $t('ML00081') }}</span></label>
            </div>
            <div class="row2">
              <a
                href="javascript:;"
                class="type-link1"
              >{{ $t('ML00082') }}</a>
            </div>
          </div>
          <div class="searchPL type-url">
            <div class="multiForm">
              <div class="multi-item row1">
                <input
                  type="text"
                  class="input-search"
                  :placeholder="$t('ML00083')"
                >
              </div>
              <a
                href="javascript:;"
                class="multi-item row2 btn-add"
              >추가</a>
            </div>
          </div>
        </li>
      </ul>
      <!--form-list 끝-->
    </div>
  </div>
  <div class="lp_foot">
    <div class="layout">
      <comp-button
        v-if="isEdit" 
        button-style-class="type1"
        :name="$t('ML00115')"
        @btnClick="$changePage('buy', 'Confirm')"
      />
      <comp-button-wrap
        v-else
        class-name="grid-row bs-7"
        button-size-class="type-48"
      >
        <comp-button
          button-style-class="type2"
          :name="$t('ML00057')"
          @btnClick="$prevPage('buy', 'Step3')"
        />
        <comp-button
          button-style-class="type1"
          :name="$t('ML00046')"
          @click="upload()"
        />
      </comp-button-wrap>
    </div>
  </div>
</template>

<script>
import CompButtonWrap from '@comp/common/ButtonWrap'
import CompButton from '@comp/common/Button'
import CompImageLoader from '@comp/common/ImageLoader'
import CompStep from '@comp/common/SidePanel/Step'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  components: {
    CompButtonWrap,
    CompButton,
    CompImageLoader,
    CompStep
  },
  setup() {
    const store = useStore()
    const passedSlideOptions = store.state.temp[store.state.temp.length - 1]?.options
    const isEdit = !!passedSlideOptions?.isEdit
    
    return { isEdit }
  },
  mounted() {
    const pageNum = { currentStep: 4, totalStep: 5 }
    
    if(this.isEdit) {
      this.$updateSlideOptions({
        ...pageNum,
        title: '사줘요 상세 수정', 
        description: `${this.$t('ML00113')},${this.$t('ML00114')}`,
        slideImgPath: 'bg28' 
      })
    } else {
      this.$updateSlideOptions({
        ...pageNum,
        slideImgPath: 'bg4', 
        // 다국어: 중복
        title: 'PL00016', 
        description: `${this.$t('ML00072')},${this.$t('ML00073')},${this.$t('ML00074')}`
      })
    }
  },
  computed: {
    uploadImages() {
      return this.$store.state.imgFiles
    }
  },
  methods: {
    upload() {
      const formData = new FormData()
      formData.append('img', this.uploadImages)
      for (let i = 0; i < this.uploadImages.length; i++) {
        formData.append('img', this.uploadImages.length)
      }
      for (let value of formData.values()) {
        console.log(value);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@styles/template.scss';
</style>
