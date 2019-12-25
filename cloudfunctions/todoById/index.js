// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async event => {
  const db = cloud.database()
  const conn = "todos"
  console.log(event)
  const res = db.collection(conn).where({
    _id: event._id
  }).get()

  return res




}
