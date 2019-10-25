<template>
  <div class="container">
    <div class="list" @click="toDetail(arr._id)" :key="i" v-for="(arr,i) in arrs">
      <div class="title">{{arr.name}}</div>
      <div class="subtitle">
        <div class="person">{{arr.createdate}}</div>
        <div class="tel">{{arr.tel}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { read, setData, getData,show,hide } from "../utils";
export default {
  props:["id"],
  onReady() {
    this.init();
  },
  onShow() {
    this.init();
  },

  data() {
    return {
      conn: "products",
      id:"",
      arrs: ""
    };
  },
  methods: {
    async init() {
      show()
      const res = await read(this.conn);
      setData(this.conn, res.data);
      const obj = getData(this.conn);
      this.arrs = obj.filter(v=>v.cus_id==this.id);
      hide();     
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