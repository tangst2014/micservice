// miniprogram/pages/wxSearch/wxSearch.js
var last_value = ''
var timer = null
const db = wx.cloud.database()
const _ = db.command
const task = db.collection('task')
const livingHistory = db.collection('livingHistory')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxSearchData:{  //搜索值
      value:''
    },
    loadMore: true, //"上拉加载"的变量，默认true，隐藏  
    result:[],
    loadfinish: true,
    livingLists: [],
    AnalyseData:[],
    currentPage: 0, // 当前第几页,0代表第一页 
    pageSize: 10, //每页显示多少数据 
    isLiving:true,
    isLivingPickUp:false,
    isPickUp: false,
    indexshow:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

  },
  onSearchFn: function (e) {  
    var that = this
    that.setData({
      indexshow: false,
      loadfinish: false,
      AnalyseData: [], // 清空
      currentPage: 0, // 当前第几页,0代表第一页 
      pageSize: 10, //每页显示多少数据 
    })
    if (!this.data.wxSearchData.value) {
      that.setData({
        'wxSearchData.value': ''
      })
    }
    if (last_value != this.data.wxSearchData.value) {
      that.setData({
        result: [],
      });
    }
    this.onGetAnalyseData(this.data.wxSearchData.value)   //该产品被什么人借用过 统计

    
  },
  wxSearchInput: function (e) {
    var that = this
    var lasttime = null
    that.setData({
      'wxSearchData.value': e.detail.value
    })
    clearTimeout()       //清除所有计时
    timer = setTimeout(function () {
      if (timer == lasttime) {     //最后一次计时与当前计时相等，则认为是最后一次请求
        // that.onSearchFn(e); 取消自动搜索
      }
    }, 2500)
    lasttime = timer  //最后一次计时

  },
  onLivingPickUp: function () {
    var isLivingPickUp = !this.data.isLivingPickUp
    this.setData({
      isLivingPickUp: isLivingPickUp
    })
  },
  onPickUp: function () {
    var isPickUp = !this.data.isPickUp
    this.setData({
      isPickUp: isPickUp
    })
  },
  onGetAnalyseData(product, reachbottom = false) {
    var that = this
    var key = product
    if (reachbottom) {
      that.setData({
        loadMore: false, //加载中,
        currentPage: that.data.currentPage + 1
      })
    }
    task
      .where(
        _.or([{
            bkstaff: db.RegExp({
            regexp: '.*' + key,
            options: 'i',
          })
        },
        {
          department: db.RegExp({
            regexp: '.*' + key,
            options: 'i',
          })
        },
        {
          tasks: db.RegExp({
            regexp: '.*' + key,
            options: 'i',
          })
        },
        {
          starttime: db.RegExp({
            regexp: '.*' + key,
            options: 'i',
          })
        }
        ])
      ).get({
        success: function (res) {
          that.setData({
            livingLists: res.data,
            loadfinish: true,
          })
        }
    })
     //分页查询
    livingHistory
    .skip(that.data.currentPage * that.data.pageSize) //从第几个数据开始
    .limit(that.data.pageSize)
    .where(
      _.or([{
        'userBorrowInfo.myName': db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        'devlists.lists.product': db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        name: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        title: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      }
    ])
    )
    .get({
      success: function (res) {
        res.data = that.data.AnalyseData.concat(res.data)
     //   console.log('AnalyseData', res.data)
        that.setData({
          AnalyseData: res.data,
          loadMore: true, //加载中,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    that.onGetAnalyseData(that.data.wxSearchData.value, true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})