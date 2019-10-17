<script>
import { login, setData } from "./utils";

export default {
  async created() {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        traceUser: true
      });
    }
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
button {
  border: red 1px solid;
  width: 80px;
  height: 30px;
  font-size: 12px;
  margin: 20rpx auto;
}
input {
  /* margin: 10rpx 30rpx; */
  padding: 10rpx;
  margin-bottom: 10rpx;
  border-bottom: pink solid 1px;
  border-top: pink solid 1px;
}
textarea {
  width: 100%;
  padding: 10rpx;
  margin-bottom: 10rpx;
  border-bottom: pink solid 1px;
  border-top: pink solid 1px;
}
div {
  font-size: 24rpx;
}
</style>
