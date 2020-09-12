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
    elements: [{
      title: '布局',
      name: 'layout',
      color: 'cyan',
      icon: 'newsfill'
    },
    {
      title: '背景',
      name: 'background',
      color: 'blue',
      icon: 'colorlens'
    },
    {
      title: '文本',
      name: 'text',
      color: 'purple',
      icon: 'font'
    },
    {
      title: '图标 ',
      name: 'icon',
      color: 'mauve',
      icon: 'icon'
    },
    {
      title: '按钮',
      name: 'button',
      color: 'pink',
      icon: 'btn'
    },
    {
      title: '标签',
      name: 'tag',
      color: 'brown',
      icon: 'tagfill'
    },
    {
      title: '头像',
      name: 'avatar',
      color: 'red',
      icon: 'myfill'
    },
    {
      title: '进度条',
      name: 'progress',
      color: 'orange',
      icon: 'icloading'
    },
    {
      title: '边框阴影',
      name: 'shadow',
      color: 'olive',
      icon: 'copy'
    },
    {
      title: '加载',
      name: 'loading',
      color: 'green',
      icon: 'loading2'
    },
    ]
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
    var tasks = wx.getStorageSync('get-all-addtask')
    if (tasks) {
      console.log('get tasks')
      this.setData({
        tasks: tasks,
        loadfinish: true,
        istask: true
      })
    }
  }
})