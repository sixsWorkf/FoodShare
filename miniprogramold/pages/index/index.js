// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndexNav: 0,
   HEAD
    navList: [{}],


=======
    show1: false,
    show2: true,
    animationdata1: null,
    animationdata2: null,
    spiceList:[//种类列表
      {
        id:1,
        name:'招牌菜'
      },
      {
        id: 2,
        name: '风味菜肴'
      },
      {
        id: 3,
        name: '小食'
      },
      {
        id: 4,
        name: '主食'
      },
      {
        id: 5,
        name: '甜品'
      },
      {
        id: 6,
        name: '田园蔬菜'
      },
    ],
    navList: [//菜单列表
      {
        id: 1,
        name: '热销菜品',
        price: 12,
        count: 1,
        flavor: false
      },
      {
        id: 2,
        name: '热菜',
        price: 12,
        count: 1,
        flavor: false
      },
      {
        id: 3,
        name: '凉菜',
        price: 12,
        count: 1,
        flavor: false
      },
      {
        id: 4,
        name: '热菜',
        price: 12,
        count: 1,
        flavor: false
      },
      {
        id: 1,
        name: '热销菜品',
        price: 12,
        count: 1,
        flavor: false
      },
      {
        id: 2,
        name: '热菜',
        price: 12,
        count: 1,
        flavor: false
      },
      {
        id: 3,
        name: '凉菜',
        price: 12,
        count: 1,
        flavor: false
      },
      {
        id: 4,
        name: '热菜',
        price: 12,
        count: 1,
        flavor: false
      },


    ],
    orderedList:[//已点菜的列表

    ],
>>>>>>> b990d87e4d8ad8a2e28ac408d6994781a268efc6
  },
  invite() {//邀请好友的函数
   
  },
  activeNav(e) {//种类选择的样式函数
    // console.log(123)
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
  },
  tap1: function () {//界面伸缩函数
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
    animation2.translateX(216).opacity(1).step();

    var animation1 = wx.createAnimation({
      duration: 1000,
      timingFunction: "ease",
      delay: 0,
      transformOrigin: "50% 50%",
    })
    animation1.translateX(-216).opacity(1).step();

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
  activeorder(e) {//不喜欢的函数

    let thisIdx = e.target.dataset.index;
    let playStatus = "navList[" + thisIdx + "].flavor";
    this.setData({
      [playStatus]: !this.data.navList[thisIdx].flavor
    });
   
  },
  adddish(e){//加菜函数

  },
  subdish(e){//减菜函数

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
<<<<<<< HEAD
    this.getMenu()
=======

>>>>>>> b990d87e4d8ad8a2e28ac408d6994781a268efc6
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