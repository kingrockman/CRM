import utils from './utils'
class DBPost {

  constructor(conn, list) {
    this.conn = conn
    this.list = list
    console.log(`创建了一个 ${conn} 对象！`)
  }
  rules(obj) {
    obj.each((k, v) => {
      console.log(k, v)
    })
  }
  getInfo() {
    return {
      conn: this.conn
    }
  }
  setData(data) {
    wx.setStorageSync(this.conn, data)
  }
  getData() {
    return wx.getStorageSync(this.conn)
  }
  getDataById(key) {
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: "read",
        data: {
          conn: this.conn,
          // obj,
          data: {
            _id: key
          }
        },
        success: (res) => {
          this.obj = res.result
          this.setData(res.result)
          resolve(res.result)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })

    // var obj = this.getData()
    // for (let i = 0; i < obj.length; i++) {
    //     if (obj[i]._id == key) {
    //         return obj[i]
    //         console.log(obj[i]);
    //     }

    // }
  }
  create(obj) {
    console.log("正在执行create!")
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: "create",
        data: {
          conn: this.conn,
          obj,
        },
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  read(key, value, obj) {
    console.log("正在执行read!")
    // console.log(where);

    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: "read",
        data: {
          conn: this.conn,
          where: {
            [key]: value
          },
          obj
        },
        success: (res) => {
          this.obj = res.result
          this.setData(res.result)
          resolve(res.result)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  update(obj) {
    if (!obj) return console.log("请输入更新的内容！");
    console.log("正在执行update!")
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: "update",
        data: {
          conn: this.conn,
          obj,
        },
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  del(obj) {
    if (!obj) return console.log("请输入更新的内容！");
    console.log("正在执行del!")
    return new Promise((resolve, reject) => {
      wx.cloud.callFunction({
        name: "del",
        data: {
          conn: this.conn,
          obj,
        },
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }


}
export {
  DBPost
}
