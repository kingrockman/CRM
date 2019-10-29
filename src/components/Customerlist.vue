<template>
  <div class="container">
    <input @keyup="toSearch" v-model="search" type="text" placeholder="输入客户名称" />
    <button @click="toSearch">查询</button>
    <div class="customers-list" @click="toDetail(arr._id)" :key="i" v-for="(arr,i) in arrs">
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
      this.toSearch();
    },
    toDetail(i) {
      wx.navigateTo({
        url: "../customers/detail/main?index=" + i
      });
    },
    toSearch() {
      const obj = getData(this.conn);
      this.arrs = obj.filter(v => {
        var reg = new RegExp(this.search);
        if (v.name.match(reg)) {
          return v.name;
        }
      });
    }
  }
};
</script>
<style>
input{
  font-size: 32rpx;
  margin: 20rpx;
  padding: 20rpx;
  border: solid pink 1px;
}
.subtitle {
  position: relative;
  flex-direction: row;
  font-size: 24rpx;
  color: gray;
}
.subtitle div {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.person {
  width: 48%;
  float: left;
}
.tel {
  width: 48%;
  float: right;
}
</style>