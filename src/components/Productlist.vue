<template>
  <div class="container">
    <input @keyup="toSearch" v-model="search" type="text" placeholder="输入客户名称" />
    <button @click="toSearch">查询</button>客户总数：{{arrs.length}}
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
const conn="products"
import { read, setData, getData,show,hide, myCloud } from "../utils";
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
      // conn: "products",
      id:"",
      arrs: ""
    };
  },
  methods: {
    async init() {
      show()
      const res = await myCloud(2,conn);
      
      setData(conn, res);
      const obj = getData(conn);
      this.arrs = obj//.filter(v=>v.cus_id==this.id);
      hide();     
    },
    toDetail(id) {
      wx.navigateTo({
        url: "../../product/detail/main?id=" + id
      });
    }
  }
};
</script>
<style>
</style>