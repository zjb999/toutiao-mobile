<template>
  <div>
    <van-nav-bar left-arrow @click-left="$router.back()" class="navBar" />
    <div class="article-container">
      <div class="tit">{{ article.title }}</div>
      <van-cell :title="article.aut_name" class="user-info" center>
        <div slot="icon">
          <van-image
            round
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            class="avator"
            fit="cover"
          />
        </div>
        <div slot="label">{{ article.pubdate | relativeTime }}</div>
        <div slot="right-icon">
          <van-button
            class="btn"
            :icon="article.is_followed ? 'plus' : ''"
            round
            :type="article.is_followed ? 'default' : 'info'"
            size="small"
            @click="onFollow"
            :loading="isFollowLoading"
            >{{ article.is_followed ? "已关注" : "关注" }}</van-button
          >
        </div>
      </van-cell>
      <div
        class="markdown-body"
        v-html="article.content"
        ref="article-content"
      ></div>
      <comment-list
        :articleId="articleId"
        :common="common"
        @totalCount="totalCount = $event"
      ></comment-list>
    </div>
    <van-popup v-model="isPostShow" position="bottom"
      ><post-comment
        :tar="articleId"
        @post-success="onPostSuccess"
      ></post-comment
    ></van-popup>
    <van-popup
      closeable
      close-icon-position="top-left"
      v-model="isReplyShow"
      position="bottom"
      ><reply-comment
        :result="result"
        v-if="isReplyShow"
        :articleId="articleId"
      ></reply-comment
    ></van-popup>
    <div class="article-bottom">
      <van-button round @click="isPostShow = true">写评论</van-button>
      <div class="icon-container">
        <van-icon name="comment-o" :badge="totalCount" />
        <van-icon
          :name="article.is_collected ? 'star' : 'star-o'"
          @click="onCollect"
          :color="article.is_collected ? 'orange' : '#777'"
        />
        <van-icon
          :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
          :color="article.attitude === 1 ? 'hotpink' : '#777'"
          @click="onLike"
        />
        <van-icon name="share-o" />
      </div>
    </div>
  </div>
</template> 

<script>
import ReplyComment from "./components/ReplyComment.vue";
import PostComment from "./components/PostComment.vue";
import CommentList from "./components/CommentList.vue";
import { getArticleInfo } from "@/api/article.js";
import "./article.css";
import { ImagePreview } from "vant";
import {
  addFollow,
  deleteFollow,
  collect,
  deleteCollect,
  addLike,
  deleteLike,
} from "@/api/user.js";
export default {
  name: "Article",
  components: {
    CommentList,
    PostComment,
    ReplyComment,
  },
  props: {
    articleId: {
      type: [String, Object, Number],
      required: true,
    },
  },
  data() {
    return {
      result: {},
      isReplyShow: false,
      totalCount: 0,
      isPostShow: false,
      article: {},
      isFollowLoading: false,
      common: {},
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$bus.$on("reply", (res) => {
      this.isReplyShow = true;
      this.result = res;
    });
    this.loadArticle();
    console.log(this.$route);
  },
  methods: {
    onPostSuccess(data) {
      this.isPostShow = false;
      this.totalCount++;
      this.common = data;
    },
    async onFollow() {
      this.isFollowLoading = true;
      if (this.article.is_followed) {
        const res = await deleteFollow(this.article.aut_id);
      } else {
        await addFollow({ target: this.article.aut_id });
      }
      this.isFollowLoading = false;
      this.article.is_followed = !this.article.is_followed;
    },
    async onCollect() {
      this.$toast.loading({
        message: "操作中···",
        forbidClick: true,
      });
      if (this.article.is_collected) {
        await deleteCollect(this.articleId);
      } else {
        await collect({ target: this.articleId });
      }

      this.article.is_collected = !this.article.is_collected;
      this.$toast.success(`${this.article.is_collected ? "" : "取消"}收藏成功`);
    },
    async onLike() {
      this.$toast.loading({
        message: "操作中···",
        forbidClick: true,
      });
      if (this.article.attitude == 1) {
        const res = await deleteLike(this.articleId);

        this.article.attitude = -1;
      } else {
        const res = await addLike({ target: this.articleId });

        this.article.attitude = 1;
      }
      this.$toast.success(
        `${this.article.attitude === 1 ? "" : "取消"}点赞成功`
      );
    },
    async loadArticle() {
      const { data } = await getArticleInfo(this.articleId);
      this.article = data.data;

      this.$nextTick(() => {
        this.handlePreviewImage();
      });
    },

    handlePreviewImage() {
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      const imgPaths = [];
      imgs.forEach((element, index) => {
        imgPaths.push(element.src);
        element.onclick = function () {
          ImagePreview({ images: imgPaths, startPosition: index });
        };
      });
    },
  },
};
</script>

<style scoped lang="less">
.navBar {
  background: #3296fa;
}
/deep/ .van-icon-arrow-left {
  color: #fff;
}
.tit {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background: #fff;
}
.article-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow: auto;
}
.van-cell__title {
  font-size: 12px;
  color: #333333;
  .van-cell__label {
    font-size: 11px;
    color: #b4b4b4;
  }
}
.avator {
  position: relative;
  width: 35px;
  height: 35px;
  margin-right: 8px;
  top: 3px;
}
.btn {
  width: 85px;
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
}
.article-bottom {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45px;
  background: #ffffff;
  .van-button {
    width: 140px;
    margin-left: 13px;
    height: 23px;
    margin-right: 25px;
    color: #a7a7a7;
  }
  .icon-container {
    display: flex;
    align-items: center;
    width: 200px;
    /deep/ .van-icon {
      position: relative;
      flex: 1;
      width: 24px;
      color: #777;
      .van-info {
        position: absolute;
        max-width: 30px;
        left: 0px;
        text-align: center;
      }
    }
    .van-icon-comment-o {
      position: relative;
      top: 2px;
    }
  }
}
</style>