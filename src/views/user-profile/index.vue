<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()" />
    <input
      type="file"
      hidden
      ref="file"
      accept="image/*"
      @change="onFileChange"
    />
    <van-cell title="头像" is-link center @click="$refs.file.click()">
      <div slot="default">
        <van-image round fit="cover" width="30" height="30" :src="user.photo" />
      </div>
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="user.name"
      @click="isEditShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      @click="isGenderShow = true"
      :value="user.gender === 1 ? '女' : '男'"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="user.birthday"
      @click="isBirthdayShow = true"
    ></van-cell>
    <van-popup
      class="update-popup"
      v-model="isPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-photo
        :obj="obj"
        :image="previewImg"
        @close="isPhotoShow = false"
        @updatePhoto="user.photo = $event"
        v-if="isPhotoShow"
      ></update-photo>
    </van-popup>

    <van-popup
      v-model="isEditShow"
      position="bottom"
      :style="{ height: '100%' }"
      ><update-name
        v-model="user.name"
        @cancel="isEditShow = false"
        v-if="isEditShow"
      ></update-name
    ></van-popup>

    <van-popup v-model="isGenderShow" position="bottom"
      ><update-gender
        @close="isGenderShow = false"
        v-model="user.gender"
      ></update-gender
    ></van-popup>
    <van-popup v-model="isBirthdayShow" position="bottom"
      ><update-birthday
        @close="isBirthdayShow = false"
        v-model="user.birthday"
        v-if="isBirthdayShow"
      ></update-birthday
    ></van-popup>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user.js";
import UpdateName from "./components/UpdateName.vue";
import UpdateGender from "./components/UpdateGender.vue";
import UpdateBirthday from "./components/UpdateBirthday.vue";
import UpdatePhoto from "./components/UpdatePhoto.vue";
export default {
  name: "userProfile",
  components: { UpdateName, UpdateGender, UpdateBirthday, UpdatePhoto },
  props: {},
  data() {
    return {
      obj: {},
      isPhotoShow: false,
      user: {},
      isEditShow: false,
      isGenderShow: false,
      isBirthdayShow: false,
      previewImg: "",
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.loadUserProfile();
  },
  methods: {
    onFileChange() {
      this.isPhotoShow = true;
      const blob = window.URL.createObjectURL(this.$refs.file.files[0]);
      this.previewImg = blob;
      this.obj = this.$refs.file.files[0];
      this.$refs.file.value = "";
    },
    async loadUserProfile() {
      const { data } = await getUserProfile();
      console.log(data);
      this.user = data.data;
    },
  },
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
.van-popup {
  background: #f5f7f9;
}
.update-popup {
  background: #000;
}
</style>