<template>
  <div>
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.back()"
      class="app-nav-bar"
    />
    <van-form
      @submit="onLogin"
      :show-error="false"
      :show-error-message="false"
      @failed="onFailed"
      validate-first
      ref="form"
    >
      <van-field
        v-model="user.mobile"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
        name="mobile"
      >
        <template v-slot:left-icon
          ><div class="iconfont icon-shouji"></div
        ></template>
      </van-field>
      <van-field
        v-model="user.code"
        icon-prefix="icon"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="formRules.code"
        name="code"
      >
        <template v-slot:left-icon
          ><div class="iconfont icon-yanzhengma"></div
        ></template>
        <template #button>
          <van-count-down
            :time="60 * 1000"
            format="sss"
            v-if="isCountDown"
            @finish="onFinish"
          />
          <van-button
            size="mini"
            round
            class="send-btn"
            @click.prevent="onSendSms"
            v-else
            :loading="isSendSmsLoading"
            >获取验证码</van-button
          >
        </template></van-field
      >
      <div class="login-btn-container">
        <van-button class="login-btn" type="info" block>登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from "@/api/user";
// import { Toast } from "vant";
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      isSendSmsLoading: false,
      isCountDown: false,
      formRules: {
        mobile: [
          { required: true, message: "请输入手机号" },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: "手机号格式错误" },
        ],
        code: [
          { required: true, message: "请输入验证码" },
          { pattern: /^\d{6}$/, message: "验证码格式错误" },
        ],
      },

      user: {
        mobile: "13911111111",
        code: "246810",
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onFinish() {
      this.isCountDown = false;
    },
    async onSendSms() {
      try {
        await this.$refs.form.validate("mobile");
        this.isSendSmsLoading = true;

        await sendSms(this.user.mobile);

        this.isCountDown = true;
      } catch (err) {
        // console.log(err.response);
        let message = "";
        if (err && err.response && err.response.status === 429) {
          message = "发送太频繁了,请稍后重试";
        } else if (err.name === "mobile") {
          message = err.message;
        } else {
          message = "发送失败,请稍后重试";
        }
        this.$toast({ message, position: top });
      }
      this.isSendSmsLoading = false;
    },
    onFailed(err) {
      if (err.errors[0]) {
        this.$toast({ message: err.errors[0].message, position: top });
      }
    },
    async onLogin() {
      this.$toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        const res = await login(this.user);

        this.$toast.success("登录成功");
        this.$store.commit("setUser", res.data.data);
        this.$store.commit("removeCachePage", "LayOut");
        this.$router.push(this.$route.query.redirect || "/");
      } catch (err) {
        this.$toast.fail("登录失败,手机号或验证码错误");
      }
    },
  },
};
</script>

<style scoped lang="less">
.login-btn-container {
  padding: 26px 16px;
  .login-btn {
    background: #6db4fb;
    border: none;
    .van-button__text {
      font-size: 15px;
    }
  }
}
.send-btn {
  width: 76px;
  height: 23px;
  background: #ededed;
  .van-button__text {
    color: #666;
    font-size: 11px;
  }
}
body {
  background: #f5f7f9;
}
</style>