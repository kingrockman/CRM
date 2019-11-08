<template>
  <div class="container">
    <div class="list">
      <Productlist ></Productlist>
      <div class="tools">
        <button @click="toDetail(-1)">新增客户</button>
      </div>
    </div>
  </div>
</template>

<script>

import Productlist from "@/components/Productlist";
import {
  read,
  create,
  update,
  del,
  message,
  setData,
  getData
} from "../../utils";
export default {
  components: {
    Productlist
  },

  data() {
    return {
   
    };
  },
  methods: {
  
    toDetail(i) {      
      wx.navigateTo({
        url: "../product/detail/main?index="+i
      });
    },
    
  }
};
</script>

<style>

</style>

