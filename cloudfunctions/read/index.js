// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async(event) => {
  const db = cloud.database();
  const conn = event.conn
  const data = event.data
  const skip = limit = 100
  var newList = []
  var res = await db.collection(conn).where(data).count()
  var j = res.total / skip
  console.log(Math.floor(j))

  for (let i = 0; i < j; i++) {
    var obj = await db.collection(conn).where(data)
      .skip(i * skip).limit(limit).get()
    newList.push(...obj.data)
  }
  // console.log(newList)
  return newList
  // console.log("总个数：", ct)
  // try {
  //     return db.collection(conn).where(data).get()
  // } catch (e) {}
}