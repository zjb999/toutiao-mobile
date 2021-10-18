<template>
  <div>
    <van-nav-bar title="小智同学" left-arrow @click-left="$router.back()" />
    <van-cell-group>
      <van-cell title="ww" class="cells"></van-cell
    ></van-cell-group>
    <van-cell-group class="wrap">
      <van-field v-model="message" placeholder="请输入消息"></van-field>
      <van-button size="mini" type="primary">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
// import io from "socket.io-client";

// const socket = io("http://ttapi.research.itcast.cn");
// socket.on("connect", function () {
//   console.log("连接成功");
// });
// socket.on("disconnect", function () {
//   console.log("断开连接");
// });
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      message: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
/deep/ .van-nav-bar__content {
  .van-nav-bar__title {
    color: #fff;
  }
  background: #3296fa;
  .van-icon-arrow-left {
    color: #fff;
  }
}
.wrap {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 10px;
  align-items: center;
}
.van-button--primary {
  width: 40px;
}
.cells {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow: auto;
}
</style>