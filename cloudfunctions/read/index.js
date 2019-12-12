// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event) => {
  const db = cloud.database()
  const pageSize = event.pages.pageSize ? event.pages.pageSize : 100
  const currentPage = event.pages.currentPage ? event.pages.currentPage : 1
  const conn = event.conn
  var where = {}
  for (var i in event.where) {
    where[i] = new RegExp(event.where[i])
  }
  var {
    total: count
  } = await db.collection(conn).where(where).count()
  var totalPage = Math.ceil(count / pageSize)
  var {
    data: obj
  } = await db.collection(conn).where(where)
    .skip((currentPage - 1) * pageSize).limit(pageSize)
    .orderBy('ct_date', 'asc')
    .get()
  console.log({
    data: obj,
    totalPage,
    pageSize,
    currentPage
  });
  return {
    data: obj,
    totalPage,
    pageSize,
    currentPage
  }
}

function formatDate(time) {
  // var time = "2019年11月10日";
  time = time.replace("年", "-");
  time = time.replace("月", "-");
  time = time.replace("日", "");
  time = new Date(time)
  console.log(time);
  return time.getTime()
}
