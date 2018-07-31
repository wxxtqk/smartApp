// 购买课程页

import { purchaseList } from '../../../api/planConfig.js'
const app = getApp()
const SUCCESS_OK = "200";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // introductionList: [],
    inheritCourseId: '',
    purchaseTitle: '',
    purchaseCoverimage: '',
    Referee: '',
    discount: '0',
    positivePrice: '0',
    courseIntroduction: '',

    // authorSrc: '../../../imgs/author.png',
    // lickSrc: '../../../imgs/voice_like.png',  //收藏
    // lickActiveSrc: '../../../imgs/voice_like_active.png',  //已收藏
    // // likebg: '../../../imgs/likebg.png',
    // audioplayImgUrl: '../../../imgs/play.png',
    // audiostopImgUrl: '../../../imgs/paused.png',
    // audioPrevUrl: '../../../imgs/prev.png',
    // audioNextUrl: '../../../imgs/next.png',
  },

  // 事件处理

  // 修改微信标题
  // changeWxTitle: function () {
  //   var that = this;
  //   // console.log(that.data.studyList)
  //   wx.setNavigationBarTitle({
  //     title: that.data.introductionList.proposalTitle
  //   })
  // },

  // 购买课程展示列表
  _purchaseList: function (id) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    console.info(id)
    purchaseList(id).then(res => {
      res = res.data
      console.log(res)
      if (res.state === SUCCESS_OK) {
        wx.hideLoading()
        let data = res.data
        this.setData({
          purchaseTitle: data.purchaseTitle,
          purchaseCoverimage: data.purchaseCoverimage,
          Referee: data.Referee,
          discount: data.discount,
          positivePrice: data.positivePrice,
          courseIntroduction: data.courseIntroduction,
        })
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

  // 立即咨询按钮
  modalcnt: function () {
    wx.showModal({
      title: '提示',
      content: '请拨打电话联系客服 130-xxxx-xxxx',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({id}) {
    // let optionsdetails = JSON.parse(options.details)
    // this.setData({
    //   inheritCourseId: optionsdetails.courseId, //获取本课程简介内容
    // })
    // this.changeWxTitle()
    this._purchaseList(id)
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
    // backgroundAudioManager.pause();
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