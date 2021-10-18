<template>
  <div>
    <van-cell
      ><div slot="icon">
        <van-image round :src="result.aut_photo" />
      </div>
      <div slot="title" class="title">
        <div class="title">{{ result.aut_name }}</div>
        <div class="right" @click="onLike">
          <van-icon
            :color="result.is_liking ? 'orange' : '#000'"
            :name="result.is_liking ? 'good-job' : 'good-job-o'"
          /><span>{{ result.like_count }}</span>
        </div>
      </div>

      <div slot="label">
        <div class="content">{{ result.content }}</div>
        <div>
          <span class="pubdate">{{ result.pubdate | datetime }}·</span>
          <van-button @click="Re" round size="mini" class="btn">{{
            result.reply_count + "回复"
          }}</van-button>
        </div>
      </div>
    </van-cell>
  </div>
</template>

<script>
import { addCommentsLike, deleteCommentLike } from "@/api/user.js";
export default {
  name: "CommentItem",
  components: {},
  props: {
    result: {
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
  methods: {
    Re() {
      this.$bus.$emit("reply", this.result);
    },
    async onLike() {
      if (this.result.is_liking) {
        await deleteCommentLike(this.result.com_id.toString());
        this.result.like_count--;
      } else {
        await addCommentsLike({ target: this.result.com_id.toString() });
        this.result.like_count++;
      }
      this.result.is_liking = !this.result.is_liking;
    },
  },
};
</script>

<style scoped lang="less">
.van-image {
  width: 36px;
  height: 36px;
  margin-right: 10px;
}
.content {
  font-size: 16px;
  color: #000;
}
/deep/ .van-cell__title {
  color: #406599;
}
.pubdate {
  font-size: 10px;
}
.right {
  color: #000;
  font-size: 14px;
}
.title {
  display: flex;
  justify-content: space-between;
}
.btn {
  background: #f4f5f6;
}
.pubdate {
  display: inline-block;
  position: relative;
  top: 4px;
  color: #000;
  margin-right: 10px;
  margin-top: 6px;
}
</style>