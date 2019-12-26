// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const conn = 'products'
  const _id = event._id
  const data = event
  delete data._id
  return db.collection(conn)
    .where({
      _id
    })
    .update({
      data
    })
}
