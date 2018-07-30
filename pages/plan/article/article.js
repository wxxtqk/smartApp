
import { curriculumList, Collection } from '../../../api/planConfig.js'
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
    curriculum: {}, // 文章内容
    proposal: [], //推荐课程
    collectionType: false, // 待收藏文章
    courseType: 0, // 图文类型

    authorSrc: '../../../imgs/author.png',
    lickSrc: '../../../imgs/like.png',
    lickActiveSrc: '../../../imgs/like_active.png',
    likebg: '../../../imgs/likebg.png',
  },

  // 事件处理

  // 修改微信标题
  articleListTitle: function () {
    var that = this;
    console.log(that.data)
    console.log(that.data.curriculum)
    console.log(that.data.curriculum.proposalTitle)
    wx.setNavigationBarTitle({
      title: that.data.curriculum.proposalTitle
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
  _curriculumList: function (id) {
    // let id = this.data.articleList.subjectId
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    curriculumList(id, this.data.courseType).then(res => {
      wx.hideLoading()
      res = res.data
      console.log(res)
      if (res.state === SUCCESS_OK) {
        this.setData({
          curriculum: res.data.curriculumList,
          proposal: res.data.proposal,
          collectionType: res.data.collectionType
        })
        // wxparse.wxParse('coursesContent', 'html', this.data.curriculum.curriculumContent, this, 24); // 解析html标签
        wxparse.wxParse('coursesContent', 'html', res.data.curriculumList.curriculumContent, this, 24); // 解析html标签
        this.articleListTitle()
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
  // // 推荐课程点击事件
  // itemclick(event){
  //   // templates.onclick(evevt)
  //   console.log(event)
  // },
  // // onclick: function (event) {
  // //   console.log("点击了" + event.currentTarget.dataset.item)
  // // },
  // 推荐课程点击事件 跳转到其他页面
  itemclicktopage(event) {
    console.log(event)
    let urlone = event.currentTarget.dataset.pageone
    let urlzero = event.currentTarget.dataset.pagezero
    let studyDetails = event.currentTarget.dataset.details
    let priceType = studyDetails.priceType // 付费类型 1付费 0免费
    // 传值id
    let courseId = {
      courseId: studyDetails.proposalId
    }
    // 页面跳转传值
    if (priceType === 1) {
      wx.navigateTo({
        // url: urlone + '?details=' + JSON.stringify(studyDetails)
        url: urlone + '?details=' + JSON.stringify(courseId)
      })
    } else if (priceType === 0) {
      wx.navigateTo({
        url: urlzero + '?details=' + JSON.stringify(studyDetails)
      })

    }
  },


  // 收藏按钮
  collectionclick: function(event) {
    console.log(event)
      console.log(!this.data.collectionType)
    console.log(this.data.curriculum.courseId)
      
    Collection(this.data.curriculum.courseId).then(res => {
      res = res.data
      if(res.state === SUCCESS_OK){
        this.setData({
          collectionType: !this.data.collectionType
        })
        if (res.data.state === '0'){
          wx.showToast({
            title: '取消收藏',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        } else {
          wx.showToast({
            title: '已收藏',
            icon: 'succes',
            duration: 1000,
            mask: true
          })
        }
      } else {
        wx.showToast({
          title: '操作失败',
          icon: 'loading',
          duration: 1000,
          mask: true
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ({id}) {
    // this.setData({
    //   articleList: JSON.parse(options.articleList),
    //   // articleTitle: this.data.articleList.articleTitle
    // })
    // console.log(this.data.articleList)
    // this.articleTitleNmae()
    this._curriculumList(id)

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