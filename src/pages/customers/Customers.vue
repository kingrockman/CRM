<template>
  <div class="container">
    <div class="list" v-if="mode">
      <Customerlist @cus_add="cus_add"></Customerlist>
      <div
        class="customers-list"
        @click="cus_update(index)"
        :key="index"
        v-for="(cus,index) in customers"
      >
        <div class="title">{{cus.name}}</div>
        <div class="subtitle">
          <div class="person">{{cus.person}}</div>
          <div class="tel">{{cus.tel}}</div>
        </div>
      </div>
    </div>
    <div class="detail" v-if="!mode">
      <p>基本信息：</p>
      <input v-model="id" hidden="true" type="text" placeholder="_id" />
      <input v-model="name" type="text" placeholder="名称" />
      <input v-model="number" hidden="true" type="text" placeholder="编号" />
      <input v-model="tel" type="text" placeholder="电话" />
      <input v-model="person" type="text" placeholder="联系人" />
      <input v-model="address" type="text" placeholder="地址" />
      <p>合同信息：</p>
      <p>产品信息：</p>

      <div class="tools">
        <button @click="cus_save">保存</button>
        <button @click="back">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import Customerlist from "@/components/Customerlist";
import {
  read,
  create,
  update,
  del,
  message,
  setData,
  getData
} from "../../utils";
export default {
  
  components: {
    Customerlist
  },
  created() {
    this.init();
  },
  data() {
    return {
      mode: true,
      customers: "",
      id: "",
      number: "",
      name: "",
      tel: "",
      person: "",
      address: "",
      conn:'customers'
    };
  },
  methods: {
    async init() {
      const res = await read(this.conn);
      setData("customers", res.data);
      const obj = getData("customers");
      this.customers = obj;
    },
    async back() {
      this.toggle();
    },

    cus_add(e) {
      this.toggle();
      this.id = "";
      this.number = "";
      this.name = e ? e : "";
      this.tel = "";
      this.person = "";
      this.address = "";
      // console.log(e);
    },
    cus_update(i) {
      const obj = this.customers[i];
      this.id = obj._id;
      this.number = obj.number;
      this.name = obj.name;
      this.tel = obj.tel;
      this.person = obj.person;
      this.address = obj.address;
      this.toggle();
    },
    cus_delete(i) {},
    async cus_save() {
      if (this.name == "") {
        message("请输入客户名称");
        return;
      }
      const obj = {
        _id: this.id,
        number: this.number,
        name: this.name,
        tel: this.tel,
        person: this.person,
        address: this.address
      };
      wx.showLoading({
        title: "加载中",
        mask: true
      });
      if (obj._id === "") {
        const res = await create(this.conn,obj);
        await this.init();
        wx.hideLoading();

        message("添加成功!");
        this.toggle();
      } else {
        const res = await update(this.conn,obj);
        await this.init();
        wx.hideLoading();
        message("修改成功!");
      }
    },
    toggle() {
      this.mode = !this.mode;
    }
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
  flex-direction: row;
}
.detail{
  font-size: 24rpx;
  
}
</style>

