<template>
  <div class="container">
    <div class="list">
      <Customerlist></Customerlist>
      <div class="tools">
        <button @click="toDetail(-1)">新增客户</button>
      </div>
    </div>
  </div>
</template>
<script>
import Customerlist from "@/components/Customerlist";
// import {
//   read,
//   create,
//   update,
//   del,
//   message,
//   setData,
//   getData
// } from "../../utils";
export default {
  components: {
    Customerlist
  },
  methods: {
    toDetail(i) {
      wx.navigateTo({
        url: "detail/main?index=" + i
      });
    }

    // onReady() {
    //   this.init();
    // },
    // onShow(){
    //   this.init();
    // },
    // data() {
    //   return {
    //     // mode: true,
    //     // customers: "",
    //     // id: "",
    //     // number: "",
    //     // name: "",
    //     // tel: "",
    //     // person: "",
    //     // address: "",
    //     // conn: "customers"
    //   };
    // },

    // async init() {
    //   const res = await read(this.conn);
    //   setData("customers", res.data);
    //   const obj = getData("customers");
    //   this.customers = obj;
    // },
    // async back() {
    //   this.toggle();
    // },
    // cus_add(e) {
    //   this.toggle();
    //   this.id = "";
    //   this.number = "";
    //   this.name = e ? e : "";
    //   this.tel = "";
    //   this.person = "";
    //   this.address = "";
    // },
    // cus_delete(i) {},
    // async cus_save() {
    //   if (this.name == "") {
    //     message("请输入客户名称");
    //     return;
    //   }
    //   const obj = {
    //     _id: this.id,
    //     number: this.number,
    //     name: this.name,
    //     tel: this.tel,
    //     person: this.person,
    //     address: this.address
    //   };
    //   wx.showLoading({
    //     title: "加载中",
    //     mask: true
    //   });
    //   if (obj._id === "") {
    //     const res = await create(this.conn, obj);
    //     await this.init();
    //     wx.hideLoading();
    //     message("添加成功!");
    //     this.toggle();
    //   } else {
    //     const res = await update(this.conn, obj);
    //     await this.init();
    //     wx.hideLoading();
    //     message("修改成功!");
    //   }
    // },
    // toggle() {
    //   this.mode = !this.mode;
    // }
  }
};
</script>

<style>
.customers-list {
  border-bottom: gray solid 1px;
  padding: 50rpx 40rpx;
}
.title {
  font-size: 32rpx;
  margin-bottom: 20rpx;
}
.subtitle {
  position: relative;
  flex-direction: row;

  font-size: 24rpx;
  color: gray;
}
.person {
  float: left;
}
.tel {
  float: right;
}
.tools {
  position: fixed;
  bottom: 0;
  right: 10rpx;
}
.detail {
  font-size: 24rpx;
}
</style>

