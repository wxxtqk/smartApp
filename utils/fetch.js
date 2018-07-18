const app = getApp()
function fetch({url, data = {}, method = 'POST'}) {
  console.log(app)
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      header: {
        openid: app.globalData.userOpen.openid ? app.globalData.userOpen.openid : '',
        sessionkey: app.globalData.userOpen['session_key'] ? app.globalData.userOpen['session_key'] : ''
      }, // 设置请求的 header
      success: function (res) {
        // success
        resolve(res)
      },
      fail: function (e) {
        reject(e)
      },
      complete: function (e) {
        reject(e)
      }
    })
  })
}
export default fetch