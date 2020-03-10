<template>
  <div class="container">
    <div class="el-card is-always-shadow searchbox">
      <input type="text" placeholder="请输入查询内容..." v-model="keywords" />
      <input type="text" @click="getCustomersData(true)" value="查询" disabled />
    </div>
    <div class="tools">
      <button class="btn circle right" @click="toDetail(-1)">+</button>
    </div>

    <div style="padding-top:42px;padding-bottom:60px">
      <div
        class="el-card is-always-shadow"
        @click="toDetail(item._id)"
        :key="item"
        v-for="item in arrs"
      >
        <div class="header">{{item.customer}}</div>
        <div class="footer">
          <div class="left">{{item.person}}</div>
          <div class="right">{{item.tel}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { clouds } from "@/clouds";
export default {
  onShow() {
    this.getCustomersData(true);
  },
  onReachBottom() {
    if (this.pageQuery.currentPage < this.pageQuery.totalPage) {
      this.pageQuery.currentPage++;
      this.getCustomersData();
      console.log("到底了", this.arrs);
    }
  },
  data() {
    return {
      keywords: "",
      arrs: [],
      pageQuery: {
        totalPage: 0,
        pageSize: 20,
        currentPage: 1
      }
    };
  },
  methods: {
    async getCustomersData(flag) {
      if (flag) {
        this.pageQuery.currentPage = 1;
        this.arrs = [];
      }
      const { result: res } = await clouds("cusRead", {
        key: this.keywords,
        pageQuery: this.pageQuery
      });
      console.log(res);
      this.pageQuery.totalPage = Math.ceil(
        res.totalPage / this.pageQuery.pageSize
      );
      this.arrs.push(...res.data);
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
