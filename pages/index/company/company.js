import { fectDemon } from '../../../api/home'
const OK_CODE = '200'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '1',
    header: {},
    demon: [],
    lianx: {},
    more: false,
    btnText: '展开',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._fectDemon()
  },
  change(e) {
    let index = e.currentTarget.dataset.index
    this.setData({
      current: index
    })
  },
  // 获取跟多数据
  _fectDemon() {
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    fectDemon().then(res => {
      wx.hideLoading()
      res = res.data
      if (res.state === OK_CODE) {
        that.setData({
          header: res.data.header,
          lianx: res.data.lianx,
          demon: res.data.demon
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
  showmore() {
    this.setData({
      more: !this.data.more,
      btnText: this.data.more?'展开':'收起'
    })
  }
})