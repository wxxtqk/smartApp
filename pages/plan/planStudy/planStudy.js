const plan_study_details = require('../../../config/planConfig.js').plan_study_details;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    studyList: {},
    unreadSrc: '../../../imgs/studystate.png',
    readSrc: '../../../imgs/studystate_active.png'
  },
  // 事件处理
  studyDetailsTitle: function(){
    var that = this;
    // console.log(that.data.studyList)
    wx.setNavigationBarTitle({
      title: that.data.studyList.planTitle
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      studyList: JSON.parse(options.details)
    })
    // console.log(options)
    console.log(JSON.parse(options.details))
    // var that = this;
    // console.log(that.data.studyList)
    this.studyDetailsTitle()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})