import { fetchMore, fetchMoreCompany } from '../../api/home'
const OK_CODE = '200'
Page({
  data: {
    lists: [],
    companys: []
  },
  onLoad: function (options) {
    if (options.more) {
      let type = options.more
      let req = {}
      if (type === '3') {
        req.isHot = '1'
      } else if (type === '2') {
        req.isRecom = '1'
      } else if (type === '1') {
        req.isFree = '0'
      }
      this._fetchMore(req)
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
  },
  // 进入详情
  toDetail(e) {
    let isBuy = e.currentTarget.dataset.details.isBuy
    let state =e.currentTarget.dataset.details.state
    let id = e.currentTarget.dataset.details.id
    if(isBuy === '0') {
      wx.navigateTo({
        url: `../../pages/plan/purchase/purchase?id=${id}`
      })
    } else {
      if (state === '0') {
        wx.navigateTo({
          url: `../../pages/plan/article/article?id=${id}`
        })
      } else {
        wx.navigateTo({
          url: `../../pages/plan/articleVoice/voice?id=${id}`
        })
      }
    }
  },
  // 显示公司页面
  showCompany(e) {
    let id = e.currentTarget.dataset.details.id
    wx.navigateTo({
      url: `../../pages/index/company/company?id=${id}`
    })
  }
})