<template>
  <div class="container">
    <div class="list">
      <Customerlist></Customerlist>
      <div class="tools">
        <button @click="toDetail(-1)">新增客户</button>
      </div>
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
.customers-list {
  border-bottom: gray solid 1px;
  padding: 50rpx 40rpx;
}
.title {
  font-size: 32rpx;
  margin-bottom: 20rpx;
}

.tools {
  position: fixed;
  bottom: 0;
  right: 10rpx;
}
.detail {
  font-size: 24rpx;
}
</style>

