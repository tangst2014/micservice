// miniprogram/pages/evalute/evalute.js
import util from "../../utils/utils.js";
const app = getApp()
const db = wx.cloud.database()
const tasks = db.collection('tasks')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    submitting: false,//正在提交，让页面空白
    task:"",   //获取评价的任务
    taskid: "",   //获取评价的任务id
    tasks_evalute: {
      star:0,
      hotevalute:[]
    },// 提交评价
    star: 0,
    startext:null,
    selectmarks:[], //选中标记
    noteMaxLen: 300, // 最多放多少字
    info: "",
    noteNowLen: 0,//备注当前字数
    liked:'/images/icon/liked.png',
    unliked:'/images/icon/unliked.png',
    stars_text:"",
    hotscore:[

      {
        star:1,
        text:'不满意',
        hotevalute:["服务态度差","技术不过关","没耐心","没有解决问题"]
      },{
        star: 2,
        text: '一般',
        hotevalute: ["服务态度差", "技术不过关", "没耐心", "没有解决问题"]
      }, {
        star: 3,
        text: '不错',
        hotevalute: ["服务好", "有耐心", "解决问题"]
      }, {
        star: 4,
        text: '满意',
        hotevalute: ["服务好", "有耐心", "解决问题"]
      }, {
        star: 5,
        text: '超级牛',
        hotevalute: ["技术牛人", "解决问题"]
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    var tasks= wx.getStorageSync('get-my-tasks')
    var that=this
 
    tasks.forEach(function(item,index){
      if (item._id==options.id){

        that.setData({
          task: item.tasks,
          taskid: item._id
        })
      }
    })
   
  },
  getTasks:function(id){
    var that = this
    tasks
      .where({
        _id: id
      })
      .get()
      .then(res => {
        console.log('evalute getTasks',res.data)
        that.setData({
          task: res.data[0].tasks,
          taskid: res.data[0]._id
        })
      })
  },
  // 监听字数
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({ info: value, noteNowLen: len })

  },
  // 提交清空当前值
  bindFormSubmit: function (e) {
    var that = this
    if(that.data.taskid){  //为空
      wx.showToast({
        title: '没有查询到信息',
        mask:true,
        duration:2000,
      })
      setTimeout(function () {
        wx.hideToast();
        wx.navigateBack({
          delta: 1
        })
      }, 2000)
    }
    this.setData({ submitting: true })
    var time = util.formatTime(new Date)  // 获取当前最新时间
    var tasks_evalute=  that.data.tasks_evalute

   
    tasks_evalute.text = e.detail.value.textarea
    
    tasks_evalute.time = time
    tasks_evalute.userInfo = app.globalData.userInfo

    console.log('evalute tasks', tasks_evalute)

    if (tasks_evalute.star>0){  //为0没有操作
      wx.cloud.callFunction({   //更新记录
        name: 'update',
        data: {
          _id: that.data.taskid,
          evaluteSts:true,
          tasks_evalute: tasks_evalute
        },
        success: res => { },
        fail: err => { },
        complete: res => { }
      })
    }else{
      wx.showToast({
        title: '请打分',
        icon: 'success',
        duration: 1500,
        mask: false,
        success: function () {
        }
      })

    }
    
    wx.showToast({
      title: '发布成功',
      icon: 'success',
      duration: 1500,
      mask: false,
      success: function () {
       
      }
    })

  },
  hotscorecheck: function (star){
    var that=this
    that.data.tasks_evalute.star = star//重置提交
    that.data.tasks_evalute.hotevalute=[]  //重置提交
    var hotscore = this.data.hotscore
    for (let i = 0; i < hotscore.length;i++){
      if (star == hotscore[i].star){
        that.setData({
          hotevalute: hotscore[i].hotevalute,
          startext: null,
          selectmarks:[] //选中标记
        })
      }
    }
  },
  changeLiked1: function () {
    var that = this;
    that.setData({
      star: 1,
      stars_text:"不满意",
    });
    that.hotscorecheck(1)
  },
  changeLiked2: function () {
    var that = this;
    that.setData({
      star: 2,
      stars_text: "一般",
    });
    that.hotscorecheck(2)
  },
  changeLiked3: function () {
    var that = this;
    that.setData({
      star: 3,
      stars_text: "不错",
    });
    that.hotscorecheck(3)
  },
  changeLiked4: function () {
    var that = this;
    that.setData({
      star: 4,
      stars_text: "满意",
    });
    that.hotscorecheck(4)
  },
  changeLiked5: function () {
    var that = this;
    that.setData({
      star: 5,
      stars_text: "超级牛",
    });
    that.hotscorecheck(5)
  },
  onSelect:function(e){
    var that = this
    var hotscore = that.data.hotscore
    var index = e.currentTarget.dataset.index
    var selectval = hotscore[that.data.tasks_evalute.star-1].hotevalute[index] //选中值
    var selected = true
    //循环tasks_evalute值，若选中值存在于提交tasks_evalute中，操作
    for (let i = 0; i < that.data.tasks_evalute.hotevalute.length;i++){
      if (that.data.tasks_evalute.hotevalute[i] == selectval){
        that.data.tasks_evalute.hotevalute.splice(i,1)
        that.data.selectmarks[index] = false
        selected = false
        break
      }
    }
    if(selected){  //没有选中或之前没选中
      that.data.tasks_evalute.hotevalute.push(selectval)
      that.data.selectmarks[index]=true
    }
    that.setData({
      selectmarks: that.data.selectmarks
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