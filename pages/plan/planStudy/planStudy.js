// const plan_study_details = require('../../../config/planConfig.js').plan_study_details;
import { planDetailsList } from '../../../api/planConfig.js'
const SUCCESS_OK = "200";
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detailsList: [], // 课程详情列表
    courseIds: '', // 上一页传过来得课程id
    unreadSrc: '../../../imgs/studystate.png',
    readSrc: '../../../imgs/studystate_active.png',
    planid: ''
  },
  // 事件处理

  // 跳转到其他页面
  topage: function(event) {
    console.info(event)
    let articleurl = event.currentTarget.dataset.pageone
    let voiceurl = event.currentTarget.dataset.pagetwo
    let articleList = event.currentTarget.dataset.article
    let topageType = event.currentTarget.dataset.article.type
    let id = event.currentTarget.dataset.article.subjectId
    // // // 跳转页面传值 0==文章，1==音频
    if (topageType === '0') {
      wx.navigateTo({
        url: `${articleurl}?id=${id}&planid=${this.data.planid}`
      })
    } else if (topageType === '1') {
      wx.navigateTo({
        url: `${voiceurl}?id=${id}&planid=${this.data.planid}`
      })
    }
  },
  // 获取课程详情列表
  _gitDetailsList: function () {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    planDetailsList(this.data.courseIds, this.data.planid).then(res => {
      wx.hideLoading()
      res = res.data
      console.log(res)
      if ( res.state === SUCCESS_OK ) {
        this.setData({
          detailsList: res.data.list
        })
        console.info(this.data.detailsList)
      }
    })
    .catch(() => {
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
  onLoad: function ({id, planid}) {
    this.setData({
      courseIds: id,
      planid
    })
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