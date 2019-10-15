<template>
  <div>
    <!-- <h1>办公</h1> -->
    <div class="list" v-if="mode">
      <div @click="toDetail(i)"  class="todos" :key="i" v-for="(todo,i) in todos">
        <div class="header">{{todo.customer}}</div>
        <div class="body">{{todo.description}}</div>
        <div class="footer">{{todo.content}}</div>
      </div>
      <div class="tools">
        <button @click="toAdd">新增</button>
      </div>
    </div>
    <Todocard></Todocard>
    <div class="detail" v-if="!mode">
      <input v-model="id" v-if="level==10" type="text" placeholder="_id" />
      <input v-model="customer" type="text" placeholder="客户名称" />
      <input v-model="description" type="text" placeholder="请求描述" />
      <textarea v-model="content" type="text" placeholder="内容" />
      <input v-model="done" type="checkbox" >

      <div class="tools">
        <button @click="toSave">保存</button>
        <button @click="toBack">取消</button>
      </div>
    </div>
  </div>
</template>
<script>
import Todocard from "./todo/Todocard";
import {
  create,
  read,
  update,
  del,
  setData,
  getData,
  message
} from "../../utils";
export default {
  created() {
    this.init();
  },
  components: {
    Todocard
  },
  data() {
    return {
      mode: true,
      conn: "todos",
      id: "",
      customer: "",
      description: "",
      content: "",
      todos: []
    };
  },
  methods: {
    async init() {
      wx.showLoading({
        title:'正在加载...'
      })
      const res = await read(this.conn);
      wx.hideLoading()
      setData("todos", res.data);
      this.todos = getData("todos");
      // console.log(res);
    },
    async toSave() {
      if (this.customer == "" || this.description == "") {
        message("请录入完成信息！");
        return;
      }
      wx.showLoading({
        title:'正在加载...'
      })
      const obj = {
        _id: this.id,
        customer: this.customer,
        description: this.description,
        content: this.content
      };
      if (this.id == "") {
        await create(this.conn, obj);
      } else {
        await update(this.conn, obj);
      }
      await this.init();
      message("操作成功！");
      this.toggle();
    },
    toAdd() {
      this.id = "";
      this.customer = "";
      this.description = "";
      this.content = "";
      this.toggle();
    },
    toDetail(i) {
      this.toggle()
      const obj=this.todos[i];
      this.id=obj._id
      this.customer=obj.customer
      this.description=obj.description
      this.content=obj.content
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
.todos {
  margin-bottom: 30rpx;
  border-bottom: gray 1px solid;
}
.header {
  font-size: 32rpx;
  margin-bottom: 10rpx;
}
.body {
  margin-bottom: 10rpx;
}
.footer {
  margin-bottom: 10rpx;
}
.tools {
  position: fixed;
  bottom: 0;
  right: 10rpx;
}
</style>