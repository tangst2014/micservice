import util from "../../utils/utils.js";
const app = getApp().globalData
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

  },

  /**
   * 组件的初始数据
   */
  data: {
    submitting: false//正在提交，让页面空白
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit: function (e) {
      var time = util.formatTime(new Date)  // 获取当前最新时间
      var that = this
      if (e.detail.value.department == '' || e.detail.value.tasks == '') {
        wx.showToast({
          title: '请填写内容~~',
          mask: true,
          duration: 1000
        })
        setTimeout(() => {
          wx.hideToast({
            complete: (res) => { },
          })
        }, 1000);
        return;
      }
      that.setData({ submitting: true })
      wx.showToast({
        title: "请稍等",
        duration: 2000
      })
      wx.cloud.callFunction({    //添加livingHistory表记录
        name: 'addtask',
        data: {
          starttime: time,
          department: e.detail.value.department,
          tasks: e.detail.value.tasks,
          status: false,
          openid: app._openid,
          endtime: '',
          bkstaff: '',
          feedback: '',
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

    /**
       * 照片操作
      */
    // 删除照片 &&
    imgDelete1: function (e) {
      let that = this;
      let index = e.currentTarget.dataset.deindex;
      let imgbox = this.data.imgbox;
      imgbox.splice(index, 1)
      that.setData({
        imgbox: imgbox
      });
    },
    // 选择图片 &&&
    addPic1: function (e) {
      var imgbox = this.data.imgbox;
      //console.log(imgbox)
      var that = this;
      imgbox = imgbox.concat({
        company: '',
        product: ''
      })
      that.setData({
        imgbox: imgbox
      });
    },

    //图片
    imgbox: function (e) {
      this.setData({
        imgbox: e.detail.value
      })
    },
  }
})
