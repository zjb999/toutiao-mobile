<template>
  <div class="search-container">
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <search-results
      v-if="isResultShow"
      :search-text="searchText"
    ></search-results>
    <search-suggestion
      v-else-if="searchText"
      :search-text="searchText"
      @sea="onSearch"
    ></search-suggestion>
    <search-history
      @delAll="delAll"
      v-else
      :searchHistories="searchHistories"
      @search="onSearch"
    ></search-history>
  </div>
</template>

<script>
import { setItem, getItem } from "@/utils/storage.js";
import SearchResults from "./components/SearchResults.vue";
import SearchSuggestion from "./components/SearchSuggestion.vue";
import SearchHistory from "./components/SearchHistory.vue";
import { getSearchHistories } from "@/api/search.js";
import { mapState } from "vuex";
export default {
  name: "search",
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResults,
  },
  props: {},
  data() {
    return {
      searchText: "",
      isResultShow: false,
      searchHistories: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    searchHistories() {
      setItem("searchHistories", this.searchHistories);
    },
  },
  created() {},
  mounted() {
    this.loadSearchHistories();
  },
  methods: {
    delAll(p) {
      this.searchHistories = p;
    },
    onSearch(val) {
      this.searchText = val;
      console.log(val);
      this.isResultShow = true;
      const index = this.searchHistories.indexOf(val);
      if (index !== -1) {
        this.searchHistories.splice(index, 1);
      }
      this.searchHistories.unshift(this.searchText);
    },
    async loadSearchHistories() {
      const localHistories = getItem("searchHistories") || [];
      if (this.user) {
        const { data } = await getSearchHistories();
        console.log(data);
        const sHistories = data.data.keywords;
        this.searchHistories = [...new Set([...sHistories, ...localHistories])];
      } else {
        this.searchHistories = localHistories;
      }
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="less">
</style>