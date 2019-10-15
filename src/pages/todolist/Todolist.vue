<template>
  <div>
    <!-- <h1>办公</h1> -->
    <div class="list" v-if="mode">
      <Todocard></Todocard>
      <button @click="toAdd">新增</button>
    </div>
    <div class="detail" v-if="!mode">
      <input v-model="id" type="text" placeholder="_id" />
      <input v-model="customer" type="text" placeholder="客户名称" />
      <input v-model="description" type="text" placeholder="请求描述" />
      <textarea v-model="content" type="text" placeholder="内容" />
      <div class="tools">
        <button @click="toSave">保存</button>
        <button @click="toBack">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
import Todocard from "./todo/Todocard";
import { create, read } from "../../utils";
export default {
  components: {
    Todocard
  },
  data() {
    return {
      mode: true,
      conn: "todos"
    };
  },
  methods: {
    async toSave() {
      const obj = {
        _id: this.id,
        customer: this.customer,
        description: this.description,
        content: this.content
      };
      const res = await create(this.conn);
      console.log(res);
      //   console.log(obj);
    },
    toAdd() {
      this.toggle();
    },
    toBack() {
      this.toggle();
    },
    toggle() {
      this.mode = !this.mode;
    }
  }
};
</script>
<style>
</style>