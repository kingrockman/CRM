<template>
  <div class="container" style="padding:30px 0">
    <div class="tools">
      <button @click="toDetail(-1)">新增</button>
    </div>
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
    <div class="placeholder"></div>
    <div class="list" @click="toDetail(item._id)" v-for="item in arrs" :key="item._id">
      <div class="title">{{item[showitem[0]]}}</div>
      <div class="subtitle">{{item[showitem[1]]}}</div>
      <div class="subtitle">
        <div class="left">{{item[showitem[2]]}}</div>
        <div class="right">{{item[showitem[3]]}}</div>
      </div>
    </div>
    <div class="placeholder"></div>

    <!-- </div> -->
  </div>
</template>
<script>
import { DBPost } from "@/DBPost";
import Mylist from "@/components/Mylist";
import Card from "@/components/Card";
var todos = new DBPost("todos", [
  "customer",
  "description",
  "status",
  "re_date"
]);
export default {
  onShow() {
    this.init();
  },
  components: {
    Mylist,
    Card
  },
  data() {
    return {
      myCard: null,
      arrs: [],
      mode: true,
      showitem: [],
      keywords: "",
      queryPage: {
        totalPage: 1,
        pageSize: 10,
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
    async init() {
      const res = await todos.read(this.queryPage, {
        customer: this.keywords
      });

      this.queryPage.totalPage = res.totalPage;
      this.showitem = todos.list;
      this.arrs = res.data;
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
/* input {
  font-size: 32rpx;
  margin: 20rpx;
  padding: 20rpx;
  border: solid pink 1px;
}
.todos {
  margin-bottom: 30rpx;
  border-bottom: gray 1px solid;
}
.header {
  font-size: 32rpx;
  margin-bottom: 10rpx;
}
.body {
  margin-bottom: 10rpx;
}
.footer {
  margin-bottom: 10rpx;
}
.tools {
  position: fixed;
  bottom: 0;
  right: 10rpx;
} */

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