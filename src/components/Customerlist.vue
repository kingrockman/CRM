<template>
  <div class="container">
    <input v-model="serach" type="text" placeholder="请输入客户名称" />
    <div class="tools">
      <button @click="btn_serach">查找</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  methods: {
    btn_serach() {
      this.$emit("cus_add", this.serach);
    }
  }
};
</script>
<style>
.tools {
  position: fixed;
  bottom: 0;
  right: 10rpx;
}
</style>