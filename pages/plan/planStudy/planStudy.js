// const plan_study_details = require('../../../config/planConfig.js').plan_study_details;
import { planDetailsList } from '../../../config/planConfig.js'
const SUCCESS_OK = "200";
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    studyList: {},
    detailsList: [], // 课程详情列表
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
  // 获取课程详情列表
  _gitDetailsList: function () {
    console.log(this.data.studyList.planId)
    planDetailsList(this.data.studyList.planId).then(res => {
      res = res.data
      console.log(res)
      if ( res.state === SUCCESS_OK ) {
        this.setData({
          detailsList: res.data.detailsList
        })
        console.info(this.data.detailsList)
      }
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
    // console.log(JSON.parse(options.details))
    this.studyDetailsTitle()
    this._gitDetailsList()
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