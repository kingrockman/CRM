<template>
  <div class="container">
    <div class="card">
      <div class="card-item" v-for="(v,k) in arrs" :key="k">
        <div class="left">{{k}}</div>:
        <div class="right">{{v}}</div>
      </div>
    </div>
    <div class="tools">
      <div class="navbar" v-if="mode">
        <button>删除</button>
        <button @click="toAlter">修改</button>
      </div>
      <div class="navbar" v-if="!mode">
        <button @click="toggle">取消</button>
        <button>保存</button>
      </div>
    </div>
  </div>
</template>
<script>
import { DBPost } from "@/DBPost";
var todos = new DBPost("todos");
export default {
  onLoad() {
    this.init();
  },
  data() {
    return {
      arrs: null,
      mode: true
    };
  },
  methods: {
    init() {
      const index = this.$root.$mp.query.index;
      this.arrs = todos.getDataById(index);
    },
    toAlter() {
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