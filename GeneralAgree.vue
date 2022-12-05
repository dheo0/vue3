<template>
  <div class="lp_body">
    <div class="layout">
      <div class="top">
        {{ $t('ML00789') }}<br>{{ $t('ML00790') }}
      </div>

      <h3>{{ $t('ML00791') }}</h3>

      <div class="signup-agree-form">
        <div
          class="row all"
        >
          <comp-checkbox
            id="check-all"
            v-model="checkAll"
            checkbox-style-class="type2"
            :label="$t('ML00792')"
            @update:modelValue="handleCheckAllClick"
          >
            {{ $t('ML00792') }}
          </comp-checkbox>
        </div>
        <div
          v-for="item in checkList"
          :key="item.id"
          class="row"
          :class="[{'choose-all': item?.children}]"
        >
          <comp-checkbox
            :id="(item.id)"
            v-model="item.checked"
            checkbox-style-class="type2"
            :label="item.label"
            @update:modelValue="handleCheckClick"
          >
            {{ item.label }}
          </comp-checkbox>
          <button
            v-if="item.content"
            type="button"
            class="btn-view-detail"
            @click="$changePage('signUp', item.content)"
          >
            {{ $t('ML00794') }}
          </button>
          <template v-if="item?.children">
            <div
              v-for="child in item.children"
              :key="child.id"
              class="choose"
            >
              <comp-checkbox
                :id="child.id"
                v-model="child.checked"
                checkbox-style-class="type2"
                :label="child.label"
                @update:modelValue="handleAdOptionClick"
              >
                {{ child.label }}
              </comp-checkbox>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <div class="lp_foot">
    <comp-button-wrap
      class-name="grid-row bs-8 type-full"
    >
      <comp-button
        button-style-class="type2"
        :name="$t('ML00801-1')"
        @btnClick="handleCancelClick"
      />
      <comp-button
        button-style-class="type1"
        :name="$t('ML00801-2')"
        @btnClick="handleNextClick"
      />
    </comp-button-wrap>
  </div>
</template>

<script>
import CompButtonWrap from '@comp/common/ButtonWrap'
import CompButton from '@comp/common/Button'
import CompCheckbox from '@comp/common/SelectionControls/Checkbox'

export default {
  components: {
    CompButtonWrap,
    CompButton,
    CompCheckbox
  },
  emits: ['moveTo', 'closeMenu'],
  data() {
    return {
      checkList: [ 
        { id: 'ch-1', label: this.$t('ML00793'), checked: true, content: 'TermsAndConditions', required: true },
        { id: 'ch-2', label: this.$t('ML00795'), checked: false, content: 'ThirdPartyProvide', required: true },
        { id: 'ch-3', label: this.$t('ML00796'), checked: false, content: 'Privacy', required: true },
        { id: 'ch-4', label: this.$t('ML00797'), checked: false, required: true },
        {
          id: 'ch-5', 
          label: this.$t('ML00798'),
          checked: false,
          children: [
            { id: 'ch-5-1', label: this.$t('ML00799'), checked: false },
            { id: 'ch-5-2', label: this.$t('ML00800'), checked: false },
            { id: 'ch-5-3', label: this.$t('ML00801'), checked: false }
          ] 
        }
      ]
    }
  },
  computed: {
    checkAll: {
      get () {
        return this.checkList.every((el) => el.checked)
      },
      set (value) {
        this.checkList.forEach((el) => {
          if (el.required) {
            el.checked = value
          }
        })
      }
    }
  },
  mounted() {
    this.$updateSlideOptions({
      title: 'ML00788'
    })
  },
  methods: {
    handleCheckAllClick(_id, checked) {
      this.checkAll = checked
    },
    handleCheckClick(id, checked) {
      const currentItemIdx = this.checkList.findIndex((el) => el.id === id) 
      this.checkList[currentItemIdx].checked = checked
      if (this.checkList[currentItemIdx].children) {
        this.checkList[currentItemIdx].children.forEach((child) => { child.checked = checked })
      } 
    },
    handleAdOptionClick(id, checked) {
      const currentItemIdx = this.checkList[4].children.findIndex((child) => child.id === id)
      this.checkList.find((el) => el.id === 'ch-5').children[currentItemIdx].checked = checked
      if (this.checkList[4].children.every((child) => child.checked)) {
        this.checkList[4].checked = true
      } else {
        this.checkList[4].checked = false
      }
    },
    handleCancelClick() {
      console.log('click >>>> 취소')
    },
    handleNextClick() {
      this.$openPanel('signUp', 'GeneralForm')
    }
  }
}
</script>

<style lang="scss" scoped>
.top {
  margin: 16px 0 40px;
  padding: 16px 16px 17px;
  border-radius: 4px;
  background-color: #f8f8f8;
  font-size: 13px;
  line-height: 1.54;
  color: #666;
}
h3 {
  margin-bottom: 24px;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.63;
  color: #333;
}
</style>
