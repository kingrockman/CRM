<template>
  <div>
    <div class="card" v-for="(v,k) in myCard" :key="k">
      <div class="left">{{k}}</div>
      <div class="right">{{v}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["myCard", "rule"],
};
</script>

<style>
.card {
  padding: 10px;
}
</style>
