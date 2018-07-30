import { voiceList, voiceCollection, curriculumList } from '../../../api/planConfig.js'
import { formatTimeNew } from '../../../utils/formatDate.js'
const app = getApp()
let backgroundAudioManager = wx.getBackgroundAudioManager();
const SUCCESS_OK = "200";
let wxparse = require("../../../wxParse/wxParse.js"); // html转换模板
Page({
  /**
   * 页面的初始数据
   */
  data: {
    articleList: [],
    // articleTitle: '',
    voiceTitle: '', // 标题
    voiceCoverimage: '', // 封面
    RefereePortrait: '', // 授课人头像
    Referee: '', // 授课人
    studyNumber: '', // 学习次数
    collectionType: '', // 收藏状态
    curriculum: {}, // 文章内容
    proposal: [], //推荐课程
    courseType: 1, // 图文类型

    questionObj:{
      id: 0,
    },
    audioListObj: [
      {
        audioImgUrl: '../../../imgs/play.png',
        currentProcessNum: 0, // 进度条改变值
        src: '',
        songLength: 0, // 音频总时长
        canSlider: false,   //是否可以滑动，防止加载音乐时 用户滑动进度条
        currentProcess: '00:00',//显示 将currentProcessNum处理成时间形式展示
        totalProcess: '00:00',  // 音频总时长
        totalProcessNum: 100,
        seek: -1,
      }
    ],
    isMovingSlider: false,
  
    authorSrc: '../../../imgs/author.png',
    lickSrc: '../../../imgs/voice_like.png',  //收藏
    lickActiveSrc: '../../../imgs/voice_like_active.png',  //已收藏
    // likebg: '../../../imgs/likebg.png',
    audioplayImgUrl: '../../../imgs/play.png',
    audiostopImgUrl: '../../../imgs/paused.png',
    audioPrevUrl: '../../../imgs/prev.png',
    audioNextUrl: '../../../imgs/next.png',
  },

  // 事件处理

  // 修改微信标题
  articleListTitle: function () {
    var that = this;
    // console.log(that.data.studyList)
    wx.setNavigationBarTitle({
      title: that.data.voiceTitle
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

  // 跳转到其他页面
  // topage: function (event) {
  //   console.log(event)
  //   let url = event.currentTarget.dataset.page
  //   let studyDetails = event.currentTarget.dataset.details
  //   // 页面跳转传值
  //   wx.navigateTo({
  //     url: url + '?details=' + JSON.stringify(studyDetails)
  //   })
  // },

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
    if (priceType === 1 ){
      wx.navigateTo({
        // url: urlone + '?details=' + JSON.stringify(studyDetails)
        url: urlone + '?details=' + JSON.stringify(courseId)
      })
    } else if(priceType === 0) {
      wx.navigateTo({
        url: urlzero + '?details=' + JSON.stringify(studyDetails)
      })

    }
  },


  // 接口获取音频课程展示列表
  _voiceList:function(id){
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    curriculumList(id, this.data.courseType).then(res => {
      res = res.data
      console.log(res)
      if(res.state === SUCCESS_OK){
        wx.hideLoading()
        let data = res.data
        const _data = this.data;
        const _obj = _data.audioListObj;
        _obj[0].totalProcess = formatTimeNew(data.songLength); // 音频时长
        _obj[0].src = data.audioSongSrc;  // 音频
        _obj[0].songLength = data.songLength; // 音频总时长 以秒为单位
        console.log(_obj[0].src)
        this.setData({
          voiceTitle: data.voiceTitle, // 标题
          voiceCoverimage: data.voiceCoverimage, // 封面
          RefereePortrait: data.RefereePortrait, // 授课人头像
          Referee: data.Referee, // 授课人
          studyNumber: data.studyNumber, // 学习次数
          collectionType: data.collectionType, // 收藏状态
          curriculum: data.curriculumContent,
          proposal: data.proposal,
          audioListObj: _obj
        })
        wxparse.wxParse('curriculumContent', 'html', this.data.curriculum, this, 24); // 解析html标签
        this.articleListTitle()
      } else {
        wx.hideLoading()
        wx.showModal({
          title: '提示',
          content: '链接数据库失败'
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

  // 收藏按钮
  collectionclick: function (event) {
    console.log(event)
    console.log(!this.data.collectionType)

    voiceCollection(!this.data.collectionType).then(res => {
      res = res.data
      if (res.state === SUCCESS_OK) {
        this.setData({
          collectionType: !this.data.collectionType
        })
        if (this.data.collectionType === false) {
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
    // this.articleListTitle()
    this._voiceList(id)

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