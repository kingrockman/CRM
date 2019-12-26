<template>
  <div class="container" style="padding:70px 0">
    <div class="searchbox">
      <input class="searchval" type="text" placeholder="请输入查询内容..." v-model="keywords" />
      <input class="searchbtn" type="text" @click="getCustomersData" value="查询" disabled />
      <scroll-view class="scrollpages" scroll-x>
        <div
          :class="pageQuery.currentPage-1==i?'scrollpagesitem active':'scrollpagesitem'"
          v-for="i in pageQuery.totalPage"
          :key="i"
          @click="handleCPage(i)"
        >{{i+1}}</div>
      </scroll-view>
    </div>
    <div class="list" @click="toDetail(item._id)" :key="item._id" v-for="item in arrs">
      <div class="title">{{item.cus_name}}</div>
      <div class="subtitle">
        <div class="left">{{item.pt_name}}</div>
        <div class="right"></div>
      </div>
    </div>
    <div class="placeholder"></div>
    <div class="tools">
      <button @click="toDetail(-1)">新增</button>
    </div>
  </div>
</template>
<script>
import { clouds } from "@/clouds";
export default {
  onShow() {
    this.getCustomersData();
  },
  data() {
    return {
      keywords: "",
      arrs: [],
      pageQuery: {
        totalPage: 0,
        pageSize: 10,
        currentPage: 1
      }
    };
  },
  methods: {
    async getCustomersData() {
      this.arrs = [];
      const { result: res } = await clouds("ptRead", {
        key: this.keywords,
        pageQuery: this.pageQuery
      });
      console.log(res);
      this.pageQuery.totalPage = res.totalPage;
      this.arrs = res.data;
    },
    toDetail(i) {
      wx.navigateTo({
        url: "detail/main?index=" + i
      });
    },
    handleCPage(i) {
      if (this.pageQuery.currentPage == i) return;
      this.pageQuery.currentPage = i;
      this.getCustomersData();
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
