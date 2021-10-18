<template>
  <div class="channel-edit">
    <van-cell center :border="false"
      ><div slot="title" class="channel-title">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      ></van-cell
    >
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in myChannels"
        :key="channel.id"
        :text="channel.name"
        :icon="isEdit && index !== 0 ? 'clear' : ''"
        @click="onChannelCilck(index, channel)"
        :class="{ high: index === active }"
      />
    </van-grid>
    <van-cell center :border="false"
      ><div slot="title" class="channel-title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="channel in recommendChannels"
        :key="channel.id"
        :text="channel.name"
        @click="onAdd(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { setItem } from "@/utils/storage.js";
import {
  getAllChannels,
  addUserChannels,
  deleteUserChannels,
} from "@/api/channel.js";
export default {
  name: "ChannelEdit",
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true,
    },
    active: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isEdit: false,
      allChannels: [],
    };
  },
  computed: {
    ...mapState(["user"]),
    recommendChannels() {
      return this.allChannels.filter((item) => {
        return !this.myChannels.find((channel) => {
          return channel.id === item.id;
        });
      });
    },
  },
  watch: {},
  created() {},
  mounted() {
    this.loadAllChannels();
  },
  methods: {
    onChannelCilck(index, channel) {
      if (this.isEdit && index !== 0) {
        this.deleteChannel(index, channel);
      } else {
        this.switchChannel(index);
      }
    },
    async deleteChannel(index, channel) {
      if (index <= this.active) {
        this.$emit("delete", this.active - 1);
      }

      this.myChannels.splice(index, 1);
      if (this.user) {
        const res = await deleteUserChannels(channel.id);
        console.log(res);
      } else {
        setItem("user-channels", this.myChannels);
      }
    },
    switchChannel(index) {
      this.$emit("close", index);
    },
    async onAdd(channel) {
      this.myChannels.push(channel);

      if (this.user) {
        const res = await addUserChannels({
          channels: [
            {
              id: channel.id,
              seq: this.myChannels.length,
            },
          ],
        });
      } else {
        setItem("user-channels", this.myChannels);
      }
    },
    async loadAllChannels() {
      const { data } = await getAllChannels();
      console.log(data);
      this.allChannels = data.data.channels;
    },
  },
};
</script>

<style scoped lang="less">
.channel-edit {
  padding-top: 54px;
}
.channel-title {
  font-size: 16px;
  color: #333;
}
/deep/ .van-grid-item {
  box-sizing: border-box;
  width: 80px;
  height: 43px;
  .van-grid-item__content {
    background-color: #f4f5f6;
    .van-grid-item__text {
      margin-top: 0;
      font-size: 14px;
      color: #222;
    }
  }
}
/deep/ .van-grid-item__content {
  position: relative;
  .van-grid-item__icon {
    position: absolute;
    right: -8px;
    top: -5px;
    font-size: 20px;
    color: #ccc;
  }
}
.high {
  /deep/ .van-grid-item__text {
    color: red !important;
  }
}
</style>