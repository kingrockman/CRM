// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event) => {
    const db = cloud.database();
    const conn = event.conn
    const data = event.data
        // return data
    try {
        return db.collection(conn).where(data).get()

    } catch (e) {}
}