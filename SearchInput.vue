<template>
  <label
    v-if="title"
    v-html="title"
  />
  <div
    class="searchPL type-tag"
    :class="[{active: showList}]"
  >
    <div class="multiForm">
      <div class="multi-item row2">
        <input
          :id="id"
          v-model="searchKeyword"
          type="text"
          :disabled="disabled === true ? disabled : null"
          :placeholder="placeholder"
          @input="sendText($event)"
        >
      </div>
      <ul
        v-if="showList"
        class="search-list"
      >
        <li
          v-for="keywordOption in filteredItems"
          :key="keywordOption.name"
        >
          <a
            href="javascript:"
            @click.prevent="handleKeywordOptionClick(keywordOption)"
          >{{ keywordOption.name }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

  props:
  {
    id: {
      type: String,
      default: 'input-search'
    },
    title: {
      type: String,
      default: ''
    },
    viewKeyword: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    useSearchIcon: {
      type: Boolean,
      default: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    keywordList: {
      type: Object,
      default: () => {},
      required: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['searchKeywordChange', 'getKeyword'],
  data () {
    return {
      searchKeyword: this.value,
      selectedKeyword: [],
      showList: false,
      keywordOptions: this.keywordList
    }
  },
  computed: {
    filteredItems() {
      console.log(this.keywordList.filter(item => item.name.includes(this.searchKeyword)))
      return this.keywordList.filter(item => item.name.includes(this.searchKeyword) || item.num.includes(this.searchKeyword))
    }
  },
  methods: {
    handleSearchInputChange(value) {
      if (this.value.length >= 1) {
        this.showList = true
      } else {
        this.showList = false
      }
    },
    sendText(event) {
      if (this.filteredItems.length > 0 && this.searchKeyword.length > 0) {
        this.showList = true
      }

      if (this.showList && this.searchKeyword.length === 0) {
        this.showList = false
      }
      this.$emit('getKeyword', event.target.value)
    },
    handleSearchClick() {

    },
    handleKeywordOptionClick(selectedOption) {
      this.keywordList = []
      this.searchKeyword = selectedOption.name
      this.showList = false
    }
  }   
}
</script>
<style lang="scss" scoped>
.form-box .multiForm{
  position: relative;
}
.form-box .selectPL.active .val::after{ transform: rotate(180deg); -webkit-transform: rotate(180deg); -moz-transform: rotate(180deg); -o-transform: rotate(180deg);}
.form-box .selectPL.active .val{ border-color: #02a2c9; outline: none;}
.form-box ul.search-list{ background-color: #fff; padding: 8px; margin: 8px 0 0 0; border: 1px solid #21a3c7; border-radius: 3px; box-sizing: border-box;position: absolute;left: 0;top:50px;width: 100%;z-index: 10;overflow: auto;max-height: 260px}
.form-box ul.search-list li + li{ margin: 8px 0 0 0;}
.form-box ul.search-list a{ font-weight: 400; font-size: 14px; color: #333; line-height: 36px; padding: 0 10px; justify-content: flex-start; border: 0;}
.form-box ul.search-list a:hover,
.form-box ul.search-list .active a{ background-color: #e5f6fa; color: #02a2c9;}
</style>