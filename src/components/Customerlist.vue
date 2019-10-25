<template>
  <div class="container">
    <input @keyup="toSearch" v-model="search" type="text" placeholder="输入客户名称" />
    <button @click="toSearch">查询</button>
    <div class="customers-list" @click="toDetail(i)" :key="i" v-for="(arr,i) in arrs">
      <div class="title">{{arr.name}}</div>
      <div class="subtitle">
        <div class="person">{{arr.person}}</div>
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
      conn: "customers",
      search: "",
      arrs: ""
    };
  },
  methods: {
    async init() {
      const res = await read(this.conn);
      setData(this.conn, res.data);
      const obj = getData(this.conn);
      this.arrs = obj;
    },
    toDetail(i) {
      wx.navigateTo({
        url: "../customers/detail/main?index=" + i
      });
    },
    toSearch() {
      const obj = getData(this.conn);
      this.arrs=obj.filter(v=>v.name==this.search)
      // var reg =new RegExp(this.search)
      // console.log(
      //   obj.filter(v => (
          
      //     v.name == "重工"
      //   ))
      // );
      // // var reg = new RegExp(this.search);
      // // //如果字符串中不包含目标字符会返回-1
      // // if (str.match(reg)) {
      // //   //匹配成功do something
      // // }
    }
  }
};
</script>
<style>
</style>