//app.js
import {$HTTP} from './api/config'
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
                  // 登录
                  wx.login({
                    success: res => {
                      console.log(res)
                      let code = res.code
                      let that = this
                      let {nickName} = that.globalData.userInfo
                      // 发送 res.code 到后台换取 openId, sessionKey, unionId
                      wx.request({
                        url: `${$HTTP}/jeesite/a/wechat/user/logina?code=${code}`,
                        // url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wxa7e430f8985ea255&secret=944dce150e7f0ee447a7b0df26ac892f&js_code=' + code + '&grant_type=authorization_code',
                        data: {
                          nickName
                        },
                        header: {
                          'content-type': 'application/json'
                        },
                        success: function (res) {
                          // openid = res.data.openid //返回openid
                          that.globalData.userOpen = res.data
                        }
                      })
                    }
                  })
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userOpen: null
  },
  uploadimg: function (data, cb) {
    var that = this,
      i = data.i ? data.i : 0, //当前上传的哪张图片
      success = data.success ? data.success : 0, //上传成功的个数
      fail = data.fail ? data.fail : 0, //上传失败的个数
      Imgs = data.Imgs ? data.Imgs: []; // 保存上传后返回的文件路径
    wx.uploadFile({
      url: data.url,
      filePath: data.path[i],
      name: 'file', //这里根据自己的实际情况改
      formData: null, //这里是上传图片时一起上传的数据
      success: (resp) => {
        success++; //图片上传成功，图片上传成功的变量+1
        resp = JSON.parse(resp.data)
        if (resp.state === '200') {
          Imgs.push(resp.data[0].url)
        }
        // Imgs = Imgs.push(resp)
        // console.log(i);
        //这里可能有BUG，失败也会执行这里,所以这里应该是后台返回过来的状态码为成功时，这里的success才+1
      },
      fail: (res) => {
        fail++; //图片上传失败，图片上传失败的变量+1
        // console.log('fail:' + i + "fail:" + fail);
      },
      complete: () => {
        // console.log(i);
        i++; //这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) { //当图片传完时，停止调用          
          // console.log('执行完毕');
          // console.log('成功：' + success + " 失败：" + fail);
          cb(Imgs)
          // console.log(Imgs)
        } else { //若图片还没有传完，则继续调用函数
          // console.log(i);
          data.i = i;
          data.success = success;
          data.fail = fail;
          data.Imgs = Imgs
          // console.log(Imgs)
          that.uploadimg(data, cb);
        }
      }
    })
  }
})