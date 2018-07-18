import { fetchHome } from '../../api/home'
const OK_CODE = '200'
Page({
  data: {
    imgUrls: [],
    hot: [],
    free: [],
    recommend: [],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this._fetchHome()
  },
  // 获取首页全部数据
  _fetchHome() {
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    fetchHome().then(res => {
      wx.hideLoading()
      res = res.data
      if (res.state === OK_CODE) {
        that.setData({
          imgUrls: res.data.imgUrls,
          hot: res.data.hot,
          free: res.data.free,
          recommend: res.data.recommend
        })
        console.log(res.data)
      } else {
        wx.showModal({
          title: '提示',
          content: res.message
        })
      }
    }).catch((e) => {
      console.log(e)
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '连接数据库失败'
      })
    })
  }
})