<template>
  <div class="container" style="padding:30px 0">
    <div class="tools">
      <button @click="toDetail(-1)">新增</button>
    </div>
    <div class="searchbox">
      <input class="searchval" type="text" placeholder="请输入查询内容..." v-model="keywords" />
      <input class="searchbtn" type="text" @click="getTodosData(true)" value="查询" disabled />
      <!-- <scroll-view class="scrollpages" scroll-x>
        <div
          :class="pageQuery.currentPage-1==i?'scrollpagesitem active':'scrollpagesitem'"
          v-for="i in pageQuery.totalPage"
          :key="i"
          @click="handleCPage(i)"
        >{{i+1}}</div>
      </scroll-view>-->
    </div>
    <!-- <div class="placeholder"></div> -->
    <div class="list" @click="toDetail(item._id)" v-for="item in arrs" :key="item._id">
      <div class="title">{{item.customer}}</div>
      <div class="subtitle">{{item.description}}</div>
      <div class="subtitle">
        <div class="left">{{item.status}}</div>
        <div class="right">{{item.re_date}}</div>
      </div>
    </div>
    <div class="placeholder"></div>
  </div>
</template>
<script>
import { clouds } from "@/clouds";
export default {
  onShow() {
    this.getTodosData();
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
      console.log(res);
      this.pageQuery.totalPage = Math.ceil(
        res.totalPage / this.pageQuery.pageSize
      );
      this.arrs.push(...res.data);
    },
    handleCPage(i) {
      this.pageQuery.currentPage = i;
      this.getTodosData();
    },
    handleSearch() {
      this.pageQuery.currentPage = 1;
      this.arrs = [];
      this.getTodosData();
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