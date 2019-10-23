// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event) => {
    const db = cloud.database();
    const conn = event.conn
    console.log(event.data)
    return db.collection(conn).doc(event.data).remove()


}