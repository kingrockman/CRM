<template>
  <div class="contanier">
    <div v-if="!mode">
      <div class="list">
        <p>基本信息</p>
        <div class="item" hidden="0">
          <div class="key">_id</div>
          <div class="value">{{id}}</div>
        </div>
        <div class="item">
          <div class="key">名称</div>
          <div class="value">{{name}}</div>
        </div>
        <div class="item">
          <div class="key">联系人</div>
          <div class="value">{{person}}</div>
        </div>
        <div class="item">
          <div class="key">地址</div>
          <div class="value">{{address}}</div>
        </div>
      </div>
      <div class="list">
        <p>产品信息</p>
      </div>
      <div class="list">
        <p>合同信息</p>
      </div>
      <div class="tools">
        <button class="danger" @click="toDel">删除</button>
        <button @click="toAlter">修改</button>
      </div>
    </div>
    <div v-if="mode">
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
      person: "",
      tel: "",
      address: ""
    };
  },
  methods: {
    init() {
      const index = this.$root.$mp.query.index;
      if (index == -1) {
        console.log("新增模式");
        this.cancel = false;
        this.mode = true;
        this.id = "";
        this.name = "";
        this.person = "";
        this.tel = "";
        this.address = "";
      } else {
        this.mode = false;
        console.log("修改模式");
        const res = getData("customers");
        this.setObj(res[index]);
      }
    },
    setObj(o) {
      this.id = o._id;
      this.name = o.name;
      this.person = o.person;
      this.tel = o.tel;
      this.address = o.address;
    },
    getObj() {
      return {
        _id: this.id,
        name: this.name,
        person: this.person,
        tel: this.tel,
        address: this.address
      };
    },
    toAlter() {
      const obj = this.getObj();
      this.cancel = true;
      this.toggle();
    },
    async toSave() {
      const obj = this.getObj();

      if (this.id == "") {
        console.log("新增", obj);
        const res = await create("customers", obj);
        obj.id = res._id;
        this.setObj(obj);
        // this.toggle()
      } else {
        console.log("修改", obj);
        const res = await update("customers", obj);
        // console.log(res)
        // this.toggle()
      }
      this.toggle();
    },
    async toDel() {
      console.log(this.id);
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
</style>