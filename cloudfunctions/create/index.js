// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init();
const db = cloud.database();

// 云函数入口函数
exports.main = async(event) => {
    // const data = event.data
    // const conn = event.conn
    try {
        return db.collection(event.conn).add({ data: event.data })

    } catch (e) {
        console.log("新增操作出错");
    }
}