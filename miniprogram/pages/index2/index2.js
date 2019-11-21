// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    activeNames: ['0'],
    indextrue: "所有",
    orderedList:[//已点菜列表

    ],
    dishindexs: [
      { name: "所有" },
      { name: "风味菜肴" },
      { name: "招牌菜" },
      { name: "主食" },
      { name: "小食" },
      { name: "甜品" },
      { name: "田园蔬菜" },
    ],
    navList: [
      { id: 1, name: "杨枝甘露", price: "20", num: "2", dishindexs: "饮品", flavor: false },
      { id: 2, name: "杨枝甘露", price: "20", num: "2", dishindexs: "凉菜", flavor: false },
      { id: 3, name: "杨枝甘露", price: "20", num: "2", dishindexs: "饮品", flavor: false },
      { id: 4, name: "杨枝甘露", price: "20", num: "2", dishindexs: "饮品", flavor: false },
      { id: 5, name: "杨枝甘露", price: "20", num: "2", dishindexs: "饮品", flavor: false },
      { id: 6, name: "杨枝甘露", price: "20", num: "2", dishindexs: "饮品", flavor: false },
      { id: 7, name: "杨枝甘露", price: "20", num: "2", dishindexs: "饮品", flavor: false },


    ],


    currentIndexNav: 0,
    show1: false,
    show2: true,
    animationdata1: null,
    animationdata2: null,

  },


  onChange1(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  activeNav(e) {
    // console.log(123)
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
  },
  tap1: function () {//伸缩
    this.setData({
      show1: !this.data.show1,
      show2: !this.data.show2,
    })
    var animation2 = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
      delay: 0,
      transformOrigin: "50% 50%",
    })
    animation2.translateX(225).opacity(1).step();

    var animation1 = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
      delay: 0,
      transformOrigin: "50% 50%",
    })
    animation1.translateX(-225).opacity(1).step();

    if (this.data.show1 == true) {
      this.setData({
        animationdata2: animation2.export(),
      })
    } else {
      this.setData({
        animationdata2: animation1.export(),
      })
    }
  },
  activeorder(e) {//不喜欢

    let thisIdx = e.target.dataset.index;
    console.log(thisIdx);
    let playStatus = "navList[" + thisIdx + "].flavor";
    this.setData({
      [playStatus]: !this.data.navList[thisIdx].flavor
    });
  },
  adddish(e) {//加菜
    let thisIdx = e.target.dataset.index;
  },
  subdish(e) {//减菜
    let thisIdx = e.target.dataset.index;
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