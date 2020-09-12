// miniprogram/pages/index/index.js
import util from "../../utils/utils.js";
const app = getApp()
const db = wx.cloud.database()
const staff = db.collection('staff')
const addtasks = db.collection('addtask')
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
    doing:['完成','未完成'],
    intoview:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    addtasks
    .get()
    .then(res => {
        // 读取所有任务
        // 将任务为为完成和未完成
        res.data.forEach(function(item,index){
          if(item.status){  //完成
            that.data.tasksdone.push(item)

          }else{
            that.data.tasksdoing.push(item)
          }
        })
        console.log('taskdone',that.data.tasksdone)
        console.log('taskdoing',that.data.tasksdoing)
        that.data.tasks=[that.data.tasksdone,that.data.tasksdoing]
        that.setData({
          tasks:that.data.tasks
        })
        wx.setStorage({
          key: 'tasks',
          data: that.data.tasks,
        })
        console.log('tasks',that.data.tasks)
      })
  },
 

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