//logs.js
const util = require('../../utils/util.js');
const plan_study_list = require('../../config/planConfig.js').plan_study_list;

Page({
  data: {

  },
  // 事件处理
  goStudy: function(e){
    console.log(e)
  },
  // 请求学习课程列表的接口
  gitPlanStudy: function() {
    var that = this;
    console.log(plan_study_list)
    wx.request({
      url: plan_study_list, //小程序目前发起request请求，必须是https协议
      success:function(res) {
        console.log(res);
      },
      fail:function(res) {
        console.log(res)
      }
    })
  },
  onLoad: function() {
    var that = this;
    that.gitPlanStudy();
  }
})
