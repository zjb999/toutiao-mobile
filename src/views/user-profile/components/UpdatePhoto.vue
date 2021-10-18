<template>
  <div>
    <img :src="image" alt="" ref="img" class="image" />
    <van-nav-bar
      class="nav"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import { updateUserPhoto } from "@/api/user.js";
export default {
  name: "",
  components: {},
  props: {
    obj: {
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cropper: null,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const image = this.$refs.img;
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: "move",
      aspectRatio: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true,
    });
  },
  methods: {
    onClickRight() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
        duration: 0,
      });
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        const formData = new FormData();
        formData.append("photo", blob /*, 'example.png' */);
        const res = await updateUserPhoto(formData);
        console.log(res);
        this.$toast.success("保存成功");
        this.$emit("updatePhoto", window.URL.createObjectURL(blob));
        this.$emit("close");
      });
    },
  },
};
</script>

<style scoped lang="less">
.image {
  display: block;
  max-width: 100%;
}
.nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  /deep/ .van-nav-bar__content {
    background: #000;

    .van-nav-bar__title {
      color: #000;
    }
  }
}
</style>