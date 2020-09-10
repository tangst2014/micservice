const db = wx.cloud.database()
const staff = db.collection('staff')
const tasks = db.collection('tasks')
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

  },
  ready(){
    var users = wx.getStorageSync('users')
    if (tasks) {
      console.log('get tasks')
      this.setData({
        users: users,
        loadfinish: true,
        istask:true
      })
    }

  },

  /**
   * 组件的方法列表
   */
  methods: {
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
  }
})