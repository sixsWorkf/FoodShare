// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_price:100,
    imageheight: 0,
    imagewidth: 0,
    active: 0,
    activeNames: ['0'],
    indextrue: "所有",
    dishindexs: [
      { name: "所有" },
      { name: "风味菜肴" },
      { name: "招牌菜" },
      { name: "主食" },
      { name: "小食" },
      { name: "甜品" },
      { name: "田园蔬菜" },
    ],

    dish:[//已点菜
      { id: "1", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品", peoplename:"帅哥"},
      { id: "2", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "凉菜", peoplename: "帅哥"},
      { id: "3", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品", peoplename: "帅哥"},
      { id: "4", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品", peoplename: "帅哥"},
      { id: "5", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品", peoplename: "帅哥"},
      { id: "6", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品", peoplename: "帅哥"},
      { id: "7", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品", peoplename: "帅哥" },
      { id: "8", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品", peoplename: "帅哥" },
    ],

    


  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none'
    });
  },

  onChange1(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  //获取屏幕大小
  imageLoad() {

    this.setData({

      imageheight: wx.getSystemInfoSync().windowHeight,
      imagewidth: wx.getSystemInfoSync().windowWidth
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置像素大小
    this.imageLoad();
    let ratio = 750 / this.data.imagewidth;
    this.setData({

      imageheight: this.data.imageheight * ratio,
      imagewidth: this.data.imagewidth * ratio
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})