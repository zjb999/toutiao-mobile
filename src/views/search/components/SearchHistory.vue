<template>
  <div>
    <van-cell title="搜索历史" center>
      <div>
        <span v-show="isDelShow" @click="delAll">全部删除</span
        >&nbsp;&nbsp;<span v-show="isDelShow" @click="isDelShow = false"
          >完成</span
        ><van-icon name="delete-o" @click="del" v-show="!isDelShow" />
      </div>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onDelete(index, item)"
      ><div><van-icon name="close" v-show="isDelShow" /></div
    ></van-cell>
  </div>
</template>

<script>
import { removeItem, setItem } from "@/utils/storage.js";
export default {
  name: "SearchHistory",
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isDelShow: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    delAll() {
      this.$emit("delAll", []);
    },
    onDelete(index, item) {
      if (this.isDelShow) {
        this.searchHistories.splice(index, 1);

        return;
      }
      this.$emit("search", item);
    },
    del() {
      this.isDelShow = true;
    },
  },
};
</script>

<style scoped lang="less">
</style>