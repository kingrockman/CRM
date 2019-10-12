const name = 'dbtools'
const conn = 'customers'

function message(title) {
    wx.showToast({
        title: title,
        mask: true
    })
}

function query() {

    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name,
            data: {
                type: "query",
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

function create(data) {
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

export { query, create, message }