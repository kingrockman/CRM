<template>
  <div class="contanier">
    <div class="view">
      <div class="list">
        <p>基本信息</p>
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
    </div>
  </div>
</template>
<script>
import { getData } from "@/utils";
export default {
  onLoad() {
    this.init();
  },
  data() {
    return {
      name: "",
      person: "",
      tel: "",
      address: ""
    };
  },
  methods: {
    init() {
      const index = this.$root.$mp.query.index;
      const res = getData("customers");
      const obj = res[index];
    //   console.log(obj);
      this.initObj(obj);
    },
    initObj(o) {
      this.name = o.name;
      this.person = o.person;
      this.tel = o.tel;
      this.address = o.address;
    }
  }
};
</script>
<style>
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