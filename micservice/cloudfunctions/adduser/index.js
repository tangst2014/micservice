// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return await db.collection('user').add({
    data: {
      _openid: wxContext.OPENID,
      nickName: event.nickName,
      avatarUrl: event.avatarUrl,
      gender: event.gender,
      province: event.province,
      city: event.city,
      country: event.country,
      adddata: event.adddata,
      authLogin: event.authLogin,
      _ROOT: event._ROOT,
      _MODIFYROOT: event._MODIFYROOT
    },
    success: function (res) {
      console.log('setLists', event)
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
}