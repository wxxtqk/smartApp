//plan.js
import {
  plan_study_list
} from '../../api/planConfig.js'
const SUCCESS_OK = "200";
const app = getApp()
Page({
  data: {
    planStudyList: []
  },
  // 事件处理
  goStudy: function (e) {
    console.log(e)
  },
  // 跳转到其他页面
  topage: function (event) {
    let url = event.currentTarget.dataset.page
    let studyDetails = event.currentTarget.dataset.details
    let courseId = event.currentTarget.dataset.details.courseIds
    let planid = event.currentTarget.dataset.details.planId
    // 页面跳转传值
    wx.navigateTo({
      // url: url + '?details=' + JSON.stringify(studyDetails)
      url: `${url}?id=${courseId}&planid=${planid}`
    })
  },
  // 请求学习课程列表的接口
  gitPlanStudy: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    // const userid = 123456
    // plan_study_list().then(res => {
    plan_study_list().then(res => {
      wx.hideLoading()
      res = res.data
      console.info(res)
      if (res.state === SUCCESS_OK) {
        this.setData({
          planStudyList: res.data.list
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
        content: '链接数据库失败'
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    var that = this;
    // 用户登录后才可以跳转查看
    if (app.globalData.userInfo) {
      that.gitPlanStudy()
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录'
      })
    }
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
})