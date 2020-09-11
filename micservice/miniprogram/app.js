//app.js
App({
  onLaunch: function () {
    var that =this
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'micservice-debug-1nlrl',
        traceUser: true,
      })
    }
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      that.globalData.userInfo = userInfo
      that.globalData._openid = userInfo._openid
    }

    var menucheck = wx.getStorageSync('menucheck')
    if(menucheck){
        that.globalData.onmenu = menucheck
    }
  },
  globalData : {
    userInfo: null,
    onmenu: 1,  //切换菜单，1:管理员；2:维护人员 3：普通员工
    _openid:''   //用户openid
  }
})
