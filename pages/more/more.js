import { fetchMore, fetchMoreCompany } from '../../api/home'
const OK_CODE = '200'
Page({
  data: {
    lists: [],
    companys: []
  },
  onLoad: function (options) {
    console.log(options)
    if (options.more) {
      this._fetchMore(options.more)
    } else {
      this._fetchMoreCompany()
    }
  },
  // 获取跟多除开企业以为的
  _fetchMore(id) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    fetchMore(id).then(res => {
      wx.hideLoading()
      res = res.data
      if (res.state === OK_CODE) {
        that.setData({
          lists: res.data,
          companys: []
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.message
        })
      }
    }).catch(() => {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '连接数据库失败'
      })
    })
  },
  // 获取更多企业
  _fetchMoreCompany() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    fetchMoreCompany().then(res => {
      wx.hideLoading()
      res = res.data
      if (res.state === OK_CODE) {
        that.setData({
          companys: res.data,
          lists: []
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.message
        })
      }
    }).catch(() => {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '连接数据库失败'
      })
    })
  }
})