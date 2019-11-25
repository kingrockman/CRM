function findData(a, b) {
    // console.log(a, b)

    for (let i = 0; i < a.length; i++) {
        if (a[i]._id == b) {
            return a[i].name
        }
    }
}

function formatDate(time) {
    // var time = new Date()
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var day = time.getDate()
        // console.log(time);
    return year + "年" + month + "月" + day + "日"
        // console.log(year + "年" + month + "月" + day + "日");

    // if (typeof time == "number") {
    //     console.log("number");

    // } else {
    //     time = time.getTime(time)
    //     console.log(time);

    // }
}

function message(title) {
    wx.showToast({
        title,
        mask: true
    })
}

function show() {
    // console.log('utils/show')
    // wx.showLoading({
    //     title: "玩命加载中..."
    // });
    wx.showNavigationBarLoading()
}

function hide() {
    // console.log('utils/hide')
    // wx.hideLoading()
    wx.hideNavigationBarLoading()
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

function myCloud(name, conn, obj, key) {
    // var name
    switch (name) {
        case 1:
            name = "create"
            break;
        case 2:
            name = "read"

            break;
        case 3:
            name = "update"

            break;
        case 4:
            name = "del"

            break;

        default:
            return
    }
    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name,
            data: {
                conn,
                obj,
                key,
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

// function create(conn, data) {
//     return new Promise((resolve, reject) => {
//         wx.cloud.callFunction({
//             name: 'create',
//             data: {
//                 conn,
//                 data
//             },
//             success: (res) => {
//                 resolve(res.result)
//             },
//             fail: (err) => {
//                 reject(err)
//             }
//         })
//     })
// }

// function read(conn, key) {

//     return new Promise((resolve, reject) => {
//         wx.cloud.callFunction({
//             name: 'read',
//             data: {
//                 conn,
//                 key,
//             },
//             success: (res) => {
//                 resolve(res.result)
//             },
//             fail: (err) => {
//                 reject(err)
//             }
//         });
//     })
// }

function update(conn, data, key) {

    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'update',
            data: {
                conn,
                data,
                key
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

function del(conn, key) {

    return new Promise((resolve, reject) => {
        wx.cloud.callFunction({
            name: 'del',
            data: {
                conn,
                key
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
    findData,
    login,
    create,
    read,
    update,
    del,
    myCloud,
    message,
    show,
    hide,
    modal,
    setData,
    getData,
    formatDate
}