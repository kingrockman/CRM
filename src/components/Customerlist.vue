<template>
  <div class="container">
    <!-- <input v-model="search" type="text" placeholder="输入客户名称" />
    <button @click="init">查询</button>-->
    <div class="searchbox">
      <input class="searchval" type="text" placeholder="请输入查询内容..." v-model="keywords" />
      <input class="searchbtn" type="text" @click="init" value="查询" disabled />
    </div>
    {{arrs.length==0?"玩命加载中...":"客户总数："+arrs.length}}
    <div class="list" @click="toDetail(arr._id)" :key="arr._id" v-for="arr in arrs">
      <div class="title">{{arr[showitme[0]]}}</div>
      <div class="subtitle">
        <div class="left">{{arr[showitme[1]]}}</div>
        <div class="right">{{arr[showitme[3]]}}</div>
      </div>
    </div>
    <div class="placeholder"></div>
  </div>
</template>
<script>
import { DBPost } from "@/DBPost";
var customer = new DBPost("customers", ["customer", "person", "", "tel"]);
export default {
  onReady() {
    console.log("ready");

    this.init();
  },
  data() {
    return {
      keywords: "",
      showitme: [],
      arrs: []
    };
  },

  methods: {
    async init() {
      this.arrs = [];
      const res = await customer.read({ customer: this.keywords });
      this.showitme = customer.list;
      this.arrs = customer.obj;
    },
    toDetail(i) {
      wx.navigateTo({
        url: "../customers/detail/main?index=" + i
      });
    }
  }
};
</script>
<style>
</style>