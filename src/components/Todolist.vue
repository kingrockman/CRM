<template>
  <div class="container">
    我的工作要点
    <input @keypress.enter="toSave" v-model="myPoint" type="text" placeholder="请输入要点" />
    <button @click="toSave">添加</button>
    <button @click="toClear">清除</button>
    <ul>
      <li @click="toggle(i)" v-for="(p,i) in workPoints" :key="i">{{p.text}}</li>
    </ul>
  </div>
</template>
<script>
import { getData, setData, create, read,myCloud } from "../utils";
export default {
  created() {
    this.init();
  },
  data() {
    return {
      myPoint: "",
      workPoints: []
    };
  },
  methods: {
    async init() {

      const res =await read("workPoints")
      // console.log(res)      
      this.workPoints = getData("workPoints");
      // console.log(this.workPoints);
      if (!this.workPoints) {
        this.workPoints = [];
      }
    },
    toSave() {
      if (this.myPoint) {
        this.workPoints.push({ text: this.myPoint, done: false });
        setData("workPoints", this.workPoints);
        this.init();
        this.saveToServer();
        this.myPoint = "";
      }
    },
    async saveToServer() {
      const userInfo=getData("userInfo")
      // const res = await create("workPoints",{openId:userInfo.openId,workPoints:this.workPoints});
      // const res =await updata("workPoints",)
    },
    toggle(i) {
      this.saveToServer();
    },
    toClear() {
      this.saveToServer();

    }
  }
};
</script>
<style>
.container {
  font-size: 40rpx;
  margin-top: 30rpx;
}
</style>