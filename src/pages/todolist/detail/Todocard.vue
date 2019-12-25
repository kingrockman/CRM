<template>
  <div class="container">
    <div class="card">
      <div class="card-item" hidden>
        <div class="key">编号</div>:
        <div class="value">
          <input type="text" v-model="arrs._id" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">客户名称</div>:
        <div class="value">
          <input type="text" @input="getCusList" v-model="arrs.customer" :disabled="mode" />
          <ul class="ul-customer">
            <li
              @click="setCusName(item.customer)"
              v-for="item in customers"
              :key="item"
            >{{item.customer}}</li>
          </ul>
        </div>
      </div>
      <div class="card-item">
        <div class="key">服务内容</div>:
        <div class="value">
          <input type="text" v-model="arrs.description" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">工作内容</div>:
        <div class="value">
          <textarea type="text" v-model="arrs.detail" :disabled="mode"></textarea>
        </div>
      </div>
      <div class="card-item">
        <div class="key">处理人</div>:
        <div class="value">
          <input type="text" v-model="arrs.handler" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">状态</div>:
        <div class="value">
          <input type="text" v-model="arrs.status" :disabled="mode" />
        </div>
      </div>

      <div class="card-item">
        <div class="key">上门时间</div>:
        <div class="value">
          <input type="text" v-model="arrs.re_date" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">创建者</div>:
        <div class="value">
          <input type="text" v-model="arrs.creater" disabled />
        </div>
      </div>
      <div class="card-item">
        <div class="key">创建日期</div>:
        <div class="value">
          <input type="text" v-model="arrs.ct_date" disabled />
        </div>
      </div>
    </div>
    <div class="tools">
      <div class="navbar" v-if="mode">
        <button @click="mode=!mode">修改</button>
        <button class="danger" @click="toDel">删除</button>
      </div>
      <div class="navbar" v-if="!mode">
        <button v-if="cancel" @click="mode=!mode">取消</button>
        <button @click="toSave">保存</button>
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
  },

  data() {
    return {
      arrs: {},
      mode: true,
      cancel: true,
      customers: []
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
        this.arrs.ct_date = formatDate(new Date());
      } else {
        console.log("修改模式");
        this.mode = true;
        const { result: res } = await clouds("todoById", { _id: index });
        console.log(res);

        this.arrs = res.data[0];
      }
    },

    async toSave() {
      wx.showLoading({
        title: "加载中"
      });
      console.log(index);

      if (index == -1) {
        const { result: res } = await clouds("todoCreate", this.arrs);
        this.$root.$mp.query.index = res._id;
        this.cancel = true;
        console.log("新增了:", res);
      } else {
        await clouds("todoUpdate", this.arrs);
        console.log("修改了", this.arrs);
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
    }
  }
};
</script>

<style>
.ul-customer > li {
  padding-bottom: 8px;
}
</style>