<template>
  <div class="container">
    <input v-model="search" type="text" placeholder="输入客户名称" />
    <button @click="init">查询</button>
    {{arrs.length==0?"玩命加载中...":"客户总数："+arrs.length}}
    <div class="list" @click="toDetail(arr._id)" :key="arr._id" v-for="arr in arrs">
      <div class="title">{{arr[showitme[0]]}}</div>
      <div class="subtitle">
        <div class="left">{{arr[showitme[1]]}}</div>
        <div class="right">{{arr[showitme[3]]}}</div>
      </div>
    </div>
  </div>
</template>
<script>
// const conn = "customers";
import { DBPost } from "@/DBPost";
var customer = new DBPost("customers", ["customer", "person", "", "tel"]);
// import { read, setData, getData, show, hide, myCloud } from "../utils";
export default {
  onReady() {
    console.log("ready");

    this.init();
  },
  // onShow() {
  //   console.log("show");
  //   this.init();
  // },
  data() {
    return {
      search: "",
      showitme: [],
      arrs: []
    };
  },

  methods: {
    async init() {
      this.arrs = [];
      const res = await customer.read({ customer: this.search });
      this.showitme = customer.list;
      this.arrs = customer.obj;
    },
    toDetail(i) {
      wx.navigateTo({
        url: "../customers/detail/main?index=" + i
      });
    }

    // toSearch() {
    //   const obj = getData(conn);
    //   this.arrs = obj.filter(v => {
    //     var reg = new RegExp(this.search);
    //     if (v.name.match(reg)) {
    //       return v.name;
    //     }
    //   });
    // }
  }
};
</script>
<style>
/* input {
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
} */
</style>