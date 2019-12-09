<template>
  <div class="container" style="padding:70px 0">
    <div class="searchbox">
      <input class="searchval" type="text" placeholder="请输入查询内容..." v-model="keywords" />
      <input class="searchbtn" type="text" @click="init" value="查询" disabled />
      <scroll-view class="scrollpages" scroll-x>
        <div
          :class="queryPage.currentPage-1==i?'scrollpagesitem active':'scrollpagesitem'"
          v-for="i in queryPage.totalPage"
          :key="i"
          @click="handleCPage(i)"
        >{{i+1}}</div>
      </scroll-view>
    </div>
    <div class="list" @click="toDetail(arr._id)" :key="arr._id" v-for="arr in arrs">
      <div class="title">{{arr[showitem[0]]}}</div>
      <div class="subtitle">
        <div class="left">{{arr[showitem[1]]}}</div>
        <div class="right">{{arr[showitem[3]]}}</div>
      </div>
    </div>
    <div class="placeholder"></div>
    <div class="tools">
      <button @click="toDetail(-1)">新增</button>
    </div>
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
      showitem: [],
      arrs: [],
      queryPage: {
        totalPage: 1,
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  methods: {
    async init() {
      this.arrs = [];
      const res = await customer.read(this.queryPage, {
        customer: this.keywords
      });
      // console.log(res);
      this.queryPage.totalPage = res.totalPage;
      this.showitem = customer.list;
      this.arrs = res.data;
    },

    toDetail(i) {
      wx.navigateTo({
        url: "detail/main?index=" + i
      });
    },
    handleCPage(i) {
      this.queryPage.currentPage = i;
      this.init();
      // console.log(i);
    }
  }
};
</script>

<style>
.scrollpages {
  white-space: nowrap;
  overflow: hidden;
}
.scrollpagesitem {
  display: inline-block;
  padding: 30rpx;
}
.active {
  color: red;
}
</style>
