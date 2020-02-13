// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
// 云函数入口函数
exports.main = async (event, context, a) => {
  // console.log(event, context);

  const db = cloud.database()

  const {
    data: lv1
  } = await db.collection('ptTypes').where({
    level: 1
  }).orderBy('parent', "asc").get()
  const {
    data: lv2
  } = await db.collection('ptTypes').where({
    level: 2
  }).orderBy('parent', "asc").get()
  const {
    data: lv3
  } = await db.collection('ptTypes').where({
    level: 3
  }).orderBy('parent', "asc").get()
  for (let i = 0; i < lv1.length; i++) {
    lv1[i].children = []
  }
  for (let i = 0; i < lv2.length; i++) {
    lv2[i].children = []
  }
  for (let i = 0; i < lv3.length; i++) {
    lv3[i].children = []
  }

  lv3.forEach(v => {
    var index = lv2.findIndex(i => {
      return i._id == v.parent
    })
    lv2[index].children.push(v)
  })
  lv2.forEach(v => {
    var index = lv1.findIndex(i => {
      return i._id == v.parent
    })
    lv1[index].children.push(v)
  })

  return lv1

}
