<template>
  <div class="contanier">
    <div class="el-card is-always-shadow">
      <p>基本信息</p>
      <div class="card-item" hidden>
        <div class="key">ID</div>
        <div class="value">
          <input v-model="arrs._id" type="text" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">客户名称</div>
        <div class="value">
          <input v-model="arrs.customer" type="text" placeholder="客户名称" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">联系人</div>
        <div class="value">
          <input v-model="arrs.person" type="text" placeholder="联系人" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">电话</div>
        <div class="value">
          <input v-model="arrs.tel" type="text" placeholder="电话" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">地址</div>
        <div class="value">
          <input v-model="arrs.address" type="text" placeholder="地址" :disabled="mode" />
        </div>
      </div>
      <div class="card-item">
        <div class="key">备注</div>
        <div class="value">
          <textarea v-model="arrs.remark" type="text" placeholder="备注" :disabled="mode"></textarea>
        </div>
      </div>
      <p>产品信息</p>
      <div class="porducts" v-for="pt in products" :key="pt" @click="toProducts(pt._id)">
        <div>
          <div class="ptName">{{pt.pt_name}}</div>
          <div class="ptDate">{{pt.ct_date}}</div>
        </div>
        <div>{{pt.pt_module}}</div>
      </div>
      <div class="card-item">
        <div class="key">创建者</div>
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
      arrs: {},
      products: []
    };
  },
  methods: {
    async init() {
      index = this.$root.$mp.query.index;
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
        const { result: res } = await clouds("cusById", { _id: index });
        console.log("客户明细", res);

        const { result: res_pt } = await clouds("ptRead", {
          key: res.data[0].customer,
          pageQuery: {
            totalPage: 0,
            pageSize: 100,
            currentPage: 1
          }
        });
        console.log("产品明细", res_pt);
        this.products = res_pt.data;
        this.arrs = res.data[0];
      }
    },

    async toSave() {
      wx.showLoading({
        title: "加载中"
      });
      if (index == -1) {
        const res = await clouds("cusCreate", this.arrs);
        this.$root.$mp.query.index = this._id = res.result._id;
        this.cancel = true;
        console.log("新增了:");
      } else {
        console.log("开始修改数据", this.arrs);
        const res = await clouds("cusUpdate", this.arrs);
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
        content: "是否删除该客户",
        success: async res => {
          if (res.confirm) {
            await clouds("cusDel", { _id: index });
            wx.navigateBack();
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    },
    toProducts(i) {
      console.log(i);
      wx.navigateTo({
        url: "../../product/detail/main?index=" + i
      });
    }
  }
};
</script>
<style>
.porducts {
  padding: 5px 20px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #000;
}
.porducts > div:first-child {
  padding-bottom: 5px;
}
.ptName {
  float: left;
}
.ptDate {
  float: right;
  /* background-color: red; */
}
</style>