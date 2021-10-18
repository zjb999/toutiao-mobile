<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="searchResults"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from "@/api/search.js";
export default {
  name: "SearchResults",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 10,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      const { data } = await getSearchResults({
        page: this.page,
        per_page: this.perPage,
        q: this.searchText,
      });
      this.list.push(...data.data.results);
      this.loading = false;
      if (data.data.results.length) {
        this.page++;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.searchResults {
  position: fixed;
  top: 54px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
}
</style>