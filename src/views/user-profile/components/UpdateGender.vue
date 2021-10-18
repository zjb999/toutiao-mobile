<template>
  <div>
    <van-picker
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onGenderChange"
      :default-index="this.defaultIndex"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user.js";
export default {
  name: "",
  components: {},
  props: {
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      columns: ["男", "女"],
      defaultIndex: this.value,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onGenderChange(picker, value, index) {
      this.defaultIndex = index;
    },
    async onConfirm() {
      this.$toast.loading({
        message: "保存中...",
        forbidClick: true,
      });
      await updateUserProfile({ gender: this.defaultIndex });
      this.$toast.success("保存成功");
      this.$emit("input", this.defaultIndex);
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="less">
</style>