<template>
  <div class="container">
    <div class="userinfo" v-if="nickName">
      <img :src="avatarUrl" />
      <p>欢迎回来，{{nickName}}</p>
    </div>
    <div class="login" v-if="!nickName">
      <input v-model="userName" type="text" placeholder="用户名" />
      <button class="btn" @click="login">登陆</button>
    </div>
    <input @change="getCuslistData" type="text" v-model="key" />
    <!-- <input type="text" /> -->
    <Cuslist :porp="key"></Cuslist>
  </div>
</template>
<script>
import Todolist from "@/components/Todolist";
import Cuslist from "@/components/Cuslist";
import { login, getData, setData } from "../../utils";
export default {
  components: {
    Todolist,
    Cuslist
  },
  onLoad() {
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
      const userInfo = await login("users", this.userName);
      if (userInfo.data.length) {
        setData("userInfo", userInfo.data[0]);
        this.init();
      }
    }
    //  test() {
    //   var token = getData("token");
    //   var env = "king181013906-27fb3f";
    //   // var url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${token}&env=${env}&name=login`;
    //   var url = `https://api.weixin.qq.com/tcb/databasequery?access_token=${token}`;
    //   console.log(url);
    //   wx.request({
    //     url,
    //     data: {
    //       env,
    //       query:
    //         'db.collection("todos").where({ _id:/[a-z]/g }).limit(10).skip(1).get()'
    //     },
    //     success: res => {
    //       console.log(res);
    //     }
    //   });

    //   // wx.login({
    //   //   success(res) {
    //   //     if (res.code) {
    //   //       //发起网络请求
    //   //       wx.request({
    //   //         url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx466af9243f255de5&secret=3ee1a3f0716aa13ae69bc88ea79cb487&js_code=${
    //   //           res.code
    //   //         }&grant_type=authorization_code`,

    //   //         success: res => {

    //   //           if(typeof res.data.errcode != 'undefined') return console.log("请求失败");
    //   //           console.log(res.data);

    //   //         }
    //   //       });
    //   //     } else {
    //   //       console.log("登录失败！" + res.errMsg);
    //   //     }
    //   //   }
    //   // });
    // },
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