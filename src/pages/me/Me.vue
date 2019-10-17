<template>
  <div class="container">
    <div class="userinfo">
      <img :src="avatarUrl "/>
      <p>{{nickName}}</p>
      <!-- <button>授权登陆</button> -->
      <!-- <button open-type="getUserInfo" lang="zh_CN" @click="onGotUserInfo">获取用户信息</button> -->
    </div>
  </div>
</template>
<script>
import { getData, setData, login } from "../../utils";
export default {
  created(){
    this.init()
  },
  data() {
    return {
      avatarUrl: "../../static/images/user.png",
      nickName: "授权登陆"
    };
  },
  methods: {
    async init() {
      const res = await login();
      console.log(res);   
    },
    
  }
};
</script>
<style>
.userinfo img {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
}
p {
  font-size: 40rpx;
}
</style>