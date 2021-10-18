<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in suggections"
      :key="index"
      @click="clickCell(item)"
      ><div slot="title" v-html="heighlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { search } from "@/api/search.js";
import { debounce } from "lodash";

export default {
  name: "SearchSuggestion",
  components: {},
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      suggections: [],
    };
  },
  computed: {},
  watch: {
    searchText: {
      immediate: true,
      handler: debounce(async function (value) {
        const { data } = await search({ q: value });

        this.suggections = data.data.options;
      }, 500),
    },
  },
  created() {},
  mounted() {},
  methods: {
    clickCell(item) {
      this.$emit("sea", item);
    },
    heighlight(item) {
      return item.replace(
        new RegExp(this.searchText, "gi"),
        `<span style="color:red">${this.searchText}</span>`
      );
    },
  },
};
</script>

<style scoped lang="less">
</style>