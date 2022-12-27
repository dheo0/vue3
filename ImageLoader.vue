<template>
  <label v-if="title">{{ title }}</label>
  <div
    class="file_wrap type-picture-add attachPL m_t_9"
    data-type="img"
  >
    <div class="btn">
      <label for="addFile">{{ $t('ML00076') }} <span>{{ $t('ML00077', {n: maxCount}) }}</span></label>
      <input
        id="addFile"
        type="file"
        name="img"
        multiple
        :value="inputValue"
        @change="handleFileUpload"
      >
    </div>
    <ul
      v-if="uploadImages.length > 0"
      class="file"
    >
      <li
        v-for="(image, idx) in uploadImages"
        :key="image"
        :class="`file-${idx}`"
      >
        <span class="thumb crop-out"><img :src="image"></span>
        <input
          :id="`fileCk-${idx}`"
          v-model="selectedImage"
          name="fileCk"
          type="radio"
          :value="`${idx}`"
        >
        <label
          :for="`fileCk-${idx}`"
        >대표이미지</label>
        <a
          class="btn-del"
          href="javascript:;"
          @click="() => handleDeleteImageClick(idx)"
        >삭제</a>
        <a
          v-if="useEdit"
          class="btn-edit"
          href="javascript:;"
          @click="checkItem(idx)"
        >편집</a>
      </li>
    </ul>
    <button @click="uploadTest">
      업로드 테스트
    </button>
    <p class="type-error">
      {{ allowTypeMessage }} 파일 형태로 등록 가능 합니다.<br>건당 10MB 이하 용량, 가로세로 600픽셀 최적화
    </p>
  </div>

  <!-- 사진 편집 -->
  <div
    v-if="isShow"
    class="crop-wrap"
  >
    <div class="lp_wrap">
      <div class="lp_head type2">
        <button
          class="btn-prev"
          type="button"
          @click="cancel"
        >
          이전
        </button>
        <h2 class="tit">
          사진 편집
        </h2>
        <button
          class="lp_close"
          type="button"
          @click="cancel"
        >
          닫기
        </button>
      </div>
      <div class="lp_body">
        <div class="layout">
          <div class="txt_wrap type-txt18-center m_t_20">
            <!-- 다국어 : 코드 정의 없음 -->
            <p>아이템이 잘 보일 수 있게<br>위치를 조정해 보세요.</p>
          </div>
          <div class="m_t_20 square-aspect-ratio">
            <vue-cropper
              ref="cropper"
              :aspect-ratio="1 / 1"
              :src="imgSrc"
              :zoomable="false"
              :zoom-on-wheel="false"
              preview=".preview"
            />
          </div>
          
          <!-- preview 영역 - 디자인에 없음 -->
          <div class="preview-area m_t_20">
            <div class="preview" />
          </div>
        </div>
      </div>
      <div class="lp_foot">
        <div class="layout">
          <comp-button-wrap
            class-name="grid-row bs-8 type-full"
          >
            <!-- 다국어 : 코드 정의 없음 -->
            <comp-button
              button-style-class="type2"
              :name="'취소'"
              @btnClick="cancel"
            />
            <!-- 다국어 : 코드 정의 없음 -->
            <comp-button
              button-style-class="type1"
              :name="'적용'"
              @btnClick="cropImage"
            />
          </comp-button-wrap>
        </div>
      </div>
    </div>
  </div>
  <!-- 사진 편집 end -->
</template>
<script>
import VueCropper from 'vue-cropperjs'
import 'cropperjs/dist/cropper.css'
import axios from 'axios'
import CompButtonWrap from '@comp/common/ButtonWrap'
import CompButton from '@comp/common/Button'
import store from '@store/store'

