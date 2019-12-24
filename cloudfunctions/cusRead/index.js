// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  const conn = "customers"
  const pageSize = event.pageQuery.pageSize ? event.pageQuery.pageSize : 100
  const currentPage = event.pageQuery.currentPage ? event.pageQuery.currentPage : 1
  const where = {
    customer: new RegExp(event.key)
  }
  const {
    total: count
  } = await db.collection(conn).where(where).count()
  const totalPage = Math.ceil(count / pageSize)
  const {
    data: obj
  } = await db.collection(conn).where(where)
    .skip((currentPage - 1) * pageSize).limit(pageSize)
    .orderBy('ct_date', 'desc')
    .get()

  return {
    data: obj,
    totalPage,
    pageSize,
    currentPage
  }






}
