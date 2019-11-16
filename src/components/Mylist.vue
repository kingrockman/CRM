<template>
  <div>
    <input type="text" placeholder="查找" v-model="keywords" />
    <div class="list" @click="toDetail(item)" v-for="item in arrs" :key="item._id">
      <div class="title">{{item[list[1]]}}</div>
      <div class="row">
        <div class="left">{{item[list[2]]}}</div>
        <div class="middle">{{item[list[4]]}}</div>
        <div class="right">{{item[list[3]]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { DBPost } from "@/DBPost";
var dbpost;
export default {
  async onLoad() {
    dbpost = new DBPost(this.list[0]);
    await dbpost.read();
    // console.log(dbpost.obj);
    this.arrs = dbpost.obj;
  },
  props: ["list"],
  data() {
    return {
      arrs: [],
      keywords: ""
    };
  },
  methods: {
    toDetail(i) {
      this.$emit("toDetail", i);
    }
  }
};
</script>
<style >
</style>