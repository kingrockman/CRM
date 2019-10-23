function message(title) {
    wx.showToast({
        title: title,
        mask: true
    })
}

function modal(content) {
    return new Promise((resolve, reject) => {
        wx.showModal({
            content,
            success: res => {
                if (res.confirm) {
                    resolve(true)
                } else if (res.cancel) {
                    resolve(false)
                }
            }
        });
    })
}

function setData(key, data) {
    wx.setStorageSync(key, data)
}

function getData(key) {
    return wx.getStorageSync(key)
}

function login(conn, data) {
    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'login',
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

function del(conn, data) {

    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'del',
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
export {
    login,
    create,
    read,
    update,
    del,
    message,
    modal,
    setData,
    getData
}