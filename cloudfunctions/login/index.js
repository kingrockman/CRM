// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')

// 初始化 cloud
cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = (event, context) => {

    const db = cloud.database();
    const conn = event.conn
    const wxContext = cloud.getWXContext()
    const openId = wxContext.OPENID
    return db.collection(conn).where({ openId }).get()

}