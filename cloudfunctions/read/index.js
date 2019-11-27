// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  const db = cloud.database()
  var len = {
    skip: 100,
    limit: 100
  }
  const conn = event.conn
  const data = event.data
  // len.skip = len.limit = 100
  // var newList = []
  var {
    total: count
  } = await db.collection(conn).where(data).count()
  var j = Math.floor(count / len.skip)
  // console.log(Math.floor(j))
  return j

  // for (let i = 0; i < j; i++) {
  //   var obj = await db.collection(conn).where(data)
  //     .skip(i * len.skip).limit(len.limit).get()
  //   newList.push(...obj.data)
  // }
  // return newList
}
