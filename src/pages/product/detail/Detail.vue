<template>
  <div class="contanier">
    <div v-if="!mode">
      <div class="list">
        <p>基本信息</p>
        <div class="item" hidden="0">
          <div class="key">_id</div>
          <div class="value">
            <textarea  v-model="id" type="text" />
          </div>
        </div>
        <div class="item">
          <div class="key">所属企业</div>
          <div class="value">
            <textarea v-model="cus_id" type="text" />
          </div>
        </div>
        <div class="item">
          <div class="key">序列号</div>
          <div class="value">
            <textarea v-model="serial" type="text" />
          </div>
        </div>
        <div class="item">
          <div class="key">手机</div>
          <div class="value">
            <input v-model="tel" type="text" />
          </div>
        </div>
        <div class="item">
          <div class="key">CD-KEY</div>
          <div class="value">
            <input v-model="cdkey" type="text" />
          </div>
        </div>
      </div>
      <div class="tools">
        <button class="danger" @click="toDel">删除</button>
        <button @click="toAlter">修改</button>
      </div>
    </div>
    <div v-if="mode">
      <p>基本信息</p>
      <input v-model="id" hidden="0" type="text" />
      <input v-model="name" type="text" placeholder="客户名称" />
      <input v-model="person" type="text" placeholder="联系人" />
      <input v-model="tel" type="text" placeholder="电话" />
      <input v-model="address" type="text" placeholder="地址" />
      <div class="tools">
        <button @click="toSave">保存</button>
        <div v-if="cancel">
          <button @click="toggle">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getData, create, update, del, modal } from "@/utils";
export default {
  onLoad() {
    this.init();
  },

  data() {
    return {
      cancel: false,
      mode: false,
      id: "",
      name: "",
      cus_id: "",
      cdkey: "",
      tel: "",
      server: "",
      ip: "",
      password: "",
      serial: "",
      createdate: ""
    };
  },
  methods: {
    init() {
      const index = this.$root.$mp.query.index;
      if (index == -1) {
        this.cancel = false;
        this.mode = true;
        this.id = "";
        this.name = "";
        this.person = "";
        this.tel = "";
        this.address = "";
      } else {
        this.mode = false;
        const res = getData("products");
        this.setObj(res[index]);
        console.log(res[index]);
      }
    },
    setObj(o) {
      this.id = o._id;
      this.name = o.name;
      this.cus_id = o.cus_id;
      this.cdkey = o.cdkey;
      this.tel = o.tel;
      this.server = o.server;
      this.ip = o.ip;
      this.password = o.password;
      this.serial = o.serial;
      this.createdate = o.createdate;
    },
    getObj() {
      return {
        _id: this.id,
        name: this.name,
        cus_id: this.cus_id,
        cdkey: this.cdkey,
        tel: this.tel,
        server: this.server,
        ip: this.ip,
        password: this.password,
        serial: this.serial,
        createdate: this.createdate
      };
    },
    toAlter() {
      const obj = this.getObj();
      this.cancel = true;
      this.toggle();
    },
    async toSave() {
      const obj = this.getObj();
      console.log(obj);
      // if (this.id == "") {
      //   const res = await create("customers", obj);
      //   obj.id = res._id;
      //   this.setObj(obj);
      // } else {
      //   const res = await update("customers", obj);
      // }
      // this.toggle();
    },
    async toDel() {
      if (await modal("删除吗？")) {
        const r = await del("customers", this.id);
        if (r.stats.removed === 1) {
          wx.switchTab({
            url: "../main"
          });
        }
      }
    },
    toggle() {
      this.mode = !this.mode;
    }
  }
};
</script>
<style>
.danger {
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
  width: 15%;
}
.value{
  width: 75%;
border: blue solid 1px  
  
}
</style>