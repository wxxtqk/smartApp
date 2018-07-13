//logs.js
const util = require('../../utils/util.js');
const plan_study_list = require('../../config/planConfig.js').plan_study_list;
const SUCCESS_OK = "200";

Page({
  data: {
    planStudyList: []
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
      // 成功
      success:function(res) {
        console.log(res);
        res = res.data;
        if (res.state === SUCCESS_OK ) {
          this.planStudyList = res.data.list;
          console.log(this.planStudyList)
        }
      },
      // 失败
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
