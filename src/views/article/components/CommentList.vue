<template>
  <div>
    <div class="allComment">全部评论</div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :result="item"
      ></comment-item>
    </van-list>
  </div>
</template>

<script>
import CommentItem from "./CommentItem.vue";
import { getComments } from "@/api/comment.js";
export default {
  name: "",
  components: {
    CommentItem,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    common: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: "a",
    },
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    };
  },
  computed: {},
  watch: {
    common(value) {
      this.list.unshift(value);
    },
  },
  created() {},
  mounted() {},

  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const { data } = await getComments({
        type: this.type,
        source: this.articleId.toString(),
        offset: this.offset,
        limit: this.limit,
      });
      this.$emit("totalCount", data.data.total_count);
      // 加载状态结束
      const { results } = data.data;
      this.list.push(...results);

      this.loading = false;
      if (results.length) {
        this.offset = data.data.last_id;
      } else {
        this.finished = true;
      }
      // 数据全部加载完成
    },
  },
};
</script>

<style scoped lang="less">
.allComment {
  background: #fff;
  font-size: 18px;
  padding-left: 15px;
  padding-bottom: 10px;
}
</style>