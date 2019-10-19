<template>
  <div class="container">
    <div class="userinfo" v-if="nickName">
      <img :src="avatarUrl" />
      <p>欢迎回来，{{nickName}}</p>
    </div>
    <div class="login" v-if="!nickName">
      <input v-model="userName" type="text" placeholder="用户名" />
      <button @click="login">登陆</button>
    </div>
  </div>
</template>
<script>
import { login, getData, setData } from "../../utils";
export default {
  created() {
    this.init();
  },
  data() {
    return {
      avatarUrl: "../../static/images/user.png",
      nickName: ""
    };
  },
  methods: {
    init() {
      const userInfo = getData("userInfo");
      if (userInfo) {
        this.nickName = userInfo.userName;
      }
    },
    async login() {
        console.log('login');
      const userInfo = await login("users", this.userName);
        console.log(userInfo);
      if (userInfo.data.length) {
        // console.log(userInfo);
        setData("userInfo", userInfo.data[0]);
        this.init();
      }
    }
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