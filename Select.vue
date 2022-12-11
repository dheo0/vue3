<template>
  <div
    class="form-box"
    :class="[{'type-error': isError, 'type-success': isSuccess}, className]"
  >
    <label
      v-if="title"
      :for="id"
    >{{ title }}</label>
    <div
      ref="selectBox"
      class="selectPL"
      :class="{active: isActive, disabled: disabled}"
      :data-value="dataValue"
      @click="handleSelectClick"
      @click.stop="handleSelectToggle"
    >
      <a
        class="val"
        :class="`option-${selectedOptionIndex}`"
        href="javascript:;"
        data-val="val"
      >{{ optionList[selectedOptionIndex].title }} {{ optionList[selectedOptionIndex].num }}</a>
      <ul>
        <li
          v-for="(item, idx) in optionList"
          :id="item.id"
          :key="item.id"
          :class="[`option-${idx}`, {active: selectedOptionIndex === idx}]"
          @click="() => selectOptionClick(idx)"
        >
          <a
            class="option"
            :data-option="idx"
            href="javascript:;"
          >
            {{ item.title }} {{ item.num}}
          </a>
        </li>
      </ul>
    </div>
    <p
      v-if="unit"
      class="unit"
    >
      {{ unit }}
    </p>
    <p
      v-if="message"
      class="message"
    >
      {{ message }}
    </p>
  </div>
</template>

<script>

export default {
  name: 'Select',
  props: {
    optionList: {
      type: Object,
      default: () => {}
    },
    id: {
      type: String,
      default: ''
    },
    dataValue: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    isError: {
      type: Boolean,
      default: false
    },
    isSuccess: {
      type: Boolean,
      default: false
    }, 
    unit: {
      type: String,
      default: ''
    }
  },
  emits: ['selectOptionClick'],
  watch: {
    dataValue(newValue) {
      if (newValue) {
        const result = this.optionList.findIndex((item) => item.num === this.dataValue || item.title.includes(this.dataValue))
        if (result > -1) {
          this.selectedOptionIndex = result
        } else {
          this.selectedOptionIndex = 0
        }
      }
    }
  },
  data() {
    return {
      isActive: false,
      selectedOptionIndex: 0
    }
  },
  created() {
    window.addEventListener('click', this.handleSelectToggle)

    if(this.disabled) {
      this.isActive = false
    }
  },
  methods: {
    handleSelectClick() {
      if(this.disabled) return
      this.isActive = !this.isActive
    },
    handleSelectToggle(e) {
      if (!this.$refs?.selectBox?.contains(e.target)) {
        this.isActive = false
      }
    },
    selectOptionClick(idx) {
      this.selectedOptionIndex = idx
      this.$emit('selectOptionClick', this.optionList[this.selectedOptionIndex])
      console.log('click >>>>>', this.optionList[idx].title)
    }
  }
}
</script>

<style lang="scss" scoped>
.selectPL {
  z-index: auto;
}
.selectPL.active ul { 
  z-index: 9;
}
.selectPL.disabled a {
  background-color: #f2f2f2;
  color: -internal-light-dark(graytext, rgb(170, 170, 170));
  opacity: 0.7;
  border-color: rgba(118, 118, 118, 0.3);
}
</style>
