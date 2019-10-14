// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  const db = cloud.database()
  const conn = event.conn
  const _id = event.data._id
  const data = event.data
  delete data._id
  return db.collection(conn)
    .where({
      _id
    })
    .update({
      data
    })
}
