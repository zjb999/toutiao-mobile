<template>
  <div>
    <van-nav-bar :title="`${result.reply_count}条回复`" />
    <comment-item :result="result"></comment-item>
    <van-cell title="所有回复"> </van-cell>
    <comment-list :articleId="result.com_id" type="c"></comment-list>
    <div class="btn-container">
      <van-button round @click="isPostShow = true">写评论</van-button>
    </div>
    <van-popup v-model="isPostShow" position="bottom"
      ><post-comment
        :list="commonList"
        :tar="result.com_id"
        :articleId="articleId"
        @post-success="onPostSuccess"
      ></post-comment
    ></van-popup>
  </div>
</template>

<script>
import CommentList from "./CommentList.vue";
import CommentItem from "./CommentItem.vue";
import PostComment from "./PostComment.vue";
export default {
  name: "ReplyComment",
  components: {
    CommentItem,
    CommentList,
    PostComment,
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true,
    },
    result: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { isPostShow: false, common: {}, commonList: [] };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onPostSuccess(data) {
      this.isPostShow = false;
      this.data.reply_count++;
      console.log(data);
      this.commonList.unshift(data);
    },
  },
};
</script>

<style scoped lang="less">
.btn-container {
  width: 100%;
  display: fixed;
  .van-button {
    width: 280px;

    height: 30px;
    margin-right: 25px;
    color: #a7a7a7;
    margin-left: 45px;
  }
}
</style>