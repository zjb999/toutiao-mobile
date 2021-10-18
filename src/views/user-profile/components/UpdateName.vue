<template>
  <div>
    <van-nav-bar
      class="nav"
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="cancelPop"
      @click-right="onClickRight"
    />
    <div class="field-wrap">
      <van-field
        v-model="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user.js";
export default {
  name: "UpdateName",
  components: {},
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  data() {
    return { message: this.value };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onClickRight() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
      });
      try {
        const res = await updateUserProfile({ name: this.message });

        this.$toast.success("保存成功");
        this.$emit("cancel");
        this.$emit("input", this.message);
      } catch (err) {
        if (err.response.status === 409) {
          this.$toast.fail("昵称已存在");
        }
      }
    },
    cancelPop() {
      this.$emit("cancel");
    },
  },
};
</script>

<style scoped lang="less">
.nav {
  /deep/ .van-nav-bar__content {
    background: #fff;

    .van-nav-bar__title {
      color: #000;
    }
  }
}
.field-wrap {
  padding: 10px;
}
</style>