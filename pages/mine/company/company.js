Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: '1',
    imgUrl: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 切换table
   */
  changTab(e) {
    let index = e.currentTarget.dataset.active
    this.setData({
      active: index
    })
  },
  chooseImg() {
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        console.log(res)
        that.setData({
          imgUrl: res.tempFilePaths
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})