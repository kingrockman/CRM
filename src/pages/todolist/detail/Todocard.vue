<template>
  <div class="container">
    <div class="el-card is-always-shadow">
      <div class="card-item" hidden>
        <input type="text" v-model="arrs._id" :disabled="mode" />
      </div>
      <div class="card-item">
        <input
          type="text"
          @input="getCusList"
          v-model="arrs.customer"
          :disabled="mode"
          placeholder="客户名称"
        />
        <ul class="ul-customer">
          <li
            @click="setCusName(item.customer)"
            v-for="item in customers"
            :key="item"
          >{{item.customer}}</li>
        </ul>
      </div>
      <div class="card-item">
        <input type="text" v-model="arrs.description" :disabled="mode" placeholder="服务内容" />
      </div>
      <div class="card-item">
        <textarea type="text" v-model="arrs.detail" :disabled="mode" placeholder="工作内容"></textarea>
      </div>
    </div>
    <div class="el-card is-always-shadow">
      <div class="card-item">
        <input type="text" v-model="arrs.handler" :disabled="mode" placeholder="处理人" />
      </div>
      <div class="card-item">
        <switch type="checkbox" @change="handlerStatus" :disabled="mode" :checked="arrs.status" />
        {{arrs.status?"已完成":"未完成"}}
      </div>
      <div class="card-item">
        <picker mode="date" v-model="ReDate" @change="bindReDateChange" :disabled="mode">
          <span class="picker">上门时间:{{ReDate}}</span>
        </picker>
      </div>
      <div class="card-item">创建者:{{arrs.creater}}</div>
      <div class="card-item">创建日期:{{ct_date}}</div>
    </div>
    <div class="tools">
      <div class="navbar" v-if="mode">
        <button class="btn" @click="mode=!mode">修改</button>
        <button class="btn danger" @click="toDel">删除</button>
      </div>
      <div class="navbar" v-if="!mode">
        <button class="btn" v-if="cancel" @click="mode=!mode">取消</button>
        <button class="btn" @click="toSave">保存</button>
      </div>
    </div>
  </div>
</template>
<script>
import { clouds } from "@/clouds";
import { getData, formatDate } from "@/utils";
var index, thisTime;
export default {
  onLoad() {
    this.init();
    this.ct_date = formatDate(new Date());
    this.ReDate = formatDate(new Date());
  },

  data() {
    return {
      arrs: { status: false },
      mode: true,
      cancel: true,
      customers: [],
      ct_date: null,
      ReDate: null
    };
  },
  methods: {
    async init() {
      index = this.$root.$mp.query.index;
      console.log("init()");
      this.cancel = true;
      if (index === "-1") {
        console.log("新增模式");
        this.cancel = false;
        this.mode = false;
        this.arrs = {};
        var userInfo = getData("userInfo");
        this.arrs.creater = userInfo.userName;
        // this.arrs.ct_date = formatDate(new Date());
      } else {
        console.log("修改模式");
        this.mode = true;
        const { result: res } = await clouds("todoById", { _id: index });
        this.ct_date = formatDate(res.data[0].ct_date);
        this.ReDate = formatDate(res.data[0].re_date);
        this.arrs = res.data[0];
        console.log("正在修改", res.data[0]);
      }
    },

    async toSave() {
      wx.showLoading({
        title: "加载中"
      });
      console.log(index);

      if (index == -1) {
        this.arrs.ct_date = new Date(this.ct_date).getTime();
        this.arrs.re_date = new Date(this.ReDate).getTime();
        const { result: res } = await clouds("todoCreate", this.arrs);
        this.$root.$mp.query.index = res._id;
        this.cancel = true;
        console.log("新增了:", res);
      } else {
        this.arrs.re_date = new Date(this.ReDate).getTime();
        console.log("修改了", this.arrs);
        await clouds("todoUpdate", this.arrs);
      }
      wx.hideLoading();
      wx.showToast({
        title: "完成",
        icon: "success",
        duration: 1000
      });
      this.init();
      this.mode = true;
    },

    toDel() {
      wx.showModal({
        title: "提示",
        content: "是否删除该服务请求",
        success: async res => {
          if (res.confirm) {
            const re = await clouds("todoDel", { _id: index });
            wx.navigateBack();
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    async getCusList() {
      console.log("getList");
      this.customers = [{ customer: "正在加载数据" }];
      if (this.arrs.customer == "") return (this.customers = []);
      const { result: res } = await clouds("cusList", {
        key: this.arrs.customer
      });
      console.log(res.data);
      this.customers = res.data;
    },
    setCusName(val) {
      this.arrs.customer = val;
      this.$forceUpdate();
      this.customers = [];
    },
    bindReDateChange(e) {
      this.ReDate = e.target.value;
      this.arrs.re_date = formatDate(e.target.value);
      console.log(e.target.value);
    },
    handlerStatus(e) {
      this.arrs.status = e.target.value;
      this.$forceUpdate();
      console.log(e.target.value);
    }
  }
};
</script>

<style>
.ul-customer > li {
  padding-top: 8px;
}
</style>