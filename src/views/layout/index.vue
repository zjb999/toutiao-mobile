<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qy">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "LayOut",
  components: {},
  props: {},
  data() {
    return {
      active: 0,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$store.commit("addCachePage", "LayOut");
  },
  methods: {},
};
</script>

<style scoped lang="less">
</style>