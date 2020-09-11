const db = wx.cloud.database()

Component({

  /**
   * 组件的属性列表
   */
  options:{
    addGlobalClass: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    tasks:[]
  },

  ready(){
    var that= this
    var tasks = wx.getStorageSync('mytask')
    that.setData({
      tasks:tasks
    })
    console.log('ready mytasks',tasks)
  },
  /**
   * 组件的方法列表
   */
  methods: {
  
  }
})