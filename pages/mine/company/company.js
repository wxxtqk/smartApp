import { fetchProd, addCompany, deletProd, addProd, fetchCompany, fetchProdSingle} from '../../../api/mine.js'
const OK_CODE = '200'
var app = getApp()
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
    isEdit: false, // 是否新增或者修改
    price: '',
    prodname: '',
    proddesc: '',
    prodImgs: [],
    prodtel: '',
    prodemail: '',
    prodaddress: '',
    companyId: '', // 公司的id信息
    prodId: '',// 要修改的产品id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._fetchCompany()
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
  // 初始化获取我的企业
  _fetchCompany() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    fetchCompany().then(res => {
      wx.hideLoading()
      res = res.data
      if (res.state === OK_CODE) {
        that.setData({
          imgUrl: res.data.imgUrl, // 企业图片
          name: res.data.name,
          desc: res.data.desc, // 企业简介
          coll: res.data.coll, // 合作伙伴
          tel: res.data.tel, // 联系电话
          email: res.data.email, // 邮箱
          address: res.data.address, // 地址
          companyId: res.data.id
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.message
        })
      }
    }).catch(() => {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '链接数据库失败'
      })
    })
  },
  // 获取我的企业
  _fetchProd() {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    fetchProd(that.data.companyId).then(res => {
      res = res.data
      wx.hideLoading()
      if (res.state === OK_CODE) {
        that.setData({
          prods: res.data
        })
      }
    }).catch((e) => {
      wx.hideLoading()
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
        let tempFilePaths = res.tempFilePaths
        // 企业简介和企业产品上传图片
        let imgs = type === 'company'?that.data.imgUrl : that.data.prodImgs
        if (type === 'company') {
          // 分开上传公司图片
          that.uploadimg(tempFilePaths, function(res){
            // 链接图片地址
            let newArr = imgs.concat(res)
            // 去除重复
            let set = [...new Set(newArr)]
            // 上传图片到后台
            set = set.length > 3 ? set.slice(0, 3) : set
            that.setData({
              imgUrl: set
            })
          })
        } else {
          // 分开上传企业产品图片
          that.uploadimg(tempFilePaths, function(res){
            // 链接图片地址
            let newArr = imgs.concat(res)
            // 去除重复
            let set = [...new Set(newArr)]
            // 上传图片到后台
            set = set.length > 3 ? set.slice(0, 3) : set
            that.setData({
              prodImgs: set
            })
          })
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  // 上传图片
  uploadimg (data, cb) {
    let pics = data
    return app.uploadimg({
      url: 'http://192.168.199.99:8181/jeesite/a/resources/save', // 上传的地址
      path: pics // 图片的路径
    }, cb)
  },
  // 提交表单---------------企业信息
  formSubmit(e) {
    console.log(e)
    let from = e.detail.value
    let target = {}
    let url = {urls: this.data.imgUrl}
    Object.assign(target, from, url)
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    addCompany(target).then(res => {
      res = res.data
      wx.hideLoading()
      if (res.state === OK_CODE) {
        wx.showToast({
          title: '添加成功',
        })
        // 添加成功制空
        that.setData({
          name: '', // 企业的名称
          desc: '', // 企业简介
          coll: '', // 合作伙伴
          tel: '', // 联系电话
          email: '', // 邮箱
          address: '', // 地址,
          imgUrl: []
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.message
        })
      }
    }).catch(() => {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '链接数据库失败'
      })
    })
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
      isEdit: true,
      prodId: e.currentTarget.dataset.prod
    })
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    fetchProdSingle({id:this.data.prodId}).then(res => {
      wx.hideLoading()
      res = res.data
      if (res.state === OK_CODE) {
        that.setData({
          price: res.data.price,
          prodname: res.data.prodname,
          proddesc: res.data.proddesc,
          prodImgs: res.data.prodImgs,
          prodtel: res.data.prodtel,
          prodemail: res.data.prodemail,
          prodaddress: res.data.prodaddress,
          prodShow: true
        })
      } else {
        wx.showModal({
          title: '提示',
          content: res.message
        })
      }
    }).catch(() => {
      wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '连接数据库失败'
      })
    })
  },
  // 点击删除
  del(e) {
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否删除',
      success: function(res) {
        if (res.confirm) {
          deletProd({id: e.currentTarget.dataset.prod}).then(res => {
            res = res.data
            if (res.state === OK_CODE) {
              wx.showToast({
                title: '添加成功',
              })
              that._fetchProd()
            }
          }).catch(() => {
            wx.showModal({
              title: '提示',
              content: '链接数据库失败'
            })
          })
        } else {
          console.log('用户取消')
        }
      }
    })
  },
  // 修改和新增企业产品
  prodSubmit(e) {
    let from = e.detail.value
    let target = {companyId: this.data.companyId}
    let url = {urls: this.data.prodImgs}
    // 如果是新增
    if (!this.data.isEdit){
      Object.assign(target, from, url)
    } else {
      let prodId = {
        id: this.data.prodId
      }
      Object.assign(target, from, url, prodId)
    }
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    let that = this
    addProd(target).then(res => {
      res = res.data
      wx.hideLoading()
      if (res.state === OK_CODE) {
        wx.showToast({
          title: '添加成功',
        })
        // 添加企业产品input
        that.setData({
          price: '',
          prodname: '',
          proddesc: '',
          prodImgs: [],
          prodtel: '',
          prodemail: '',
          prodaddress: '',
          active: '2',
          prodShow: false
        })
        that._fetchProd()
      } else {
        wx.showModal({
          title: '提示',
          content: res.message
        })
      }
   }).catch(() => {
    wx.hideLoading()
      wx.showModal({
        title: '提示',
        content: '链接数据库失败'
      })
    })
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
      prodShow: true,
      isEdit: false
    })
  }
})