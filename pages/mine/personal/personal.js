const app = getApp()
import { personalInfo } from '../../../api/mine.js'
const OK_CODE = '200'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    date: '2017-08-06',
    edu: '',
    phone: '',
    company: '',
    email: '',
    address: '',
    userInfo: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      // 设置用户信息
      userInfo: app.globalData.userInfo
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  formSubmit: function(e) {
    let that = this
    let wran = ''
    let flag = true // 判断输入是否完整
    if (e.detail.value.name == '') {
      wran = '请输入名字'
    }else if(e.detail.value.edu == '') {
      wran = '请输入学历'
    } else if (e.detail.value.phone == ''){
      wran = '请输入电话号码'
    } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(e.detail.value.phone))) {
      wran = '手机号码格式不正确'
    } else if (e.detail.value.email == '') {
      wran = '请输入邮箱'
    } else if (!(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(e.detail.value.email))) {
      wran = '邮箱格式不正确'
    } else {
      flag = false
      personalInfo(e.detail.value, that.data.userInfo.nickName).then(res => {
        res = res.data
        if (res.state === OK_CODE) {
          // 提示
          wx.showToast({
            title: '添加成功',
            duration: 1000
          })
          // 返回到上一级
          setTimeout(() => {
            wx.navigateBack({
              delta: 1 // 回退前 delta(默认为1) 页面
            })
          }, 1500)
        }
      })
      .catch(_ => {
        console.log('连接数据库失败')
      })
    }
    if(flag) {
      wx.showModal({
        title: '提示',
        content: wran
      })
    }
  }
})