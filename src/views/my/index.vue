<template>
  <div class="my-container">
    <van-cell-group v-if="user" class="my-info">
      <van-cell title="单元格" center :border="false" class="base-info">
        <template v-slot:icon>
          <van-image round :src="currentUser.photo" class="avator"
        /></template>
        <template v-slot:title
          ><span class="name">{{ currentUser.name }}</span>
        </template>
        <van-button
          type="default"
          size="small"
          round
          class="update-btn"
          to="user/profile"
          >编辑资料</van-button
        >
      </van-cell>
      <van-grid :border="false" class="data-info">
        <van-grid-item class="data-info-item"
          ><template v-slot:icon>
            <span>{{ currentUser.art_count }}</span>
          </template>
          <template v-slot:text>
            <div>头条</div>
          </template>
        </van-grid-item>
        <van-grid-item class="data-info-item"
          ><template v-slot:icon>
            <span>{{ currentUser.follow_count }}</span>
          </template>
          <template v-slot:text> <div>关注</div> </template></van-grid-item
        >
        <van-grid-item class="data-info-item"
          ><template v-slot:icon>
            <span>{{ currentUser.fans_count }}</span>
          </template>
          <template v-slot:text> <div>粉丝</div> </template></van-grid-item
        >
        <van-grid-item class="data-info-item"
          ><template v-slot:icon>
            <span>{{ currentUser.like_count }}</span>
          </template>
          <template v-slot:text> <div>获赞</div> </template></van-grid-item
        >
      </van-grid>
    </van-cell-group>
    <div v-else class="not-login" @click="onLogin">
      <img src="./shouji.png" width="50" height="50" />
      <div
        @click="
          $router.push({
            name: 'login',
            query: {
              redirect: '/my',
            },
          })
        "
      >
        登录/注册
      </div>
    </div>
    <van-grid :column-num="2" class="nav mb-4">
      <van-grid-item text="收藏" class="nav-item"
        ><template v-slot:icon>
          <div class="iconfont icon-shoucang"></div> </template
      ></van-grid-item>
      <van-grid-item icon="photo-o" text="历史" class="nav-item"
        ><template v-slot:icon>
          <div class="iconfont icon-lishi"></div> </template
      ></van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link to="" />
    <van-cell title="小智同学" is-link to="/user/chart" class="mb-4" />
    <van-cell
      v-if="user"
      title="退出登录"
      to=""
      class="tuichu mb-4"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getCurrentUser } from "@/api/user";
export default {
  name: "My",
  components: {},
  props: {},
  data() {
    return {
      currentUser: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {},
  created() {},
  mounted() {
    this.loadCurrentUser();
  },
  methods: {
    async loadCurrentUser() {
      const { data } = await getCurrentUser();
      console.log(data);
      this.currentUser = data.data;
    },
    onLogout() {
      this.$dialog
        .confirm({
          title: "退出提示",
          message: "确认退出吗",
        })
        .then(() => {
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
        });
    },
    onLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped lang="less">
.my-container {
  background-color: #fff;
  .not-login {
    height: 180px;
    background: url("./banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 66px;
      height: 66px;
    }
    div {
      font-size: 14px;
      color: #fff;
    }
  }
}
.tuichu {
  text-align: center;
  color: #d86262;
}
.my-info {
  background: url("./banner.png") no-repeat;
  background-size: cover;
  .base-info {
    box-sizing: border-box;
    height: 115px;
    padding-top: 38px;
    padding-bottom: 11px;
    .avator {
      box-sizing: border-box;
      width: 66px;
      height: 66px;
      border: 1px solid #fff;
      margin-right: 11px;
    }
    .name {
      color: #fff;
    }
    .update-btn {
      height: 16px;
      font-size: 10px;
      color: #666666;
    }
  }
  .data-info {
    .data-info-item {
      height: 65px;
      color: #fff;
      .van-grid-item__content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        span {
          font-size: 18px;
        }
        div {
          font-size: 11px;
        }
      }
    }
  }
  .van-cell {
    background-color: unset;
  }
  /deep/ .van-grid-item__content {
    background: unset;
  }
}
.nav {
  .nav-item {
    height: 70px;

    .iconfont {
      font-size: 22px;
      color: #eb5253;
    }
    .icon-lishi {
      color: #ff9e1f;
    }
    /deep/ .van-grid-item__text {
      font-size: 14px;
      color: #333333;
    }
  }
}

.mb-4 {
  margin-bottom: 4px;
}
</style>