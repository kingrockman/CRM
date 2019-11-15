<template>
  <div class="container">
    <!-- <Tpllist :tpl="tpl"></Tpllist> -->
    <!-- <Card :myCard="myCard"></Card> -->
    <Card :myCard="myCard" ></Card>
    <div class="list" @click="toDetail(item)" v-for="item in arrs" :key="item._id">
      <div class="title">{{item["description"]}}</div>
      <div class="row">
        <div class="left">{{item["status"]}}</div>
        <div class="middle">{{item["createDate"]}}</div>
        <div class="right">{{item["handler"]}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { DBPost } from "@/DBPost";
import Tpllist from "@/components/Tpllist";
import Card from "@/components/Card";
import { myCloud } from '../../utils';
var todos = new DBPost("todos");
export default {
  async onLoad() {
    await todos.read();

    this.arrs = todos.obj;
  },
  components: {
    Tpllist,
    Card
  },
  data() {
    return {
      myCard:"",
      arrs: [],
      tpl: { key: "todos", template: [] }
    };
  },
  
  methods: {
    toDetail(i) {
      console.log(i);
this.myCard=i
    }
  }
};
</script>


<!--<script>
// import Tpllist from "@/components/Tpllist";
// import {
//   create,
//   read,
//   update,
//   del,
//   setData,
//   getData,
//   message,
//   show,
//   hide
// } from "../../utils";
// export default {
//   onLoad() {
//     this.init();
//   },
//   components: {
//     Tpllist
//   },
//   data() {
//     return {
//       mode: true,
//       conn: "todos",
//       id: "",
//       customer: "",
//       description: "",
//       content: "",
//       todos: []
//     };
//   },
//   methods: {
//     async init() {
//       show();
//       const res = await read(this.conn);
//       hide();
//       setData("todos", res);
//       this.todos = getData("todos");
//       // console.log(res);
//     },
//     async toSave() {
//       if (this.customer == "" || this.description == "") {
//         message("请录入完成信息！");
//         return;
//       }
//       wx.showLoading({
//         title: "正在加载..."
//       });
//       const obj = {
//         _id: this.id,
//         customer: this.customer,
//         description: this.description,
//         content: this.content
//       };
//       if (this.id == "") {
//         await create(this.conn, obj);
//       } else {
//         await update(this.conn, obj);
//       }
//       await this.init();
//       message("操作成功！");
//       this.toggle();
//     },
//     toAdd() {
//       this.id = "";
//       this.customer = "";
//       this.description = "";
//       this.content = "";
//       this.toggle();
//     },
//     toDetail(i) {
//       this.toggle();
//       const obj = this.todos[i];
//       this.id = obj._id;
//       this.customer = obj.customer;
//       this.description = obj.description;
//       this.content = obj.content;
//     },
//     toBack() {
//       this.toggle();
//     },
//     toggle() {
//       this.mode = !this.mode;
//     }
//   }
// };
</script>-->
<style>
.todos {
  margin-bottom: 30rpx;
  border-bottom: gray 1px solid;
}
.header {
  font-size: 32rpx;
  margin-bottom: 10rpx;
}
.body {
  margin-bottom: 10rpx;
}
.footer {
  margin-bottom: 10rpx;
}
.tools {
  position: fixed;
  bottom: 0;
  right: 10rpx;
}

</style>