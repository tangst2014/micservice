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
      department: event.type,
      staff: event.abbr,
      trouble: event.count,
      starttime: event.lists,
    },
    success: function (res) {
      console.log('liveroom', event)
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