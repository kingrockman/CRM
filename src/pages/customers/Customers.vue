<template>
  <div class="container">
    <div class="list" >
      <input v-model="cus" type="text" />
      <button @click="cus_search">查找</button>
      <div class="item" @click="cus_update(i)" :key="i" v-for="(item,i) in customers">
        <p class="title">{{item.name}}</p>
        <div class="subtitle">
          <p>{{item.person}}</p>
          <p>{{item.tel}}</p>
        </div>
      </div>
    </div>
    <div class="detail">
      <input type="text" placeholder="名称" :value="test" />
      <!-- <input v-model="number" type="text" placeholder="编号" value="{{number}}" />
      <input v-model="tel" type="text" placeholder="电话" value="{{tel}}" />
      <input v-model="person" type="text" placeholder="联系人" value="{{person}}" />
      <input v-model="address" type="text" placeholder="地址" value="{{address}}" />-->
      <button @click="cus_add">保存</button>
      <button @click="back">取消</button>
    </div>
  </div>
</template>

<script>
import { read, create, message, setData, getData } from "../../utils";
export default {
  created() {
    this.init();
     this.test='asd'
  },
  data() {
    return {
      mode: "list",
      mycus: "",
      subtitle: "vuejs is good",
      newcus: "",
      customers: [],
      test:123
    };
  },
  methods: {
    async init() {
      const res = await read();
      setData("customers", res.data);
      const list = getData("customers");
      this.customers = list;
    },
    async cus_add() {
      var data = {
        number: this.number,
        name: this.name,
        tel: this.tel,
        person: this.person,
        address: this.address
      };
      const res = await create(data);
      message("添加成功！");
      console.log(res);
      this.number = "";
      this.name = "";
      this.tel = "";
      this.person = "";
      this.address = "";
    },
    async back() {
      this.mode = "list";
    },
    cus_search() {
      this.mode = "detail";
    },

    cus_update(i) {
      console.log(this.test)
     
    },
    cus_delete(i) {
      this.customers.splice(i, 1);
    },
    cus_save() {
      this.mycus = "";
    },
    serach() {
      console.log(this.newcus);
    }
  }
};
</script>

<style>
li.done {
  text-decoration: line-through;
  color: red;
}
div {
  border: solid red 1px;
}
</style>

