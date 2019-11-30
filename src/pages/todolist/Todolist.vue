<template>
  <div class="container">
    <div class="tools">
      <button @click="toDetail(-1)">新增</button>
    </div>
    <div class="searchbox">
      <input class="searchval" type="text" placeholder="请输入查询内容..." v-model="keywords" />
      <input class="searchbtn" type="text" @click="toSearch" value="查询" disabled />
    </div>
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
// import { myCloud } from "../../utils";
var todos = new DBPost("todos", [
  "customer",
  "description",
  "status",
  "createDate"
]);
export default {
  onShow() {
    this.toSearch();
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
      keywords: ""
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
    async toSearch() {
      // console.log(this.keywords);
      var reg = { customer: this.keywords };
      console.log(await todos.read({ customer: this.keywords }));
      this.showitem = todos.list;
      this.arrs = todos.obj;

      // this.arrs = todos.obj.filter(v => {
      //   var reg = new RegExp(this.keywords);
      //   if (v.description.match(reg)) {
      //     return v.description;
      //   }
      // });
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
</style>