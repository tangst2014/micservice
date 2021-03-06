// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  // const wxContext = cloud.getWXContext()
  return await db.collection('tasks').add({
    data: {
      _openid: event._openid,
      _wnopenid:event._wnopenid,
      starttime: event.starttime,
      department: event.department,
      tasks: event.tasks,
      status: event.status,
      endtime: event.endtime,
      bkstaff: event.bkstaff,
      feedback: event.feedback,
      tasks_evalute: event.tasks_evalute,
      evaluteSts:event.evaluteSts
    },
    success: function (res) {
      wx.showToast({
        title: "添加成功",
        duration: 2000
      })
    },
    fail: function (res) {
      wx.showToast({
        title: "添加失败",
        duration: 2000
      })
    }
  })
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}