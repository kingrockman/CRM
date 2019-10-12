<template>
  <div class="container">
    <!-- <div class="list" >
      <input v-model="cus" type="text" />
      <button @click="cus_search">查找</button>
      <div class="item" @click="cus_update(i)" :key="i" v-for="(item,i) in customers">
        <p class="title">{{item.name}}</p>
        <div class="subtitle">
          <p>{{item.person}}</p>
          <p>{{item.tel}}</p>
        </div>
      </div>
    </div>-->
    <div class="detail">
      <input v-model="name" type="text" placeholder="名称" />
      <input v-model="number" type="text" placeholder="编号" />
      <input v-model="tel" type="text" placeholder="电话" />
      <input v-model="person" type="text" placeholder="联系人" />
      <input v-model="address" type="text" placeholder="地址" />
      <button @click="cus_add">保存</button>
      <button @click="back">取消</button>
    </div>
  </div>
</template>

<script>
import { query, create ,message} from "../../utils";
export default {
  data() {
    return {
      mycus: "",
      subtitle: "vuejs is good",
      newcus: "",
      customers: [
        {
          number: "KH001",
          name: "晨希",
          tel: "1300000",
          person: "李四",
          address: "市区"
        },
        {
          number: "KH001",
          name: "晨希2",
          tel: "1300000",
          person: "张三",
          address: "市区"
        }
      ]
    };
  },
  methods: {
    async cus_add() {
      var data = {
        number: this.number,
        name: this.name,
        tel: this.tel,
        person: this.person,
        address: this.address
      };
      const res = await create(data);
      message('添加成功！')
      console.log(res)
    },
    async back(){
    },
    cus_search() {},

    cus_update(i) {
      this.mycus = { index: i, data: this.customers[i] };
      // console.log("正在修改" ,this.mycus);
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