export default {
  components: {
    VueCropper,
    CompButtonWrap,
    CompButton
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    maxCount: {
      type: Number,
      default: 10
    },
    allowTypes: {
      type: Array,
      default: () => ['jpg', 'jpge', 'png', 'gif']
    },
    useEdit: {
      type: Boolean,
      default: true
    },
    images: {
      type: Array,
      default: () => []
    }
  },
  emits: ['uploadImageChange'],
  data() {
    return {
      uploadImages: this.images, // origin images
      saveImages: [],
      max: this.maxCount,
      inputValue: '',
      imgSrc: require('@assets/images/placeholder-img.png'),
      cropImg: '',
      data: null,
      imgFiles: [], // origin blobs
      isShow: false,
      selectedIdx: 0,
      selectedImage: '',
      blobImg: ''
    }
  },
  computed: {
    allowTypeMessage() {
      return this.allowTypes.join(', ')
    }
  },
  watch: {
    uploadImages(value) {
      this.$emit('uploadImageChange', value)
    },
    selectedImage(value) {
      this.selectedImage = value // 대표이미지
    }
  },
  methods: {
    handleFileUpload(e) {
      const files = e.target.files
      console.log('files', files)
      for (let i = 0; i < files.length; i++) {
        const imageFile = e.target.files[i]
        console.log('extension', imageFile)
        if(imageFile) {
          const _name = e.target.value.split('/').pop().split('\\').pop() || imageFile.name
          const _extension = _name.split('.').pop().toLowerCase()
          if(this.allowTypes.every((type) => type !== _extension)) {
            alert(`확장자가 "${this.allowTypeMessage}" 인 이미지 파일만 업로드 가능합니다.`)
            return
          }
          const allImages = this.uploadImages.length + files.length
          if (allImages > this.max && this.max) {
            alert(`최대 ${this.max}건 이하까지 등록 가능합니다.`)
            return
          }
          const reader = new FileReader()
          reader.onload = () => {
            this.uploadImages = [...this.uploadImages, reader.result] // 썸네일 용도
            this.saveImages = [...this.saveImages, imageFile] // 업로드 용도
            this.$store.commit('ADD_UPLOAD_ITEMS', this.saveImages)
            // blob 파일로 저장
            const blob = this.dataURItoBlob(this.uploadImages[i])
            this.imgFiles.push(blob)
            this.inputValue = ''
            console.log(this.saveImages)
          }
          reader.readAsDataURL(imageFile)
        }
      }
    },
    uploadTest() {
      const formData = new FormData()
      // formData.append('img', this.uploadImages[4])
      for (let i = 0; i < this.saveImages.length; i++) {
        formData.append('img', this.saveImages[i])
      }
      /**
       * TODO: 추후 업로드 URL S3로 변경
       */
      axios.post('http://localhost:3000/users/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          console.log('success', res)
          // this.clear()
        })
        .catch((err) => {
          console.log(err)
          // this.clear()
        })
    },
    dataURItoBlob(dataURI) {
      const byteString = atob(dataURI.split(',')[1])
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      const ab = new ArrayBuffer(byteString.length)
      const ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      const blob = new Blob([ab], { type: mimeString })
      return blob
    },
    handleDeleteImageClick(imageIdx) {
      this.uploadImages = this.uploadImages.filter((_, idx) => idx !== imageIdx)
      this.saveImages = this.saveImages.filter((_, idx) => idx !== imageIdx)
    },
    cropImage() {
      const canvas = this.$refs.cropper.getCroppedCanvas()
      if (!HTMLCanvasElement.prototype.toBlob) {
        Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
          value(callback, type, quality) {
            const canvas = this
            setTimeout(() => {
              const binStr = atob(canvas.toDataURL(type, quality).split(',')[1])
              const len = binStr.length
              const arr = new Uint8Array(len)
              for (let i = 0; i < len; i++) {
                arr[i] = binStr.charCodeAt(i)
              }
              callback(new Blob([arr], { type: type || 'image/png' }))
            })
          }
        })
      }
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob)
        this.imgFiles[this.selectedIdx] = url
        console.log(this.imgFiles)
        this.isShow = false
      })
    },
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY)
    },
    checkItem(idx) {
      this.setImage(idx)
      this.selectedIdx = idx
    },
    setImage(idx) {
      this.isShow = true
      const file = this.imgFiles[idx]
      const myFile = new File([file], 'image.jpeg', {
        type: file.type
      })

      if (myFile.type.indexOf('image') === -1 || myFile.name.indexOf('image') === -1) {
        // alert('Please select an image file')
        return
      }
      if (typeof FileReader === 'function') {
        const reader = new FileReader()
        reader.onload = (event) => {
          this.imgSrc = event.target.result
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result)
        }
        reader.readAsDataURL(myFile)
      } else {
        alert('Sorry, FileReader API not supported')
      }
    },
    cancel() {
      this.isShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
.crop-wrap {
  position: fixed;
  background: #fff;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index: 9999;
  padding: 32px 19px;
  overflow-y: auto;
}
.square-aspect-ratio {
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
:deep {
  .lp_foot button {
    font-weight: 300;
    color: white;
    &.type2 {
      font-weight: inherit;
      color: #02a2c9 !important;
    }
  }
}
.preview-area {
  .preview {
    margin: 0 auto;
    width: calc(372px * (9 / 16));
    height: calc(372px * (9 / 16));
    border: 2px solid #d1d1d1;
    overflow: hidden;
  }
}

:deep .cropper-view-box {
  outline: none;
}
:deep .cropper-modal {
  opacity: 0.4;
}
:deep .cropper-line {
  background-color: transparent;
  opacity: 1;
  &.line-e {
    right: -1px;
    top: 0;
    width: 0;
    border-right: 1px dashed #fff;
  }
  &.line-n {
    height: 0;
    border-top: 1px dashed #fff;
    left: 0;
    top: -1px;
  }
  &.line-w {
    left: -1px;
    top: 0;
    width: 0;
    border-left: 1px dashed #fff;
  }
  &.line-s {
    bottom: -1px;
    height: 0;
    border-bottom: 1px dashed #fff;
    left: 0;
  }
}
:deep .cropper-point {
  background-color: #fff;
  height: 3px;
  opacity: 1;
  width: 3px;
  &.point-e {
    margin-top: -6px;
    right: -3px;
    top: 50%;
    height: 12px;
  }  
  &.point-n {
    left: 50%;
    margin-left: -6px;
    top: -3px;
    width: 12px;
  }  
  &.point-w {
    left: -3px;
    margin-top: -6px;
    top: 50%;
    height: 12px;
  }  
  &.point-s {
    bottom: -3px;
    left: 50%;
    margin-left: -6px;
    width: 12px;
  }  
  &.point-ne {
    right: -3px;
    top: -3px;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 12px;
      height: 100%;
      background-color: #fff;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 12px;
      background-color: #fff;
    }
  }  
  &.point-nw {
    left: -3px;
    top: -3px;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 12px;
      height: 100%;
      background-color: #fff;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 12px;
      background-color: #fff;
    }
  }  
  &.point-sw {
    bottom: -3px;
    left: -3px;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 12px;
      height: 100%;
      background-color: #fff;
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 12px;
      background-color: #fff;
    }
  }  
  &.point-se {
    bottom: -3px;
    right: -3px;
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 12px;
      height: 100%;
      background-color: #fff;
      opacity: 1;
    }
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 12px;
      background-color: #fff;
    }
  }
}
</style>
