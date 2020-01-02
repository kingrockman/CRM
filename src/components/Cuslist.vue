<template>
  <div>
    客户清单组件{{key}}
    <ul>
      <li v-for="item in cuslist" :key="item">{{item}}</li>
    </ul>
  </div>
</template>
<script>
import { clouds } from "@/clouds";
export default {
  pros: ["key"],
  data() {
    return {
      key: "",
      cuslist: []
    };
  },
  methods: {
    async getCuslistData() {
      console.log(this.key);
      //   console.log("getList");
      //   this.cuslist = [{ customer: "正在加载数据" }];
      //   if (this.cuslist.customer == "") return (this.cuslist = []);
      //   const { result: res } = await clouds("cusList", {
      //     key: this.key
      //   });
      //   console.log(res.data);
      //   this.$forceUpdate();

      //   this.customers = res.data;
    }
  }
};
</script>
<style  scoped>
</style>