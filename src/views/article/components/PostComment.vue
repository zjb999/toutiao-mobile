<template>
  <div class="post">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="btn" size="mini" @click="onPost" :disabled="!message"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from "@/api/comment.js";
export default {
  name: "postComment",
  components: {},
  props: {
    tar: {
      type: [Number, String, Object],
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onPost() {
      this.$toast.loading({
        message: "发布中...",
        forbidClick: true,
      });
      const { data } = await addComment({
        target: this.tar.toString(),
        content: this.message,
      });
      console.log(data);
      this.$emit("post-success", data.data.new_obj);
      this.$toast.success("发布成功");
      this.message = "";
    },
  },
};
</script>

<style scoped lang="less">
.post {
  padding: 14px;
  display: flex;
  align-items: center;
  .btn {
    width: 60px;
  }
}
</style>