// miniprogram/pages/tologin/tologin.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bindGetUserInfo: function (e) {
    var that = this;
    //此处授权得到userInfo
    console.log(e.detail.userInfo);
    //接下来写业务代码
    app.globalData.avatarUrl = e.detail.userInfo.avatarUrl
    app.globalData.nickName = e.detail.userInfo.nickName

    wx.cloud.callFunction({
      name: 'addPerson',
      data:
      {
        roomid_members: "0000.members",
        openid: app.globalData.openid,
        avatarUrl: e.detail.avatarUrl,
      },
      success: function (res) {
        console.log("房间加入一人")
      },
      fail: console.error
    })    
    //最后，记得返回刚才的页面
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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