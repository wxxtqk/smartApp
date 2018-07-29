import { fetchPayLog } from '../../../api/mine.js'
const OK_CODE = '200'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    fetchPayLog().then(res => {
      wx.hideLoading()
      res = res.data
      if (res.state === OK_CODE) {
        this.setData({
          lists: res.data
        })
      }
    }).catch(() => {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '链接数据库失败'
      })
    }) 
  },

})