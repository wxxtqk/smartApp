import { fetchFavorite } from '../../../api/mine.js'
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
    fetchFavorite().then(res => {
      res = res.data
      if (res.state === OK_CODE) {
        this.setData({
          lists: res.data
        })
        wx.hideLoading()
      }
    }).catch(() => {
      wx.showModal({
        title: '提示',
        content: '链接数据库失败'
      })
    }) 
  },

})