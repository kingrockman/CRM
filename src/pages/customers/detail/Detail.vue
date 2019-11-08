<template>
  <div class="contanier">
    <div v-if="!mode">
      <div class="list">
        <h4>基本信息</h4>
        <div class="item" v-if="0">
          <div class="key">ID</div>
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
          <div class="key">手机</div>
          <div class="value">{{tel}}</div>
        </div>
        <div class="item">
          <div class="key">QQ</div>
          <div class="value">{{address}}</div>
        </div>
        <div class="item">
          <div class="key">邮箱</div>
          <div class="value">{{address}}</div>
        </div>
        <div class="item">
          <div class="key">地址</div>
          <div class="value">{{address}}</div>
        </div>
      </div>
      <h4>产品信息</h4>
      <div class="list" :key="item" v-for="item in products">
        <!-- <Productlist :id="id"></Productlist> -->
        <div class="item">
          <div class="key">产品名称</div>
          <div class="value">{{item.name}}</div>
        </div>
        <div class="item">
          <div class="key">CDKEY</div>
          <div class="value">{{item.cdkey}}</div>
        </div>
        <div class="item">
          <div class="key">序列号</div>
          <div class="value">{{item.serial}}</div>
        </div>
      </div>

      <div class="tools">
        <button class="danger" @click="toDel">删除</button>
        <button @click="toAlter">修改</button>
      </div>
    </div>
    <div v-if="mode">
      <div class="list">
        <p>基本信息</p>
        <div class="item">
          <div class="key">ID</div>
          <div class="value">
            <input v-model="id" type="text" />
          </div>
        </div>
        <div class="item">
          <div class="key">客户名称</div>
          <div class="value">
            <input v-model="name" type="text" placeholder="客户名称" />
          </div>
        </div>
        <div class="item">
          <div class="key">联系人</div>
          <div class="value">
            <input v-model="person" type="text" placeholder="联系人" />
          </div>
        </div>
        <div class="item">
          <div class="key">电话</div>
          <div class="value">
            <input v-model="tel" type="text" placeholder="电话" />
          </div>
        </div>
        <div class="item">
          <div class="key">地址</div>
          <div class="value">
            <input v-model="address" type="text" placeholder="地址" />
          </div>
        </div>
      </div>
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
const conn = "customers";
import { getData, myCloud, create, update, del, modal } from "@/utils";
import Productlist from "@/components/Productlist";
export default {
  onReady() {
    this.init();
  },
  onShow() {
    this.init();
  },
  components: {
    Productlist
  },
  data() {
    return {
      cancel: false,
      mode: false,
      id: "",
      name: "",
      person: "",
      tel: "",
      address: "",
      cdkey: "",
      serial: "",
      products: []
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
        this.cdkey = "";
        this.serial = "";
      } else {
        this.mode = false;
        const res = getData(conn);

        var res1;
        for (let i = 0; i < res.length; i++) {
          if (res[i]._id == index) {
            res1 = res[i];
          }
        }

        console.log(res1.products);
        this.setObj(res1);
      }
    },
    setObj(o) {
      this.id = o._id;
      this.name = o.name;
      this.person = o.person;
      this.tel = o.tel;
      this.address = o.address;
      // this.cdkey = o.cdkey;
      // this.serial = o.serial;
      this.products = o.products;
    },
    getObj() {
      return {
        _id: this.id,
        name: this.name,
        person: this.person,
        tel: this.tel,
        address: this.address,
        // cdkey: this.cdkey,
        // serial: this.serial,
        products: this.products
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
        const res = await myCloud(1, conn, obj);
        obj.id = res._id;
        this.setObj(obj);
      } else {
        const res = await myCloud(3, conn, obj);
      }
      this.toggle();
    },
    async toDel() {
      if (await modal("删除吗？")) {
        const r = await myCloud(4, conn, this.id);
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
  width: 20%;
}
.value {
  width: 100%;
}
input {
  overflow: hidden;
  white-space: inherit;
  text-overflow: ellipsis;
}
</style>