<template>
  <div class="container">
    <div class="userinfo">
      <img :src="avatarUrl " alt />
      <p>{{nickName}}</p>
      <!-- <button>授权登陆</button> -->
      <button open-type="getUserInfo" lang="zh_CN" @click="onGotUserInfo">获取用户信息</button>
    </div>
  </div>
</template>
<script>
import { getData, setData } from "../../utils";
export default {
  created() {
    this.init();
    // wx.getUserInfo({
    //   success: function(res) {
    //     var userInfo = res.userInfo;
    //     var nickName = userInfo.nickName;
    //     var avatarUrl = userInfo.avatarUrl;
    //     var gender = userInfo.gender; //性别 0：未知、1：男、2：女
    //     var province = userInfo.province;
    //     var city = userInfo.city;
    //     var country = userInfo.country;
    //   }
    // });
  },
  data() {
    return {
      avatarUrl: "../../static/images/user.png",
      nickName: "授权登陆"
    };
  },
  methods: {
    async init() {
      const res = await this.myUserInfo();
      this.avatarUrl=res.userInfo.avatarUrl
      this.nickName=res.userInfo.nickName
      console.log(res)
    },
    async onGotUserInfo() {
      const res = await this.myUserInfo();
      console.log(res.userInfo);
    },
    myUserInfo() {
      return new Promise((resolve, reject) => {
        wx.getUserInfo({
          success: res => {
            resolve(res);
          }
        });
      });
    }
  }
};
</script>
<style>
.userinfo img {
  width: 200rpx;
  height: 200rpx;
  border-radius:50%;
}
p {
  font-size: 40rpx;
}
</style>