<template>
  <div class="container" style="padding:70px 0">
    <!-- <div class="searchbox">
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
    </div>-->
  </div>
</template>
<script>
import { clouds } from "@/clouds";
export default {
  created() {
    // this.getdata();
    // console.log(clouds);
  },
  data() {
    return {
      pageQuery: {
        pageSize: 10,
        currentPage: 0
      }
    };
  },
  methods: {
    async getdata() {
      const res = await clouds("cusRead", {
        key: "鑫",
        pageQuery: this.pageQuery
      });
      console.log(res);
    }
  }
};
</script>