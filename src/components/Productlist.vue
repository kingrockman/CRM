<template>
  <div class="container">
    <div class="list" @click="toDetail(i)" :key="i" v-for="(arr,i) in arrs">
      <div class="title">{{arr.name}}</div>
      <div class="subtitle">
        <div class="person">{{arr.createdate}}</div>
        <div class="tel">{{arr.tel}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { read, setData, getData } from "../utils";
export default {
  onReady() {
    this.init();
  },
  onShow() {
    this.init();
  },
  
  data() {
    return {
      conn: "products",
      arrs: ""
    };
  },
  methods: {
    async init() {
      const res = await read(this.conn);
      setData(this.conn, res.data);
      const obj = getData(this.conn);
      this.arrs = obj;
      // console.log(obj);
    },
    toDetail(i) {
      wx.navigateTo({
        url: "../../product/detail/main?index=" + i
      });
    }
  }
};
</script>
<style>
</style>