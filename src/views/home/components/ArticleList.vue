<template>
  <div class="container" ref="article">
    <!-- <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      success-text="refreshSuccess"
      :success-duration="1500"
    > -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="article-list"
    >
      <article-item
        v-for="(item, index) in list"
        :key="index"
        :article="item"
      />
    </van-list>
    <!-- </van-pull-refresh> -->
  </div>
</template>

<script>
import ArticleItem from "@/components/article-item";
import { getArticles } from "@/api/article.js";

export default {
  name: "ArticleList",
  components: {
    ArticleItem,
  },
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      refreshSuccess: "",
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      refreshing: false,
      scrollTop: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  activated() {},
  mounted() {
    window.addEventListener("scroll", () => {
      console.log(this.$refs.article.scrollTop);
    });
  },
  beforeDestroy() {},
  methods: {
    async onRefresh() {
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      this.list.unshift(...data.data.results);
      this.refreshing = false;
      this.refreshSuccess = `更新了${data.data.results.length}条数据`;
    },

    async onLoad() {
      // 异步更新数据
      const { data } = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1,
      });
      // console.log(data);
      const { results } = data.data;
      this.list.push(...results);
      // 加载状态结束
      this.loading = false;

      if (results.length) {
        this.timestamp = data.data.pre_timestamp;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style scoped lang="less">
.article-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>