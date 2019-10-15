// const name = 'dbtools'
// const conn = 'customers'

function message(title) {
    wx.showToast({
        title: title,
        mask: true
    })
}

function setData(key, data) {
    wx.setStorageSync(key, data)
}

function getData(key) {
    return wx.getStorageSync(key)
}

function create(conn, data) {
    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'create',
            data: {
                conn,
                data
            },
            success: (res) => {
                resolve(res.result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

function read(conn) {

    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'read',
            data: {
                conn
            },
            success: (res) => {
                resolve(res.result)
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}

function update(conn, data) {

    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'update',
            data: {
                conn,
                data
            },
            success: (res) => {
                resolve(res.result)
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}

function del(conn) {

    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'read',
            data: {
                conn
            },
            success: (res) => {
                resolve(res.result)
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}
export {
    create,
    read,
    update,
    del,
    message,
    setData,
    getData
}