<template>
  <div class="container">
    <Customerlist></Customerlist>
    <div class="tools">
      <button @click="toDetail(-1)">新增客户</button>
    </div>
  </div>
</template>
<script>
import Customerlist from "@/components/Customerlist";
export default {
  components: {
    Customerlist
  },
  methods: {
    toDetail(i) {
      wx.navigateTo({
        url: "detail/main?index=" + i
      });
    }
  }
};
</script>

<style>
</style>

