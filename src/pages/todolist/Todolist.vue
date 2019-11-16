<template>
  <div class="container">
    <!-- <Card :myCard="myCard" @toggle="test" v-if="!mode"></Card> -->
    <!-- <Mylist :list="list" @toDetail="toDetail" v-if="mode"></Mylist> -->
    <div v-if="mode">
      <input @click="toSearch" type="text" placeholder="查找" v-model="keywords" />
      <div class="list" @click="toDetail(item._id)" v-for="item in arrs" :key="item._id">
        <div class="title">{{item[showitem[0]]}}</div>
        <div class="row">
          <div class="left">{{item[showitem[1]]}}</div>
          <div class="middle">{{item[showitem[3]]}}</div>
          <div class="right">{{item[showitem[2]]}}</div>
        </div>
      </div>
      <!-- <div class="tools">
        <button>新增</button>
        <button @click="toggle">取消</button>
      </div>-->
    </div>
  </div>
</template>
<script>
import { DBPost } from "@/DBPost";
import Mylist from "@/components/Mylist";
import Card from "@/components/Card";
import { myCloud } from "../../utils";
var todos = new DBPost("todos", [
  "description",
  "status",
  "handler",
  "createDate"
]);
export default {
  async onLoad() {
    await todos.read();
    this.showitem = todos.list;
    this.arrs = todos.obj;
  },
  components: {
    Mylist,
    Card
  },
  data() {
    return {
      myCard: null,
      arrs: [],
      mode: true,
      showitem: []
    };
  },

  methods: {
    toggle() {
      this.mode = !this.mode;
    },
    toDetail(i) {
      wx.navigateTo({
        url: "detail/main?index="+i
      });
    },
    toSearch() {

      this.arrs = todos.obj.filter(v => {
        var reg = new RegExp(this.keywords);
        if (v.description.match(reg)) {
          return v.description;
        }
      });
      
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