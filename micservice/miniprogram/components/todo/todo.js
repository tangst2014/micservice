var headTapCount = 0;  //点击切换菜单
var _taskid=''  //点击去办，任务id
var _tasks=''  //点击去办，任务内容
const app = getApp()
import util from "../../utils/utils.js";
Component({

  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties:{
    loading:{
      type:Boolean
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
 
    optionList:['去办'],
    hideFlag: true,//true-隐藏  false-显示
    animationData: {},//
    gettask:true //避免多次点击 去办
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSearchFn: function () {
      wx.navigateTo({
        url: '/pages/wxSearch/wxSearch',
      })
    },
    onHead: function () {
      headTapCount++;
      setTimeout(function () {
        headTapCount = 0
      }, 2000)
      if (headTapCount >= 6) {
        wx.navigateTo({
          url: '/pages/menus/menus',
        })
      }
    },
  
    // 点击选项
    getOption:function(){
      var that = this;
      if(that.data.gettask){
        that.data.gettask=false  //点击一次有效
        that.hideModal();
        if(_taskid==''){
          return
        }
        for(let i = 0 ; i < app.allAddTask.length; i++){
          if(_taskid == app.allAddTask[i]._id){
            _tasks = app.allAddTask[i]
            app.allAddTask.splice(i,1)

            
            that.setData({
              tasks: app.allAddTask,
            })

            that.sysDataBase()


            wx.setStorage({
              key: 'get-all-addtask',
              data: app.allAddTask
            })

            that.data.gettask=true
            return
          }
  
        }
      }

    },

    sysDataBase:function(){
      var time = util.formatTime(new Date)  // 获取当前最新时间
    
      wx.cloud.callFunction({
        name:"remove",
        data:{
          _id:_taskid
        }
      })
      wx.cloud.callFunction({    //添加livingHistory表记录
        name: 'tasks',
        data: {
          _openid:  _tasks._openid,
          _wnopenid:app.globalData._openid,
          starttime: _tasks.starttime,
          department:  _tasks.department,
          tasks:  _tasks.tasks,
          status: true,
          evaluteSts:false,
          endtime:  time,
          bkstaff:  _tasks.bkstaff,
          feedback:  _tasks.feedback,
          tasks_evalute: {},
        },
        success: res => {
          //  console.log('调用[云函数]成功 ', res)
          setTimeout(function () {
            wx.hideToast();
            wx.navigateTo({
              url: '/pages/indexsys/index/index',
            })

          }, 1000)
        },
        fail: err => {
          console.error('调用失败', err)
          wx.showToast({
            title: "添加失败",
            duration: 1000
          })
        }
      })
    },
    //取消
    mCancel: function () {
      var that = this;
      that.hideModal();
    },
  
    // ----------------------------------------------------------------------modal
    // 显示遮罩层
    onDoneTask: function (e) {
 
      _taskid = e.currentTarget.dataset.id
      console.log('_taskid',_taskid)
      var that = this;
      that.setData({
        hideFlag: false
        
      })
      // 创建动画实例
      var animation = wx.createAnimation({
        duration: 400,//动画的持续时间
        timingFunction: 'ease',//动画的效果 默认值是linear->匀速，ease->动画以低速开始，然后加快，在结束前变慢
      })
      this.animation = animation; //将animation变量赋值给当前动画
      var time1 = setTimeout(function () {
        that.slideIn();//调用动画--滑入
        clearTimeout(time1);
        time1 = null;
      }, 100)
    },
  
    // 隐藏遮罩层
    hideModal: function () {
      var that = this;
      var animation = wx.createAnimation({
        duration: 400,//动画的持续时间 默认400ms
        timingFunction: 'ease',//动画的效果 默认值是linear
      })
      this.animation = animation
      that.slideDown();//调用动画--滑出
      var time1 = setTimeout(function () {
        that.setData({
          hideFlag: true
        })
        clearTimeout(time1);
        time1 = null;
      }, 220)//先执行下滑动画，再隐藏模块
      
    },
    //动画 -- 滑入
    slideIn: function () {
      this.animation.translateY(0).step() // 在y轴偏移，然后用step()完成一个动画
      this.setData({
        //动画实例的export方法导出动画数据传递给组件的animation属性
        animationData: this.animation.export()
      })
    },
    //动画 -- 滑出
    slideDown: function () {
      this.animation.translateY(300).step()
      this.setData({
        animationData: this.animation.export(),
      })
    }
  },
  ready() {
    if (app.allAddTask) {
      this.setData({
        tasks: app.allAddTask,
      })
    }
  }
})