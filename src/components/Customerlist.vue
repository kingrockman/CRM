<template>
  <div class="container">
    <input @keyup="toSearch" v-model="search" type="text" placeholder="输入客户名称" />
    <button @click="toSearch">查询</button>
    <!-- <input v-model="search" type="text" placeholder="输入客户名称" /> -->
    <!-- <div class="customers-list" @click="toDetail(arr._id)" :key="arr._id" v-for="arr in arrs">
      <div class="title">{{arr.name}}</div>
      <div class="subtitle">
        <div class="person">{{arr.person}}</div>
        <div class="tel">{{arr.tel}}</div>
      </div>
    </div>-->
    <div :key="arr.name" v-for="arr in cusList()">
      <div>{{arr.name}}</div>
    </div>
  </div>
</template>
<script>
import { read, setData, getData, show, hide } from "../utils";
export default {
  onReady() {
    this.init();
  },
  onShow() {
    this.init();
  },
  data() {
    return {
      conn: "customers",
      search: "",
      arrs: [],
      list: [{ name: "111" }, { name: "222" }]
    };
  },

  methods: {
    async init() {
      show();
      const res = await read(this.conn);
      setData(this.conn, res);
      const obj = getData(this.conn);
      this.arrs = obj;

      hide();
    },
    toDetail(i) {
      wx.navigateTo({
        url: "../customers/detail/main?index=" + i
      });
    },
    cusList() {
      var obj= [{ name: "111" }, { name: "222" }]
      return obj;
    },
    toSearch() {
      const obj = getData(this.conn);

      this.arrs = obj.filter(v => {
        var reg = new RegExp(this.search);
        if (v.name.match(reg)) {
          return v.name;
        }
      });
    }
  }
};
</script>
<style>
input {
  font-size: 32rpx;
  margin: 20rpx;
  padding: 20rpx;
  border: solid pink 1px;
}
.subtitle {
  position: relative;
  flex-direction: row;
  font-size: 24rpx;
  color: gray;
}
.subtitle div {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.person {
  width: 48%;
  float: left;
}
.tel {
  width: 48%;
  float: right;
}
</style>