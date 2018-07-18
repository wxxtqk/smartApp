import { fetchProd } from '../../../api/mine.js'
const OK_CODE = '200'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: '1',
    prods: [], // 企业产品列表
    imgUrl: [], // 企业图片
    name: '', // 企业的名称
    desc: '', // 企业简介
    coll: '', // 合作伙伴
    tel: '', // 联系电话
    email: '', // 邮箱
    address: '', // 地址
    prodShow: false, // 现在产品修改新增
    price: '',
    prodname: '',
    proddesc: '',
    prodImgs: [],
    prodtel: '',
    prodemail: '',
    prodaddress: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 切换table
   */
  changTab(e) {
    let index = e.currentTarget.dataset.active
    this.setData({
      active: index,
      prodShow: false
    })
    // 切换到企业产品
    if(index === '2') {
      this._fetchProd()
    }
  },
  _fetchProd() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    fetchProd().then(res => {
      res = res.data
      wx.hideLoading()
      if (res.state === OK_CODE) {
        that.setData({
          prods: res.data
        })
      }
    }).catch((e) => {
      console.log(e)
      wx.showModal({
        title: '提示',
        content: '链接数据库失败'
      })
    })
  },
  // 选择图片
  chooseImg(e) {
    let type = e.currentTarget.dataset.type
    let that = this
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        // 企业简介和企业产品上传图片
        let imgs = type === 'company'?that.data.imgUrl : that.data.prodImgs
        // 链接图片地址
        let newArr = imgs.concat(res.tempFilePaths)
        // 去除重复
        let set = [...new Set(newArr)]
        set = set.length > 3 ? set.slice(0, 3) : set

        if (type === 'company') {
          that.setData({
            imgUrl: set
          })
        } else {
          that.setData({
            prodImgs: set
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 提交表单
  formSubmit(e) {
    console.log(e)
  },
  // 移除选择的的图片
  remove(e) {
    let index = e.currentTarget.dataset.index
    let type = e.currentTarget.dataset.type
    let arr = type === 'company' ? this.data.imgUrl : this.data.prodImgs
    arr.splice(index, 1)
    if (type === 'company') {
      this.setData({
        imgUrl: arr
      })
    } else {
      this.setData({
        prodImgs: arr
      })
    }
  },
  // 点击修改
  modfiy(e) {
    this.setData({
      prodShow: true
    })
  },
  // 点击删除
  del(e) { 
    wx.showModal({
      title: '提示',
      content: '是否删除',
      success: function(res) {
        if (res.confirm) {
          console.log('用户删除')
        } else {
          console.log('用户取消')
        }
      }
    })
  },
  // 修改和新增企业产品
  prodSubmit(e) {
    console.log(e)
  },
  // 取消企业产品相关
  cancel(){
    this.setData({
      active: '2',
      prodShow: false
    })
  },
  // 新增企业产品
  addProd() {
    this.setData({
      prodShow: true
    })
  }
})