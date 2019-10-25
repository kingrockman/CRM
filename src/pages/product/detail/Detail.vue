<template>
  <div class="contanier">
    <div v-if="!mode">
      <div class="list">
        <p>{{cus_name}}</p>
        <div class="item">
          <div class="key">_id</div>
          <div class="value">
            <input v-model="id" type="text" />
          </div>
        </div>
        <div class="item"  hidden="" >
          <div class="key">所属企业</div>
          <div class="value">
            <input v-model="cus_id" type="text"/>
          </div>
        </div>
        <div class="item">
          <div class="key">序列号</div>
          <div class="value">
            <input v-model="serial" type="text" />
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
        <button @click="toSave">保存</button>
      </div>
    </div>
    
  </div>
</template>
<script>
import { getData, create, update, del, message, modal,findData } from "@/utils";
export default {
  onLoad() {
    this.init();
  },

  data() {
    return {
      cancel: false,
      mode: false,
      conn: "products",
      cus_name:"",
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
      console.log("打开的产品ID：",index)
      if (index == "") {
        this.cancel = false;
        this.mode = true;
        this.id = "";
        this.name = "";
        this.person = "";
        this.tel = "";
        this.address = "";
      } else {
        this.mode = false;
        const res = getData(this.conn);
        this.setObj(res.filter(v=>v._id==index)[0]);
      }
    },
    setObj(o) {
      this.id = o._id;
      this.name = o.name;
      this.cus_id = o.cus_id;
      this.cus_name=findData(getData("customers"),o.cus_id)
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
      if (this.id == "") {
        const res = await create(this.conn, obj);
        obj.id = res._id;
        this.setObj(obj);
      } else {
        const res = await update(this.conn, obj);
        message("修改成功！");
      }
      // this.toggle();
    },
    async toDel() {
      if (await modal("删除吗？")) {
        const r = await del(this.conn, this.id);
        if (r) {
          message("删除成功！");
          wx.navigateBack({
            delta: 1
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
.value {
  width: 75%;
}
</style>