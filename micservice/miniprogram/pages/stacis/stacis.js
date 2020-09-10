import util from "../../utils/utils.js";
const app = getApp()
const db = wx.cloud.database()
const staff = db.collection('staff')
const tasks = db.collection('tasks')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    
    staff.get()
    .then(res=>{
      that.setData({
        users: res.data,
      })
    })
  },
  onUser:function(e){
    var that = this
    var index = e.currentTarget.dataset.index
    var user=that.data.users[index]
    var taskmarksclass=[]
    var flag = 0
    this.setData({
      selectid: index,
      showitem: index,
    })
    tasks
    .where({
      _openid: user._openid
    })
    .get()
      .then(res => {
        console.log('tasks',res.data)
        var taskmarks = res.data
        that.setData({
          userEvalute: taskmarks,
        })
        var az = '';
        for (var i = 0; i < taskmarks.length; i++) {
          for (let j = 0; j < taskmarks[i].tasks_evalute.hotevalute.length; j++){
            if (taskmarksclass.length>0){
              marksloop:
              for (let k = 0; k < taskmarksclass.length; k++) {
                if (taskmarks[i].tasks_evalute.hotevalute[j] == taskmarksclass[k].markval) {
                  taskmarksclass[k].count++
                  flag=0
                  break marksloop;
                } else {
                  flag=1
                }
              }
              if (flag==1){
                taskmarksclass.push({ 'count': 1, 'markval': taskmarks[i].tasks_evalute.hotevalute[j] });
              }
            }else{
              taskmarksclass.push({ 'count': 1, 'markval': taskmarks[i].tasks_evalute.hotevalute[j] });
            }
          }
        }
        var compare=function(obj1,obj2){
          var val1= obj1.count
          var val2 = obj2.count
          if(val1>val2){
            return -1;
          } else if (val1 < val2){
            return 1;
          }else{
            return 0;
          }
        } 
        console.log('taskmarksclass', taskmarksclass)
        var taskmarksclasssort= taskmarksclass.sort(compare)
        that.setData({
          taskmarksclass: taskmarksclasssort,
        })
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