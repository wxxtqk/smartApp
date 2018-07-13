//logs.js
const util = require('../../utils/util.js');
const plan_study_list = require('../../config/planConfig.js').plan_study_list;
const SUCCESS_OK = "200";
const app = getApp()
Page({
  data: {
    planStudyList: []
  },
  // 事件处理
  goStudy: function(e){
    console.log(e)
  },
  // 跳转到其他页面
  topage: function (event) {
    console.log(event)
    let url = event.currentTarget.dataset.page
    let studyDetails = event.currentTarget.dataset.details
    // 页面跳转传值
    wx.navigateTo({
      url: url +'?details='+ JSON.stringify(studyDetails)
    })
  },
  // 请求学习课程列表的接口
  gitPlanStudy: function() {
    var that = this;
    wx.request({
      url: plan_study_list, //小程序目前发起request请求，必须是https协议
      // 成功
      success:function(res) {
        console.log(res);
        res = res.data;
        if (res.state === SUCCESS_OK ) {
          that.setData({
            planStudyList: res.data.list
          })
        }
      },
      // 失败
      fail:function(res) {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var that = this;
    that.gitPlanStudy();
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
