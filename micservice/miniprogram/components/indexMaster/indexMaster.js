var headTapCount = 0;
Component({

  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },

  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    select: 1,
    loading:true
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
    onAddtask: function () {
      var addtask = wx.getStorageSync('get-all-addtask')
      console.log('addtask', addtask)
      this.setData({
        tasks: addtask,
        select: 1
      })

    },
    onTasks: function () {
      var tasks = wx.getStorageSync('get-all-tasks')
      console.log('tasks', tasks)
      this.setData({
        tasks: tasks,
        select: 2
      })


    },
  },
  ready() {
    console.log('loading', this.data.loading)
    var tasks = wx.getStorageSync('get-all-addtask')
    if (tasks) {
      console.log('get tasks')
      this.setData({
        tasks: tasks,
        loadfinish: true,
        istask: true,
        loading: false
      })
    }
  }
})