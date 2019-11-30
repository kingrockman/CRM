<template>
  <div class="contanier">
    <div class="card">
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
    </div>
    <div class="tools">
      <div class="navbar" v-if="mode">
        <button @click="mode=!mode">修改</button>
        <button class="danger" @click="toDel(arrs._id)">删除</button>
      </div>
      <div class="navbar" v-if="!mode">
        <button v-if="cancel" @click="mode=!mode">取消</button>
        <button @click="toSave">保存</button>
      </div>
    </div>
  </div>
</template>
<script>
import { DBPost } from "@/DBPost";
var customer = new DBPost("customers", ["customer", "person", "", "tel"]);
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
      if (index == -1) {
        console.log("新增");
        this.arrs = {};
        this.mode = this.cancel = false;
      } else {
        await customer.read({ _id: index });
        this.arrs = customer.obj[0];
        // console.log("修改", customer.obj);
      }
    },

    async toSave() {
      console.log("修改了:");

      wx.showLoading({
        title: "加载中"
      });
      if (index == -1) {
        const res = await customer.create(this.arrs);
        this.$root.$mp.query.index = this._id = res.result._id;

        this.cancel = true;
        console.log("新增了:");
      } else {
        // console.log("修改了:", 123);
        const res = await customer.update(this.arrs);
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

    toDel(i) {
      wx.showModal({
        title: "提示",
        content: "这是一个模态弹窗",
        success: async res => {
          if (res.confirm) {
            await customer.del(i);
            wx.navigateBack();
            // wx.reLaunch({ url: "../main" });
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    }

    // async toSave() {
    //   const obj = this.getObj();
    //   if (this.id == "") {
    //     const res = await myCloud(1, conn, obj);
    //     obj.id = res._id;
    //     this.setObj(obj);
    //   } else {
    //     const res = await myCloud(3, conn, obj);
    //   }
    //   this.toggle();
    // },
    // async toDel() {
    //   if (await modal("删除吗？")) {
    //     const r = await myCloud(4, conn, this.id);
    //     if (r.stats.removed === 1) {
    //       wx.switchTab({
    //         url: "../main"
    //       });
    //     }
    //   }
    // },
    // toggle() {
    //   this.mode = !this.mode;
    // }
  }
};
</script>
<style>
/* .danger {
  background-color: #c0392b;
}
.list {
  padding: 20rpx;
  border-bottom: black solid 1px;
}
.list p {
  margin-bottom: 20rpx;
}
.item {
  display: flex;
  flex-direction: row;
  margin-bottom: 10rpx;
}
.key {
  width: 20%;
}
.value {
  width: 100%;
}
input {
  overflow: hidden;
  white-space: inherit;
  text-overflow: ellipsis;
} */
</style>