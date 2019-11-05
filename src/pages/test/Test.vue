<template>
  <div>{{obj}}</div>
</template>
<script>
export default {
  onLoad() {
    var list = [];
    for (var i = 0; i <= 1000; i++) {
      list.push(i);
    }
    wx.setStorageSync("key", list)
  
    console.log(list);
  },
  data() {
    return {
      obj: [1, 2, 3]
    };
  }
};
</script>