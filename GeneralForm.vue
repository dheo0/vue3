<template>
  <div class="lp_body">
    <div class="layout">
      <div class="m_t_24">
        <h3>
          {{ $t('ML00823') }}
        </h3>
      </div>
      
      <div class="m_t_18">
        <div class="form-box">
          <comp-input
            id="email"
            type="text"
            :title="$t('ML00824')"
            :placeholder="$t('ML00825')"
            :is-error="true"
            :message="$t('MG0015')"
          />
        </div>
      </div>
      <div class="m_t_20">
        <div class="form-box">
          <comp-input
            id="password"
            type="password"
            :title="$t('ML00826')"
            :placeholder="$t('ML00827')"
            :is-error="true"
            :message="$t('MG0016')"
          />
        </div>
      </div>
      <div class="m_t_20">
        <div class="form-box">
          <comp-input
            id="password-confirm"
            type="password"
            :title="$t('ML00828')"
            :placeholder="$t('ML00829')"
            :is-error="true"
            :message="$t('MG0017')"
          />
        </div>
      </div>
      <div class="m_t_20">
        <div class="form-box m_t_8">
          <label>{{ $t('ML00830') }}</label>
          <div class="multiForm type-select-input">
            <div class="multi-item row1">
              <comp-select
                :option-list="countryCodeOptionList"
              />
            </div>
            <span class="or">or</span>
            <div class="multi-item row2">
              <comp-input
                type="text"
                :placeholder="$t('ML00832')"
              />
            </div>
          </div>
        </div>
        <div class="form-box m_t_8">
          <div class="multiForm type-input-button">
            <div class="multi-item row1">
              <comp-input
                id="number-code"
                type="number"
                :placeholder="$t('ML00830')"
              />
            </div>
            <div class="multi-item row2">
              <comp-button
                button-size-class="type-48"
                button-style-class="type-full type3"
                :name="$t('ML00833')"
                @click="handleClickSendAuthBtn"
              />
            </div>
          </div>
        </div>
        <div class="form-box m_t_8">
          <div class="multiForm type-input-button">
            <div class="multi-item row1">
              <comp-input
                id="auth-number"
                type="number"
                :placeholder="$t('ML00834')"
                :is-error="true"
                :message="$t('MG0018')"
              />
              <p
                class="message"
                v-text="$t('ML00835', { MM: '03', mm: '00' })"
              />
            </div>
            <div class="multi-item row2">
              <comp-button
                button-size-class="type-48"
                button-style-class="type-full type3"
                :name="$t('ML00836')"
                @click="handleClickCheckAuthBtn"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="m_t_20">
        <div class="form-box m_t_8">
          <label>{{ $t('ML00837') }}<em>{{ $t('ML00837-1') }}</em></label>
          <div class="multiForm type-input-button">
            <div class="multi-item row1">
              <comp-input
                id="nickname"
                type="text"
                :placeholder="$t('ML00838')"
                :is-error="true"
                :message="$t('MG0020')"
              />
            </div>
            <div class="multi-item row2">
              <comp-button
                button-size-class="type-48"
                button-style-class="type-full type3"
                :name="$t('ML00839')"
                @click="handleButtonClick"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="m_t_40">
        <h3>{{ $t('ML00840') }}<em>{{ $t('ML00841') }}</em></h3>
      </div>
      <div class="m_t_20">
        <div class="form-box m_t_8">
          <label>{{ $t('ML00842') }}</label>
          <div class="multiForm type-select-input">
            <div class="multi-item row1">
              <comp-select
                :option-list="countryOptionList"
              />
            </div>
            <span class="or">or</span>
            <div class="multi-item row2">
              <comp-input
                id="country-code"
                type="text"
                :placeholder="$t('ML00843')"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="m_t_32">
        <div class="form-box m_t_8">
          <label>{{ $t('ML00844') }}<em>{{ $t('ML00845') }}</em></label>
          <div class="ckGroup type1 interest">
            <comp-checkbox
              v-for="item in interest"
              :id="item.id"
              :key="item.id"
              v-model="item.checked"
              :label="item.value"
              :disabled="item.disabled"
              checkbox-style-class="type1"
              @update:modelValue="handleInterestOptionClick"
            >
              {{ item.value }}
            </comp-checkbox>
          </div>
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
        :name="$t('ML00846-1')"
        @btnClick="handleButtonClick($t('ML00846-1'))"
      />
      <comp-button
        button-style-class="type1"
        :name="$t('ML00846')"
        @btnClick="handleButtonClick($t('ML00846'))"
      />
    </comp-button-wrap>
  </div>
