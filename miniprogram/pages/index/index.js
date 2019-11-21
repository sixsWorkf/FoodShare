// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndexNav: 0,
    navList: [{}],


  },
  invite() {
    console.log("invite")
  },
  activeNav(e) {
    // console.log(123)
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  getMenu: function (e){
    var that = this
    var navList = that.data.navList
    wx.cloud.callFunction({
      name: 'getMenu',
      data: {},
      success: function (res) {
        //将res数组传入data的navList中
        navList.splice(0, 1)
        that.setData({ navList })
        for (let i = 0; i < res.result.data.length; i++) {
          navList.push(res.result.data[i])
          that.setData({ navList })
        }

      },
      fail: console.error
    })
      //console.log(that.data.navList) 测试写入是否成功
  },


  onLoad: function (options) {
    this.getMenu()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})