
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // articleList: [],
    // articleTitle: '',
    // array: [
    //   { id: 11, name: "zz" },
    //   { id: 22, name: "xx" },
    //   { id: 33, name: "cc" },
    //   { id: 44, name: "vv" },
    //   { id: 55, name: "bb" },
    //   { id: 66, name: "nn" }
    // ],

    // authorSrc: '../../../imgs/author.png',
    // lickSrc: '../../../imgs/like.png',
    // likebg: '../../../imgs/likebg.png',
  },

  // 事件处理

  // 修改微信标题
  // articleListTitle: function () {
  //   var that = this;
  //   // console.log(that.data.studyList)
  //   wx.setNavigationBarTitle({
  //     title: that.data.articleList.subjectTitle
  //   })
  // },

  // 文章内容标题
  // articleTitleNmae: function () {
  //   let that = this
  //   that.setData({
  //     articleTitle: that.data.articleList.subjectTitle
  //   })
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   articleList: JSON.parse(options.articleList),
    //   // articleTitle: this.data.articleList.articleTitle
    // })
    // console.log(this.data.articleList)
    // this.articleListTitle()
    // this.articleTitleNmae()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // this.curriculum = this.selectComponent('.curriculum')
    // console.log(this.selectComponent('#curriculum'))
    // console.log(this.selectComponent())
    // this.draw = this.selectComponent("#draw");
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