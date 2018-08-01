import { fetchHome } from '../../api/home'
const OK_CODE = '200'
Page({
  data: {
    imgUrls: [],
    hot: [],
    free: [],
    recommend: [],
    company: [],
    types: {},
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
          recommend: res.data.recommend,
          company: res.data.company,
          types: res.data.types
        })
        console.log(res.data)
      } else {
        wx.showModal({
          title: '提示',
          content: res.message
        })
      }
    }).catch((e) => {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '连接数据库失败'
      })
    })
  },
  // 进入详情页面
  detail(e) {
    let parentId=e.currentTarget.dataset.parentid
    wx.navigateTo({
      url: `../../pages/detail/detail?parentId=${parentId}`
    })
  },
  // 显示公司页面
  showCompany(e) {
    let id = e.currentTarget.dataset.details.id
    wx.navigateTo({
      url: `../../pages/index/company/company?id=${id}`
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
  // 点击查看更多
  showmore(e) {
    if (e.currentTarget.dataset.more) {
      wx.navigateTo({
        url: `../../pages/more/more?more=${e.currentTarget.dataset.more}`
      })
    }
    wx.navigateTo({
      url: `../../pages/more/more?company=1`
    })
  }
})