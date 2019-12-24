// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const conn = "todos"

  const {
    data: res
  } = await db.collection(conn).where(event).get()
  console.log(res);
  return event

}
