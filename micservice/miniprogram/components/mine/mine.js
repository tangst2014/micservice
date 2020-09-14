const db = wx.cloud.database()
const app = getApp().globalData
var headTapCount = 0;
Component({

  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    addtask: {
      type: Array
    },
    tasks:{
      type:Array
    },
    openid:{
      type:Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // tasks: [],
    select: 1,
  },

  ready() {
    console.log('openid',this.data.openid)
    console.log('select',this.data.select)
    console.log('addtask',this.properties.addtask)
    // var addtask = wx.getStorageSync('get-my-addtask')
    // var tasks = wx.getStorageSync('get-my-tasks')
    // var temp = [addtask, tasks]
    // that.setData({
    //   tasks: addtask
    // })
    // console.log('ready mytasks', addtask)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击头部位置，切换菜单
    // 点击6次切换
    onHead: function (e) {
      headTapCount++;
      console.log(headTapCount)
      setTimeout(function () {
        headTapCount = 0
      }, 2000)
      if (headTapCount >= 6) {
        wx.navigateTo({
          url: '/pages/menus/menus',
        })
      }
    },
    onMyAddtask: function () {
      var addtask = wx.getStorageSync('get-my-addtask')
      console.log('addtask', addtask)
      this.setData({
        tasks: addtask,
        select: 1
      })

    },
    onMytasks: function () {
      var tasks = wx.getStorageSync('get-my-tasks')
      console.log('tasks', tasks)
      this.setData({
        tasks: tasks,
        select: 2
      })


    },
    onSwitch: function (index) {

      this.setData({
        intoview: index.currentTarget.dataset.id
      })
    },
    bindGetUserInfo(e) {
      console.log('id', e.currentTarget.id)
      if (app.userInfo) {
        wx.navigateTo({
          url: '/pages/evalute/evalute?id=' + e.currentTarget.id,
        })
      }
      if ((!app.userInfo && e.detail.userInfo)) {
        this.getUserData();
      } else {
        return
      }

    }
  }
})