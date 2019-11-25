<template>
  <div class="container">
    <div class="card">
      <div class="card-item" hidden>
        <div class="left">编号</div>:
        <div class="right">
          <input type="text" v-model="arrs._id" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="left">客户名称</div>:
        <div class="right">
          <input type="text" v-model="arrs.customer" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="left">服务内容</div>:
        <div class="right">
          <input type="text" v-model="arrs.description" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="left">工作内容</div>:
        <div class="right">
          <textarea type="text" v-model="arrs.detail" :disabled="mode"></textarea>
        </div>
      </div>
      <div class="card-item">
        <div class="left">处理人</div>:
        <div class="right">
          <input type="text" v-model="arrs.handler" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="left">状态</div>:
        <div class="right">
          <input type="text" v-model="arrs.status" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="left">创建日期</div>:
        <div class="right">
          <input type="text" v-model="arrs.createDate" disabled />
        </div>
      </div>
      <div class="card-item">
        <div class="left">创建者</div>:
        <div class="right">
          <input type="text" v-model="arrs.creater" disabled />
        </div>
      </div>
    </div>
    <div class="tools">
      <div class="navbar" v-if="mode">
        <button @click="mode=!mode">修改</button>
        <button class="danger" @click="toDel(arrs._id)">删除</button>
      </div>
      <div class="navbar" v-if="!mode">
        <button @click="mode=!mode">取消</button>
        <button @click="toSave">保存</button>
      </div>
    </div>
  </div>
</template>
<script>
import { DBPost } from "@/DBPost";
// import { getData } from "@/utils";
// import { formatDate } from '../../../utils';
import { getData,formatDate } from "../../../utils";
var todos = new DBPost("todos");
var index;
export default {
  onLoad() {
    this.init();
    // formatDate(new Date());
  },
  data() {
    return {
      arrs: {},
      mode: true
    };
  },
  methods: {
    async init() {
      // this.arrs = {};
      index = this.$root.$mp.query.index;

      if (index == -1) {
        this.arrs = {};
        var userInfo = getData("userInfo");

        this.arrs.creater = userInfo.userName;
        this.arrs.createDate =formatDate(new Date());
        this.mode = false;

        return console.log("新增模式", getData("userInfo"));
      }
      this.mode = true;
      const res = await todos.getDataById(index);
      this.arrs = res[0];
      // console.log(res[0]);
    },

    async toSave() {
      wx.showLoading({
        title: "加载中"
      });
      if (index == -1) {
        // this.mode=false
        const res = await todos.create(this.arrs);
        this.$root.$mp.query.index = res.result._id;
        console.log("新增了:");
      } else {
        await todos.update(this.arrs);
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

    toDel(i) {
      wx.showModal({
        title: "提示",
        content: "这是一个模态弹窗",
        success: async res => {
          if (res.confirm) {
            await todos.del(i);
            wx.navigateBack();
            // wx.reLaunch({ url: "../main" });
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }
  }
};
</script>
<style>
</style>