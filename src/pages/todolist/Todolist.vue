<template>
  <div class="container">
    <div class="tools">
      <button class="btn circle right" @click="toDetail(-1)">+</button>
    </div>
    <div class="el-card is-always-shadow searchbox">
      <input type="text" placeholder="请输入查询内容..." v-model="keywords" />
      <input type="text" @click="getTodosData(true)" value="查询" disabled />
    </div>
    <div style="padding-top:42px;padding-bottom:60px">
      <div
        :class="'el-card is-always-shadow '+(item.status?'done':'disdone')"
        v-for="(item,i) in arrs"
        :key="item"
        @click="toDetail(item._id)"
      >
        <div class="header">{{item.customer}}</div>
        <div class="content">{{item.description}}</div>
        <div class="footer">
          <div class="left">{{item.status?"已完成":"未完成"}}</div>
          <div class="right">{{ReDate[i]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { clouds } from "@/clouds";
import { formatDate } from "@/utils";
import Card from "@/hele/card";

export default {
  components: {
    Card
  },
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
      console.log(this.arrs);
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
  padding: 15px;
}
</style>