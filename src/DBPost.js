import utils from './utils'
class DBPost {

    constructor(conn) {
        this.conn = conn
        console.log(`创建了一个 ${conn} 对象！`)
    }
    getInfo() {
        return { conn: this.conn }
    }
    setData(data) {
        wx.setStorageSync(this.conn, data)
    }
    getData() {
        return wx.getStorageSync(this.conn)
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
    read(obj) {
        console.log("正在执行read!")
        return new Promise((resolve, reject) => {
            wx.cloud.callFunction({
                name: "read",
                data: {
                    conn: this.conn,
                    obj,
                },
                success: (res) => {
                    this.obj = res.result
                    this.setData(res.result)
                    resolve()
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
export { DBPost }