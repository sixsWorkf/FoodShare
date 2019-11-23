//全局变量
const app = getApp()
const db = wx.cloud.database();
var watcher;
//

Page({

  /**
   * 页面的初始数据
   */
  data: {
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

    roomid: "",        //本房间房间号
    navList: [],        //菜单表
    orderedList: [],    //点菜记录表

    flavorList: [{ flavor: false }, { flavor: false }, { flavor: false },
    { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false },
    { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false },
    { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false },
    { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false },
    { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }, { flavor: false }],

    currentIndexNav: 0,
    show1: false,
    show2: true,
    animationdata1: null,
    animationdata2: null,

  },


  onChange1: function (event) {
    this.setData({
      activeNames: event.detail
    });
  },

  activeNav: function (e) {
    // console.log(123)
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
  },


  //伸缩
  tap1: function () {
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

  //不喜欢
  activeorder: function (e) {
    let thisIdx = e.target.dataset.index;
    console.log(thisIdx);
    let playStatus = "flavorList[" + thisIdx + "].flavor";
    this.setData({
      [playStatus]: !this.data.flavorList[thisIdx].flavor
    });
  },

  //加菜
  adddish: function (e) {//加菜函数
    var newIndex = e.target.dataset.index
    let curDish = this.data.navList[newIndex]
    let that = this
    //console.log(curDish)
    wx.cloud.callFunction({
      name: "addDish",
      data:
      {
        roomid: that.data.roomid,
        pname: app.globalData.openid,
        did: curDish._id,
        dname: curDish.dishName,
        dprice: curDish.dishPrice,

      },
      success: function (res) {
        console.log("加菜操作完成一次")
      },
      fail: console.error
    })
  },

  //减菜
  subdish(e) {//减菜函数
    let newIndex = e.target.dataset.index
    let curDish = this.data.navList[newIndex]
    let that = this
    //console.log(curDish)
    wx.cloud.callFunction({
      name: "deleteDish",
      data:
      {
        did: curDish._id,
        roomid: that.data.roomid,
        pname: app.globalData.openid,
      },
      success: function (res) {
        console.log("减菜操作完成一次")
      },
      fail: console.error
    })
  },

  //获取菜单
  getMenu: function (e) {
    var that = this
    var navList = that.data.navList
    wx.cloud.callFunction({
      name: 'getMenu',
      data: {},
      success: function (res) {
        //将res数组传入data的navList中
        //navList.splice(0, 1)
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

  //监听点菜表的函数
  initWatcher: function (e) {
    const that = this;
    // console.log("watcher", )
    watcher = db.collection(that.data.roomid).watch({
      onChange: function (snapshot) {
        console.log(snapshot)
        wx.cloud.callFunction({
          name: 'getOrder',
          data: {
            roomid: that.data.roomid
          },
          success: function (res) {
            //将res数组传入data的navList中

            that.data.orderedList = []
            that.setData({ orderedList })
            let orderedList = []
            for (let i = 0; i < res.result.data.length; i++) {
              orderedList.push(res.result.data[i])
              that.setData({ orderedList })
            }
            /*
            that.data.orderedList = res.result.data
            that.setData({orderedList})
            */
          },
          fail: console.error
        })
      },
      onError(err) {
        console.error(err)
      }
    })
  },

  // 设置roomid
  setRoomId: function () {
    let that = this
    wx.cloud.callFunction({
      name: 'newroom'
    }).then(res => {
      console.log("roomid", res.result);
      // this.data.roomid = res.result
      console.log('the roomid', res.result);
      that.setData({
        roomid: res.result
      });
      that.initWatcher(); //启动点菜监听
    })
  },

  //创建或加入房间
  createOrJoinRoom: function (options) {
    if (JSON.stringify(options) == '{}') {
      console.log("options==null")
      // 自己创建房间
      this.setRoomId();
    } else {
      // 好友分享
      this.setData({
        roomid: options.roomid
      });
    }
  },

  // 获取用户openid
  onGetOpenid: function () {
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  //获取用户设置
  getSettings: function (e) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  //获取用户名称和头像
  onGetUserInfo: function (e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onGetOpenid();   //获取用户openid
    this.createOrJoinRoom(options)  //创建或加入房间
    console.log('a roomid', this.data.roomid);
    this.getMenu()      //加载菜单
    this.getSettings()  //获取登录头像和id
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


  onShareAppMessage: function () {
    return {
      title: `房间-${this.data.roomid}`,
      path: `pages/index/index?roomid=${this.data.roomid}`.toString(),
    }
  }
})