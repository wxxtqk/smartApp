
import { curriculumList } from '../../../config/planConfig.js'
const SUCCESS_OK = "200";
let wxparse = require("../../../wxParse/wxParse.js");
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    articleList: [],
    articleTitle: '',
    array: [
      { id: 11, name: "zz" },
      { id: 22, name: "xx" },
      { id: 33, name: "cc" },
      { id: 44, name: "vv" },
      { id: 55, name: "bb" },
      { id: 66, name: "nn" }
    ],
    curriculum: {}, // 文章内容
    proposal: [], //推荐课程

    authorSrc: '../../../imgs/author.png',
    lickSrc: '../../../imgs/like.png',
    likebg: '../../../imgs/likebg.png',
  },

  // 事件处理

  // 修改微信标题
  articleListTitle: function () {
    var that = this;
    // console.log(that.data.studyList)
    wx.setNavigationBarTitle({
      title: that.data.articleList.subjectTitle
    })
  },

  // 文章内容标题
  articleTitleNmae: function(){
    let that = this
    that.setData({
      articleTitle: that.data.articleList.subjectTitle
    })
  },

  // 文章内容获取
  _curriculumList: function () {
    let id = this.data.articleList.subjectId
    curriculumList(id).then(res => {
      res = res.data
      console.log(res)
      if (res.state === SUCCESS_OK) {
        this.setData({
          curriculum: res.data.curriculumList,
          proposal: res.data.proposal
        })
      }
      wxparse.wxParse('curriculumContent', 'html', this.data.curriculum.curriculumContent, this, 24); // 解析html标签
    })
  },
  // 推荐课程点击事件
  itemclick(event){
    // templates.onclick(evevt)
    console.log(event)
  },
  // onclick: function (event) {
  //   console.log("点击了" + event.currentTarget.dataset.item)
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      articleList: JSON.parse(options.articleList),
      // articleTitle: this.data.articleList.articleTitle
    })
    console.log(this.data.articleList)
    this.articleListTitle()
    this.articleTitleNmae()
    this._curriculumList()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.curriculum = this.selectComponent('.curriculum')
    // console.log(this.selectComponent('#curriculum'))
    // console.log(this.selectComponent())
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