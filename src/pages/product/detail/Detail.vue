<template>
  <div class="contanier">
    <div class="card">
      <div class="card-item" hidden>
        <div class="key">客户ID</div>
        <div class="value">
          <input v-model="arrs.cus_id" type="text" placeholder="客户名称" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">客户名称</div>
        <div class="value">
          <input v-model="arrs.cus_name" type="text" placeholder="客户名称" :disabled="mode" />
        </div>
      </div>
      <div class="card-item" hidden>
        <div class="key">ID</div>
        <div class="value">
          <input v-model="arrs._id" type="text" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">产品名称</div>
        <div class="value">
          <input v-model="arrs.pt_name" type="text" placeholder="产品名称" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">产品模块</div>
        <div class="value">
          <input v-model="arrs.pt_module" type="text" placeholder="产品模块" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">CDKEY</div>
        <div class="value">
          <input v-model="arrs.cdkey" type="text" placeholder="CDKEY" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">序列号</div>
        <div class="value">
          <input v-model="arrs.serial" type="text" placeholder="序列号" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">服务器名称</div>
        <div class="value">
          <input v-model="arrs.server" type="text" placeholder="服务器名称" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">服务器IP</div>
        <div class="value">
          <input v-model="arrs.ip" type="text" placeholder="服务器IP" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">数据库版本</div>
        <div class="value">
          <input v-model="arrs.sql" type="text" placeholder="数据库版本" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">数据库密码</div>
        <div class="value">
          <input v-model="arrs.sql_sa" type="text" placeholder="数据库密码" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">创建人</div>
        <div class="value">
          <input v-model="arrs.creater" type="text" disabled />
        </div>
      </div>
      <div class="card-item">
        <div class="key">创建日期</div>
        <div class="value">
          <input v-model="arrs.ct_date" type="text" disabled />
        </div>
      </div>
    </div>
    <div class="placeholder"></div>
    <div class="placeholder"></div>
    <div class="placeholder"></div>
    <div class="placeholder"></div>
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
import { getData, formatDate } from "../../../utils";
var index;
export default {
  onShow() {
    this.init();
  },
  data() {
    return {
      cancel: true,
      mode: true,
      arrs: {}
    };
  },
  methods: {
    async init() {
      index = this.$root.$mp.query.index;
      console.log(index);

      if (index == -1) {
        console.log("新增模式");
        this.arrs = {};
        var userInfo = getData("userInfo");
        this.arrs.creater = userInfo.userName;
        this.arrs.ct_date = formatDate(new Date());
        this.arrs.products = [
          {
            name: "",
            serial: "",
            cdkey: "",
            viability: ""
          }
        ];
        this.mode = this.cancel = false;
      } else {
        console.log("修改模式");
        this.mode = this.cancel = true;
        const { result: res } = await clouds("ptById", { _id: index });
        this.arrs = res.data[0];
        console.log(this.arrs);
      }
    },

    async toSave() {
      wx.showLoading({
        title: "加载中"
      });
      if (index == -1) {
        const res = await clouds("ptCreate", this.arrs);
        this.$root.$mp.query.index = this._id = res.result._id;
        this.cancel = true;
        console.log("新增了:");
      } else {
        console.log("开始修改数据", this.arrs);
        const res = await clouds("ptUpdate", this.arrs);
        console.log("修改了:", res);
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
    addProducts() {
      console.log(this.arrs.products);

      this.arrs.products.push({
        name: "",
        serial: "",
        cdkey: "",
        viability: ""
      });
      console.log(this.arrs.products);
    },
    toDel() {
      wx.showModal({
        title: "提示",
        content: "是否删除该产品",
        success: async res => {
          if (res.confirm) {
            await clouds("ptDel", { _id: index });
            wx.navigateBack();
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