<template>
  <div class="container">
    <div class="userinfo" v-if="nickName">
      <img :src="avatarUrl" />
      <p>欢迎回来，{{nickName}}</p>
    </div>
    <div class="login" v-if="!nickName">
      <input v-model="userName" type="text" placeholder="用户名" />
      <button class="btn" @click="login">登陆</button>
    </div>日期选择器
    <picker mode="date" @change="bindTimeChange">
      <span class="picker">{{time}}</span>
    </picker>
    <div>
      <Card>
        <Buttons size="mini" @click="console.log(12222)">确认</Buttons>
        <Buttons type="primary">确认确认确认</Buttons>
        <Buttons type="success">123</Buttons>
        <Buttons type="info">123</Buttons>
        <Buttons type="warning">123</Buttons>
        <Buttons type="danger">123</Buttons>
      </Card>
    </div>
  </div>
</template>
<script>
import Todolist from "@/components/Todolist";
import Cuslist from "@/components/Cuslist";
import Card from "@/hele/card";
import Buttons from "@/hele/button";
import { login, getData, setData, formatDate, formatDates } from "@/utils";
export default {
  components: {
    Todolist,
    Cuslist,
    Card,
    Buttons
  },
  onLoad() {
    console.log(Buttons);

    this.init();
    // 2019年12月16日
    console.log(new Date("2019-11-22").getTime());

    // 1575158400000="2019-12-01"
    // const dt = new Date("2020-12-01").getTime();
    // const day = new Date();
    // console.log(dt, typeof new Date(dt), new Date(dt));
    // console.log(dt, typeof formatDate(dt), formatDate(dt));
  },

  data() {
    return {
      avatarUrl: "../../static/images/user.png",
      nickName: "",
      time: formatDate(new Date())
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
    },
    bindTimeChange(val) {
      console.log(new Date(val.target.value).getTime());
      this.time = val.target.value;
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
    // wx.login({
    //   success(res) {
    //     if (res.code) {
    //       //发起网络请求
    //       wx.request({
    //         url: `https://api.weixin.qq.com/sns/jscode2session?appid=wx466af9243f255de5&secret=3ee1a3f0716aa13ae69bc88ea79cb487&js_code=${
    //           res.code
    //         }&grant_type=authorization_code`,
    //         success: res => {
    //           if(typeof res.data.errcode != 'undefined') return console.log("请求失败");
    //           console.log(res.data);
    //         }
    //       });
    //     } else {
    //       console.log("登录失败！" + res.errMsg);
    //     }
    //   }
    // });
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