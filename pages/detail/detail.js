import {fecthMinClass} from '../../api/home.js'
const OK_CODE = '200'
Page({
  data: {
    c_index: 0,//当前
    s3_width: 0,
    t_width: 250,//上方每个tab的大小
    scroll_left: 0,//上方滚动的位置
    t_margin_left: 0,//上方的margin-left
    tabLists: [],
    tab_tite_data: [
      { "name": "1", "color": "orange", }
      , { "name": "2", "color": "blue", }
      // , { "name": "3", "color": "green", }
      // , { "name": "4", "color": "yellow", }
      // , { "name": "5", "color": "black", }
      // , { "name": "6", "color": "pink", }
    ],
  },
  onShow: function () {
    this.getwidth();
  },
  //滑
  get_index: function (e) {
    var crash_current = e.detail.current;
    var s = 0;
    if (crash_current != 0 && crash_current != 1) {
      s = parseInt(crash_current - 1) * this.data.s3_width;
    }
    this.setData({
      c_index: e.detail.current,
      scroll_left: s
    });
  },
  //点
  changeview: function (e) {
    var crash_current = e.currentTarget.dataset.current;
    var s = 0;
    if (crash_current != 0 && crash_current != 1) {
      s = parseInt(crash_current - 1) * this.data.s3_width;
    }
    this.setData({
      c_index: e.currentTarget.dataset.current,
      scroll_left: s
    });
  },
  getwidth: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        // that.setData(that.data.s3_width = res.windowWidth / 3);
        that.setData({s3_width: res.windowWidth / 3});
      },
    })
  },
  // 获取数据
  _fecthMinClass() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    fecthMinClass().then(res => {
      wx.hideLoading()
      res = res.data
      if (res.state === OK_CODE) {
        that.setData({
          tabLists: res.data
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
  onLoad() {
    this._fecthMinClass()
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
  }
})
