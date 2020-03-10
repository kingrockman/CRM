<template>
  <div class="container">
    <div class="el-card is-always-shadow searchbox">
      <input type="text" placeholder="请输入查询内容..." v-model="keywords" />
      <input type="text" @click="getPorductsData(true)" value="查询" disabled />
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
        <div class="header">{{item.cus_name}}</div>
        <div class="footer">
          <div class="left">{{item.pt_name}}</div>
          <div class="right">{{item.ct_date}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { clouds } from "@/clouds";
export default {
  onShow() {
    this.getPorductsData(true);
  },
  onReachBottom() {
    if (this.pageQuery.currentPage < this.pageQuery.totalPage) {
      this.pageQuery.currentPage++;
      this.getPorductsData();
      console.log("到底了", this.arrs);
    }
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
    async getPorductsData(flag) {
      if (flag) {
        this.pageQuery.currentPage = 1;
        this.arrs = [];
      }
      const { result: res } = await clouds("ptRead", {
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
      this.getPorductsData();
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
