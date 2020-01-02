<template>
  <div>
    <button class="btn" open-type="getUserInfo" @click="login">授权登录</button>
  </div>
</template>
<script>
import { login } from "../../utils";
export default {
  async created() {
    // console.log(wx.canIUse('button.open-type.getUserInfo'))
    // const res = await login()
    // console.log(res)
  },
  methods: {
    // login(e) {
    //   console.log("login");
    //   wx.cloud.callFunction({
    //     name: "login",
    //     success: res => {
    //       console.log(res);
    //     }
    //   });
    // }
  }
};
</script>