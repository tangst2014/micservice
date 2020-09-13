var headTapCount = 0;
Component({

  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
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
    }
  },
  ready() {
    var tasks = wx.getStorageSync('get-all-tasks')
    if (tasks) {
      console.log('get tasks')
      this.setData({
        tasks: tasks,
        loadfinish: true,
        loading: false
      })
    }
  }
})