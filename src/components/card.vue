<template>
  <div>
    <div class="card">
      <div class="card-item"  v-for="(v,k) in myCard" :key="k">
        <div class="left">{{k}}</div>:
        <div class="right">{{v}}</div>
      </div>
    </div>
    <div class="editCard"></div>
    <div class="tools">
      <button @click="toSave">保存</button>
      <button @click="cansel">取消</button>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    
  },
  props: ["myCard", "rule"],
  data() {},
  methods: {
    cansel() {
      this.$emit("toggle");
    }
  }
};
</script>

<style>
</style>
