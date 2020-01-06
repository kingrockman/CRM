<template>
  <div class="container" style="padding:30px 0">
    <div class="tools">
      <button class="btn" @click="toDetail(-1)">新增</button>
    </div>
    <div class="searchbox">
      <input class="searchval" type="text" placeholder="请输入查询内容..." v-model="keywords" />
      <input class="searchbtn" type="text" @click="getTodosData(true)" value="查询" disabled />
    </div>
    <div class="list" @click="toDetail(item._id)" v-for="(item,i) in arrs" :key="item">
      <div class="title">{{item.customer}}</div>
      <div class="subtitle">{{item.description}}</div>
      <div class="subtitle">
        <div class="left">{{item.status}}</div>
        <div class="right">{{ReDate[i]}}</div>
      </div>
    </div>
    <div class="placeholder"></div>
  </div>
</template>
<script>
import { clouds } from "@/clouds";
import { formatDate } from "@/utils";
export default {
  onShow() {
    this.getTodosData(true);
  },

  onReachBottom() {
    if (this.pageQuery.currentPage < this.pageQuery.totalPage) {
      this.pageQuery.currentPage++;
      this.getTodosData();
      console.log("到底了", this.arrs);
    }
  },
  data() {
    return {
      myCard: null,
      arrs: [],
      mode: true,
      showitem: [],
      keywords: "",
      ReDate: [],
      pageQuery: {
        totalPage: 0,
        pageSize: 20,
        currentPage: 1
      }
    };
  },

  methods: {
    toggle() {
      this.mode = !this.mode;
    },
    toDetail(i) {
      wx.navigateTo({
        url: "detail/main?index=" + i
      });
    },
    async getTodosData(flag) {
      console.log("getTodosData");
      if (flag) {
        this.pageQuery.currentPage = 1;
        this.arrs = [];
      }
      const { result: res } = await clouds("todoRead", {
        key: this.keywords,
        pageQuery: this.pageQuery
      });
      this.pageQuery.totalPage = Math.ceil(
        res.totalPage / this.pageQuery.pageSize
      );
      this.arrs.push(...res.data);
      this.ReDate = [];
      this.arrs.forEach(ele => {
        this.ReDate.push(formatDate(ele.re_date));
      });
    },
    handleCPage(i) {
      this.pageQuery.currentPage = i;
      this.getTodosData();
    },
    handleSearch() {
      this.pageQuery.currentPage = 1;
      this.arrs = [];
      this.getTodosData();
    },
    teset() {
      return "a";
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