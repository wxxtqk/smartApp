import { fetchClass } from '../../../api/mine.js'
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
    fetchClass().then(res => {
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
  // 进入详情
  toDetail(e) {
    let isBuy = e.currentTarget.dataset.details.isBuy
    let state =e.currentTarget.dataset.details.state
    let id = e.currentTarget.dataset.details.id
    if(isBuy === '0') {
      wx.navigateTo({
        url: `../../../pages/plan/purchase/purchase?id=${id}` 
      })
    } else {
      if (state === '0') {
        wx.navigateTo({
          url: `../../../pages/plan/article/article?id=${id}`
        })
      } else {
        wx.navigateTo({
          url: `../../../pages/plan/articleVoice/voice?id=${id}`
        })
      }
    }
  }
})