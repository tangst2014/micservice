// miniprogram/pages/login/login.js
import util from "../../utils/utils.js";
const app = getApp().globalData
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnValue: '登录'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /***
  * 登录
 */
  getUserData: function () {
    if(app._openid){
      return;
    }
    wx.showLoading({
      title: '登录中~~',
      mask: true,
    })

    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (resUserInfo) {
              var UserInfo = resUserInfo.userInfo

              wx.cloud.callFunction({    //添加livingHistory表记录
                name: 'login',
                success: res => {
                  console.log('UserInfo', res.result.openid)
                  app._openid = res.result.openid
                  
                  wx.setStorage({
                    key: 'userInfo',
                    data: UserInfo
                  })

                  wx.setStorage({
                    key: 'openid',
                    data: res.result.openid
                  })

                  that.setData({ btnValue: '已登录' })
                  setTimeout(function () {
                    wx.hideLoading();
                  }, 1000)

                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 1500)
                },
                fail: err => { }
              })

             
            }, complete: res => {
              
            }
          })
        }
      }
    })
  },
  bindGetUserInfo(e) {
   
    if ((!this.data.logged && e.detail.userInfo)) {
      this.setData({
        logged: true,
        btnUserInfo: false,
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName,
      })
      this.getUserData();
    }

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
   * 每次离开都要同步用户数据库状态
   */
  onUnload: function () {
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    if (prevPage) {
      if (prevPage.route == 'pages/indexsys/index/index') {
        prevPage.onLoad();
      }
    }
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