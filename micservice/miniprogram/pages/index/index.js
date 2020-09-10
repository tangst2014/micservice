// miniprogram/pages/index/index.js
import util from "../../utils/utils.js";

const app = getApp()
const db = wx.cloud.database()
const staff = db.collection('staff')
const addtask = db.collection('addtask')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:[],
    taskmarksclass:[], //分类标签
    selectid:0,
    showitem:0,
    userEvalute:[],
    star1: '/images/icon/star1.png',
    star2: '/images/icon/star2.png',
    star3: '/images/icon/star3.png',
    star4: '/images/icon/star4.png',
    star5: '/images/icon/star5.png',
    tasks:[],
    tasksdoing:[],
    tasksdone:[],
    istask:false,
    doing:['完成','未完成'],
    intoview:0
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
   /* 根据不同角色信息切换菜单 */
   console.log('menus',menus)

 
    addtask
    .get()
    .then(res => {

        console.log('addtask',res.data)
        if(res.data.length>0){
          that.setData({
            istask:true,
            tasks:res.data
          })
          
 
        }
       
      })
  },
  onSwitch:function(index){
  
    this.setData({
      intoview:index.currentTarget.dataset.id
    })
  },
  onSearchFn: function () {
    wx.navigateTo({
      url: '/pages/wxSearch/wxSearch',
    })
  },
  
  onAddTask: function () {
    setTimeout(function(){
      wx.navigateTo({
        url: '/pages/addtasks/addtasks',
      })
    },100)
  },
  bindGetUserInfo(e) {
    console.log(e.currentTarget.id)
    if (app.globalData.userInfo){
      wx.navigateTo({
        url: '/pages/evalute/evalute?id='+e.currentTarget.id,
      })
    }
    if ((!app.globalData.userInfo && e.detail.userInfo)) {
      this.getUserData();
    }else{
      return
    }

  },
  /***
 * 登录
*/
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
  // onEvalute: function () {
  //   setTimeout(function () {
  //     wx.navigateTo({
  //       url: '/pages/evalute/evalute',
  //     })
  //   }, 100)
  // },
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