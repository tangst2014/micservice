const app = getApp().globalData


Page({

  /**
   * 页面的初始数据
   */
  data: {
      items: [
        {value: '1', name: '管理员'},
        {value: '2', name: '网络运维'},
        {value: '3', name: '普通员工'},
      ],
      loading:true
  },
  radioChange(e) {
    app.onmenu= e.detail.value
    this.setData({
      loading:false
    })
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/indexsys/index/index',
      })
    }, 1000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const items = this.data.items
    var that = this
    if(app.onmenu==1){
      items[0].checked = true
    }else if(app.onmenu==2){
      items[1].checked = true
    }else{
      items[2].checked = true
    }
 
    that.setData({
      items:items
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
      wx.setStorage({
        key: 'menucheck',
        data: app.onmenu,
      })
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