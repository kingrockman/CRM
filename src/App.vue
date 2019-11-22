<script>
import { setData } from "./utils";
export default {
  async created() {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        traceUser: true
      });
    }

    // var a = {
    //   appid: "wx466af9243f255de5",
    //   secret: "3ee1a3f0716aa13ae69bc88ea79cb487"
    // };
    // var access_token = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${
    //   a.appid
    // }&secret=${a.secret}`;

    // // console.log(access_token);
    // wx.request({
    //   url: access_token,

    //   success: res => {
    //     setData("token", res.data.access_token);
    //   }
    // });
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    // let logs
    // if (mpvuePlatform === 'my') {
    //   logs = mpvue.getStorageSync({key: 'logs'}).data || []
    //   logs.unshift(Date.now())
    //   mpvue.setStorageSync({
    //     key: 'logs',
    //     data: logs
    //   })
    // } else {
    //   logs = mpvue.getStorageSync('logs') || []
    //   logs.unshift(Date.now())
    //   mpvue.setStorageSync('logs', logs)
    // }
  }
  // log () {
  //   console.log(`log at:${Date.now()}`)
  // }
};
</script>

<style>
.card {
  font-size: 50rpx;
  padding: 10rpx;
}
.card-item {
  display: flex;
  flex-direction: row;
  margin: 15rpx 5rpx;
}
.right {
  padding-left: 10rpx;
  width: 100%;
}
.left {
  width: 30%;
}
.list {
  border-bottom: #27ae60 solid 1px;
}
button {
  /* border: red 1px solid; */
  background-color: #27ae60;
  color: white;
  width: 80px;
  height: 30px;
  font-size: 12px;
  margin: 20rpx auto;
}
textarea {
  /* 
  position: absolute;
  display: unset; */
  width: 100%;
  /* height: auto; */
  /* border: red solid 1px; */
}
div {
  font-size: 24rpx;
}
.tools {
  position: fixed;
  bottom: 10px;
}
.navbar {
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
}
.navbar button {
  margin: 0 100rpx;
}
/* .container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}  */
/* this rule will be remove */
/* * {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
} */

/* input {
  padding: 10rpx;
  margin-bottom: 10rpx;
  border-bottom: pink solid 1px;
  border-top: pink solid 1px;
} */
</style>
