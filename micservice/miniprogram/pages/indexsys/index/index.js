// pages/_index/_index.js
const app = getApp().globalData
const db = wx.cloud.database()
var menus  = require('../../../tabbars/js/menus');
const gettask = db.collection('tasks')
const staff = db.collection('staff')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    /* 声明权限数据 */
    roleId: "",
    /* 声明跳转Target */
    PageCur: "",
    /* 声明菜单数据 */
    menus: {},
    /* 扫码数据 */
    scanRs:{}
  },

  /* ColorUI页面跳转方式 */
  NavChange(e) {
    var cur = e.currentTarget.dataset.cur;
    if(cur){
      this.setData({
        PageCur: cur,
        "menus.activeUrl": cur
      })
    }
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 
      获取角色信息
      ...
    */
   console.log('menus',menus)
   var that = this
    options.roleId = app.onmenu;
    /* roleId 1:管理员；2:维护人员 3：普员工*/
    if(options.roleId == 1){
      this.setData({
        PageCur:menus.masterMenuData.activeUrl,
        roleId: options.roleId,
        menus: menus.masterMenuData
      })
    } else if(options.roleId==2){
      this.setData({
        PageCur:menus.agentMenuData.activeUrl,
        roleId: options.roleId,
        menus: menus.agentMenuData
      })
    } else{
      this.setData({
        PageCur:menus.staffMenuData.activeUrl,
        roleId: options.roleId,
        menus: menus.staffMenuData
      })
      console.log('PageCur',that.data.PageCur)
    }


    gettask
    .get()
    .then(res => {

        console.log('gettask',res.data)
        if(res.data.length>0){
          
          wx.setStorage({
            key: 'gettask',
            data: res.data
          })
 
        }
       
      })


      staff.get()
      .then(res=>{
        wx.setStorage({
          key: 'users',
          data: res.data
        })
      })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
/***
   * 登录
  */
 getUserData: function () {
  var that = this
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
        wx.getUserInfo({
          success: function (resUserInfo) {
            wx.showLoading({
              title: '登录中~~',
              mask: true,
            })
            wx.cloud.callFunction({   //用户信息
              name: 'login',
              data: {},
              success: resLogin => {
                db.collection('user').where({ _openid: resLogin.result.openid }).get()
                  .then(resuser => {
                    if (resuser.data.length > 0) {
                      //用户信息已保存
                      console.log('用户信息保存resuser', resuser.data[0])
                      app.globalData.userInfo = resuser.data[0]
                      setTimeout(function () {
                        wx.navigateTo({
                          url: '/pages/evalute/evalute',
                        })
                      }, 100)
                      wx.setStorage({
                        key: 'userInfo',
                        data: resuser.data[0]
                      })
                     
                    } else {
                      //用户信息未保存
                      console.log('用户信息未保存resuser', resuser.data[0])
                      app.globalData.userInfo._openid = resLogin.result.openid
                      app.globalData.userInfo.nickName = resUserInfo.userInfo.nickName
                      app.globalData.userInfo.avatarUrl = resUserInfo.userInfo.avatarUrl
                      var DATA = util.formatTime(new Date)  // 获取当前最新时间
                      wx.cloud.callFunction({
                        name: 'addUser',
                        data: {
                          _openid: resLogin.result.openid,
                          nickName: resUserInfo.userInfo.nickName,
                          avatarUrl: resUserInfo.userInfo.avatarUrl,
                          gender: resUserInfo.userInfo.gender,
                          province: resUserInfo.userInfo.province,
                          city: resUserInfo.userInfo.city,
                          country: resUserInfo.userInfo.country,
                          adddata: DATA,
                          _ROOT: false,  //最高权限
                          _MODIFYROOT: false  //最高修改权限
                        }
                      }).then(res => {
                        setTimeout(function () {
                          wx.navigateTo({
                            url: '/pages/evalute/evalute',
                          })
                        }, 100)
                        console.log('登录信息', res)
                      })
                    }
                  })
              },
            })
          }, complete: res => {
            that.setData({ btnValue: '已登录' })
            setTimeout(function () {
              wx.hideLoading();
            }, 3000)
          }
        })
      }
    }
   })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    /* setTimeout(function () {
      wx.redirectTo({
        url: '../index/index?roleId=1',
      })
    }, 1000) */
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