</template>

<script>
import CompButtonWrap from '@comp/common/ButtonWrap'
import CompButton from '@comp/common/Button'
import CompSelect from '@comp/common/Input/Select.vue'
import CompInput from '@comp/common/Input/Input'
import CompCheckbox from '@comp/common/SelectionControls/Checkbox'

export default {
  components: {
    CompButtonWrap,
    CompButton,
    CompSelect,
    CompInput,
    CompCheckbox
  },
  emits: ['moveTo', 'closeMenu'],
  data () {
    return {
      countryCodeOptionList: [
        { title: this.$t('ML00831') },
        { title: '한국 +82' }
      ],
      countryOptionList: [
        { title: '대한민국' },
        { title: '일본' }
      ],
      interestLimitCount: 5, 
      interest: [
        { id: 'interest-0', checked: false, disabled: false, value: '전자·가전' },
        { id: 'interest-1', checked: false, disabled: false, value: '패션·잡화' },
        { id: 'interest-2', checked: false, disabled: false, value: '아웃도어' },
        { id: 'interest-3', checked: false, disabled: false, value: '뷰티·화장품' },
        { id: 'interest-4', checked: false, disabled: false, value: '완구·피규어' },
        { id: 'interest-5', checked: false, disabled: false, value: '음반' },
        { id: 'interest-6', checked: false, disabled: false, value: '주류' },
        { id: 'interest-7', checked: false, disabled: false, value: '비타민·의약품' },
        { id: 'interest-8', checked: false, disabled: false, value: '식품' },
        { id: 'interest-9', checked: false, disabled: false, value: '자동차용품' },
        { id: 'interest-10', checked: false, disabled: false, value: '주방' },
        { id: 'interest-11', checked: false, disabled: false, value: '취미·생활' }
      ],
      checkedList: [],
      data: null
    }
  },
  mounted() {
    this.$updateSlideOptions({
      title: 'ML00822'
    })
  },
  methods: {
    handleButtonClick(val) {
      console.log(val, 'click')
    },
    handleClickCheckAuthBtn() {
      console.log('인증번호 확인', 'click')
    },
    handleClickSendAuthBtn() {
      console.log('인증번호 발송', 'click')
    },
    handleInterestOptionClick(id, checked) {
      const currentItemIdx = this.interest.findIndex((el) => el.id === id) 
      this.interest[currentItemIdx].checked = checked
      const temp = this.interest.filter((el) => el.id === id)[0]
      this.checkedList.push(temp)

      console.log(this.checkedList.length, '<<<<<<<<<<<<<<<<')

      if (this.checkedList.length === 5) {
        const idx = this.checkedList[0].id
        this.checkedList.shift()
        const firstIndex = this.interest.findIndex((el) => el.id === idx)
        this.interest[firstIndex].checked = false
      }
      console.log(this.checkedList)

      /* if (this.interestDisabled && checked) {
        this.interest.forEach((el) => {
          if (!el.checked) {
            el.disabled = true
          }
        })
      } else {
        this.interest.forEach((el) => { el.disabled = false })
      } */
    }
  }
}
</script>

<style lang="scss" scoped>
.or {
  margin: 0 8px 0 0;
  line-height: 48px;
  font-size: 14px;
  color: #333;
}
h3 {
  line-height: 19px;
  font-size: 16px;
  font-weight: 700;
  color: #333;
  em {
    display: inline;
    color: #bbb;
  }
}
.form-box label {
  font-weight: 400;
  em {
    display: inline;
    margin-left: 4px;
    color: #bbb;
  }
}
.interest:deep {
  .ckGroup.type1 {
    width: 33.333%;
    > span {
      width: 100%;
    }
    label {
      justify-content: center;
    }
    input:not(:checked) + label{
      background-color: #f8f8f8;
      color: #898989;
      border-color: #f8f8f8;
    }
  }
}
.agree:deep {
  padding-left: 32px;
  > span {
    margin-top: 7px;
  }
  .all {
    margin-left: -32px;
    > span {
      margin-top: 0;
      margin-bottom: 5px;
    }
  }
}
</style>
