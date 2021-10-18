<template>
  <div>
    <div class="top">
      <van-nav-bar class="nav-bar"
        ><template v-slot:title>
          <van-button
            round
            class="search-btn"
            icon="search"
            @click="$router.push('/search')"
            >搜索</van-button
          >
        </template></van-nav-bar
      >
      <van-tabs v-model="active" class="tabs">
        <van-tab
          :title="channel.name"
          v-for="channel in channels"
          :key="channel.id"
          ><article-list :channel="channel"></article-list
        ></van-tab>
        <div slot="nav-right" class="zhan"></div>
        <div slot="nav-right" @click="show = true" class="wrap-nav">
          <van-icon name="wap-nav" />
        </div>
      </van-tabs>
    </div>
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      close-icon-position="top-left"
      get-container="body"
      :style="{ height: '100%' }"
      ><channel-edit
        :myChannels="channels"
        @close="swit"
        :active="active"
        @delete="del"
      ></channel-edit
    ></van-popup>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ArticleList from "./components/ArticleList.vue";
import ChannelEdit from "./components/ChannelEdit.vue";
import { getUserChannels } from "@/api/user.js";
import { getItem } from "@/utils/storage.js";
export default {
  name: "Home",
  components: {
    ArticleList,
    ChannelEdit,
  },
  props: {},
  data() {
    return {
      active: 0,
      channels: [],
      show: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {},
  mounted() {
    this.loadChannels();
  },
  methods: {
    del(index) {
      this.active = index;
    },
    swit(index) {
      this.show = false;
      this.active = index;
    },
    async loadChannels() {
      if (this.user) {
        const { data } = await getUserChannels();

        this.channels = data.data.channels;
      } else {
        const localChannels = getItem("user-channels");
        if (localChannels) {
          this.channels = localChannels;
        } else {
          const { data } = await getUserChannels();
          this.channels = data.data.channels;
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.top {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 565px;
}
.nav-bar {
  background: #3296fa;
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: 0;
    color: #fff;
    .van-icon {
      color: #fff;
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
/deep/ .van-tab {
  border-right: 1px solid #edeff3;
  border-bottom: 1px solid #edeff3;
}
/deep/ .van-tabs__line {
  width: 15px;
  height: 3px;
  bottom: 20px;
  background: #3296fa;
}
.wrap-nav {
  position: fixed;
  right: 0;
  height: 44px;
  width: 33px;
  line-height: 50px;
  background: #fff;
  opacity: 0.8;
  font-size: 24px;

  &::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 29px;
    background-color: 1px solid #ccc;
    top: 0;
    left: 0;
  }
}
.zhan {
  width: 33px;
  flex-shrink: 0;
}
</style>