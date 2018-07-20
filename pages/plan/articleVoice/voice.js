import { formatTimeNew } from '../../../utils/formatDate.js'
// const myaudio = wx.createInnerAudioContext();
// var myintervi1;
const app = getApp()
let backgroundAudioManager = wx.getBackgroundAudioManager();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    articleList: [],
    // articleTitle: '',
    // array: [
    //   { id: 11, name: "zz" },
    //   { id: 22, name: "xx" },
    //   { id: 33, name: "cc" },
    //   { id: 44, name: "vv" },
    //   { id: 55, name: "bb" },
    //   { id: 66, name: "nn" }
    // ],
    // src: '',
    // currentProcessNum: 0,//赋值
    // totalProcess: '--:--',
    // totalProcessNum: 1,
    // seek: -1,
    // audioImgUrl: '../../../imgs/play.png',
    questionObj:{
      id: 0,
    },
    audioListObj: [
      {
        audioImgUrl: '../../../imgs/play.png',
        currentProcessNum: 0, // 进度条改变值
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        songLength: 401.475918, // 音频总时长
        canSlider: false,   //是否可以滑动，防止加载音乐时 用户滑动进度条
        currentProcess: '00:00',//显示 将currentProcessNum处理成时间形式展示
        totalProcess: '00:00',
        totalProcessNum: 100,
        seek: -1,
      }
    ],
    isMovingSlider: false,
  
    authorSrc: '../../../imgs/author.png',
    lickSrc: '../../../imgs/voice_like.png',
    // likebg: '../../../imgs/likebg.png',
    audioplayImgUrl: '../../../imgs/play.png',
    audiostopImgUrl: '../../../imgs/paused.png',
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
  // articleTitleNmae: function () {
  //   let that = this
  //   that.setData({
  //     articleTitle: that.data.articleList.subjectTitle
  //   })
  // },
  // 音频播放
  // audioPlay: function () {
  //   this.audioCtx.play()
  // },
  // audioPause: function () {
  //   this.audioCtx.pause()
  // },
  // audio14: function () {
  //   this.audioCtx.seek(14)
  // },
  // audioStart: function () {
  //   this.audioCtx.seek(0)
  // },


  // 点击播放按钮触发事件 
  clickPlayAudio: function(event) {
    console.log(event)
    const _this = this;
    const _data = _this.data;
    //防止用户点击播放按钮太快
    if (_data.clickPlayAudioFunctionIsRuning) {
      return;
    }
    _this.setData({
      clickPlayAudioFunctionIsRuning: true
    })
    var _obj = _this.data.audioListObj;
    const audioId = event.currentTarget.dataset.audioid;
    var backgroundAudioManager = wx.getBackgroundAudioManager();
    console.log(_this.data)
    if (_this.data.audioListObj[audioId].audioImgUrl == _this.data.audioplayImgUrl) {
      console.log('转换至播放状态')
      //切换所有播放按钮为暂停状态
      for (var j in _this.data.audioListObj) {
        if (j && _this.data.audioListObj[j]) {
          _this.data.audioListObj[j].audioImgUrl = _this.data.audioplayImgUrl;
        }
      }
      _this.setData({
        audioListObj: _this.data.audioListObj,
      })
      //暂停正在播放音乐
      wx.stopBackgroundAudio();
      _obj[audioId].audioImgUrl = _this.data.audiostopImgUrl;
      // backgroundAudioManager.title = '测试';
      // //设置音乐开始时间
       if (_this.data.audioListObj[audioId].currentProcessNum != 0) {
        //  console.log(_this.data.audioListObj[audioId].currentProcess)
        //  console.log(_this.data.audioListObj[audioId].currentProcessNum)
         backgroundAudioManager.startTime = (_this.data.audioListObj[audioId].currentProcessNum / 100) * _this.data.audioListObj[audioId].songLength;
       }
       backgroundAudioManager.src = _this.data.audioListObj[audioId].src;

       console.log('歌曲长度', backgroundAudioManager.duration)
      //  _obj[audioId].canSlider = true;
       backgroundAudioManager.play();
       //    背景音频自然播放结束事件
       backgroundAudioManager.onEnded(function () {
         var _obj = _this.data.audioListObj;
         _obj[audioId].audioImgUrl = _this.data.audioplayImgUrl;
         _obj[audioId].currentProcess = '00:00';
         _obj[audioId].currentProcessNum = 0;
         _this.setData({
           audioListObj: _obj
         })
       })

      //背景音频播放进度更新事件
      backgroundAudioManager.onTimeUpdate(function (callback) {
        _obj = _this.data.audioListObj;
        //设置总时长
        if (_obj[audioId] && _obj[audioId].totalProcess && (_obj[audioId].totalProcess == '--:--' || _obj[audioId].totalProcess == '00:00')) {
          console.log(_this)
          console.log(backgroundAudioManager.currentTime)
          console.log(backgroundAudioManager.duration)
          console.log(parseInt((backgroundAudioManager.currentTime / backgroundAudioManager.duration) * 100))
          console.log(formatTimeNew(1401.475918))
          _obj[audioId].totalProcess = formatTimeNew(backgroundAudioManager.duration);
          // _obj[audioId].totalProcessNum = parseInt((backgroundAudioManager.currentTime / backgroundAudioManager.duration)*100);
          // _obj[audioId].totalProcessNum = backgroundAu/dioManager.duration;
          _this.setData({
            audioListObj: _obj
          })
        }
        if (!_this.data.isMovingSlider) {
          //更新进度
          _obj[audioId].currentProcess = formatTimeNew(backgroundAudioManager.currentTime);
          _obj[audioId].currentProcessNum = parseInt((backgroundAudioManager.currentTime / backgroundAudioManager.duration) * 100);
          _this.setData({
            audioListObj: _obj
          })
        }
      })
    } else if (_this.data.audioListObj[audioId].audioImgUrl == _this.data.audiostopImgUrl) {
      console.log('转换至暂停状态')
      _obj[audioId].audioImgUrl = _this.data.audioplayImgUrl
      wx.pauseBackgroundAudio();
      backgroundAudioManager.pause();
    }

    _this.setData({
      audioListObj: _obj,
      clickPlayAudioFunctionIsRuning: false
    })
  },

  // 滑动进度条触发事件
  changeProgress: function(event) {
    const _this = this;
    const _data = _this.data;
    const _obj = _this.data.audioListObj;
    const position = event.detail.value;
    const audioId = event.currentTarget.dataset.audioid;
    // _obj[audioId].canSlider = false;
    _obj[audioId].currentProcess = formatTimeNew((position / 100) * _this.data.audioListObj[audioId].songLength);
    _obj[audioId].currentProcessNum = position;

    //如果正在播放
    if (_obj[audioId].audioImgUrl == _this.data.audiostopImgUrl) {
      _obj[audioId].seek = position;
      // console.log(_obj[audioId].seek)
      if (_obj[audioId].seek != -1) {
        // wx.seekBackgroundAudio({
        //   position: Math.floor(position),
        // })
        backgroundAudioManager.seek((position / 100) * _this.data.audioListObj[audioId].songLength)
        _obj[audioId].seek = -1;
      }
    }
    _this.setData({
      audioListObj: _obj
    })
  },
  // 开始滑动触发事件
  touchstart: function() {
    this.setData({
      isMovingSlider: true
    });
  },
  // 结束滑动触发事件 
  touchend: function() {
    this.setData({
      isMovingSlider: false
    });
  },





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
    // this.articleTitleNmae()
    // let backgroundAudioManager = wx.getBackgroundAudioManager();
    // backgroundAudioManager.src = this.data.audioListObj[0].src;
    // wx.stopBackgroundAudio();
    // backgroundAudioManager.pause()

    // console.log(backgroundAudioManager)
    // setTimeout(() => {
    //   backgroundAudioManager.seek(60)
    // }, 1000)
    // console.log(this.data.audioListObj[0].src)
    // this.setDate({
    //   audioImgUrl: this.data.audioplayImgUrl
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    // this.audioCtx = wx.createAudioContext('myAudio')
    // this.audioCtx.setSrc('http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46')
    // this.audioCtx.play()
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
    backgroundAudioManager.pause();
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