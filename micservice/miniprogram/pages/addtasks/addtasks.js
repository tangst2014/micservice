// miniprogram/pages/addDevice/addDevice.js
import util from "../../utils/utils.js";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitting: false//正在提交，让页面空白
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.time = util.formatTime(new Date)  // 获取当前最新时间
  },
  formSubmit: function (e) {
    var that = this
    if (e.detail.value.department == '' || e.detail.value.tasks == '') {
      wx.showToast({
        title: '请填写内容~~',
        mask: true,
        duration: 1000
      })
      setTimeout(() => {
        wx.hideToast({
          complete: (res) => { },
        })
      }, 1000);
      return;
    }
    that.setData({ submitting: true })
    wx.showToast({
      title: "请稍等",
      duration: 2000
    })
    wx.cloud.callFunction({    //添加livingHistory表记录
      name: 'addtask',
      data: {
        starttime: this.data.time,
        department: e.detail.value.department,
        tasks: e.detail.value.tasks,
        status: false,
        openid: '123',
        endtime: '',
        bkstaff: '',
        feedback: '',
        tasks_evalute:{},
      },
      success: res => {
        //  console.log('调用[云函数]成功 ', res)
        setTimeout(function () {
          wx.hideToast();
          wx.navigateBack({
            delta: 1
          })

        }, 2000)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.showToast({
          title: "添加失败",
          duration: 2000
        })
      }
    })



  },

  /**
     * 照片操作
    */
  // 删除照片 &&
  imgDelete1: function (e) {
    let that = this;
    let index = e.currentTarget.dataset.deindex;
    let imgbox = this.data.imgbox;
    imgbox.splice(index, 1)
    that.setData({
      imgbox: imgbox
    });
  },
  // 选择图片 &&&
  addPic1: function (e) {
    var imgbox = this.data.imgbox;
    //console.log(imgbox)
    var that = this;
    imgbox = imgbox.concat({
      company: '',
      product: ''
    })
    that.setData({
      imgbox: imgbox
    });
  },

  //图片
  imgbox: function (e) {
    this.setData({
      imgbox: e.detail.value
    })
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