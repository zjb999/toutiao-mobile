<template>
  <div>
    <van-cell
      :to="{
        name: 'article',
        params: {
          articleId: String(article.art_id),
        },
      }"
    >
      <div slot="title" class="article-title van-multi-ellipsis--l3">
        {{ article.title }}
      </div>
      <div slot="label">
        <div class="cover-wrap" v-if="article.cover.type === 3">
          <van-image
            fit="cover"
            v-for="(img, index) in article.cover.images"
            :key="index"
            :src="img"
          />
        </div>
        <div class="label-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
      <van-image
        v-if="article.cover.type === 1"
        class="right-cover"
        fit="cover"
        :src="article.cover.images[0]"
    /></van-cell>
  </div>
</template>

<script>
export default {
  name: "ArticleItem",
  components: {},
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.article-title {
  font-size: 16px;
  color: #3a3a3a;
}
/deep/ .van-cell__value {
  flex: unset;
  margin-left: 12px;
  .right-cover {
    width: 116px;
    height: 73px;
  }
}
.label-wrap {
  font-size: 11px;
  color: #b4b4b4;
  span {
    margin-right: 12px;
  }
}
.cover-wrap {
  padding: 10px 0;
  display: flex;
  flex-wrap: nowrap;
  .van-image {
    margin-right: 4px;
    width: 116px;
    height: 73px;
  }
}
</style>