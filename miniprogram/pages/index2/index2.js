//全局变量
const app = getApp()
const db = wx.cloud.database()
Page({

  data: {
    roomid: "0",
    isShowToast: false,
    active: 0,
    activeNames: ['0'],
    indextrue: "所有",
    imageheight: 0,
    imagewidth: 0,
    dishindexs: [
      { name: "所有" },
      { name: "风味菜肴" },
      { name: "招牌菜" },
      { name: "主食" },
      { name: "小食" },
      { name: "甜品" },
      { name: "田园蔬菜" },
    ],
    dishCount: [],    //{key:_id, value: count}
    navList: [],
    flavorList: [{ flavor: false }, { flavor: false }],


    currentIndexNav: 0,

  },
  //弹出条
  showToast: function () {

    var _this = this;

    // toast时间

    _this.data.count = parseInt(_this.data.count) ? parseInt(_this.data.count) : 3000;

    // 显示toast

    _this.setData({

      isShowToast: true,

    });

    // 定时器关闭

    setTimeout(function () {

      _this.setData({

        isShowToast: false

      });

    }, _this.data.count);

  },

  //弹出示例程序

  clickBtn: function () {

    console.log("你点击了按钮")

    //设置toast时间，toast内容

    this.setData({

      count: 1500,

      toastText: '蔡昊不喜欢了杨枝甘露'

    });

    this.showToast();

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
  adddish: function (e) {
    var newIndex = e.target.dataset.index
    let curDish = this.data.navList[newIndex]
    let that = this
    console.log(curDish)
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

  //获取屏幕宽高
  imageLoad() {

    this.setData({

      imageheight: wx.getSystemInfoSync().windowHeight,
      imagewidth: wx.getSystemInfoSync().windowWidth
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

  setRoomId: function () {
    let that = this
    wx.cloud.callFunction({
      name: 'newroom'
    }).then(res => {
      console.log("roomid", res.result);
      // this.data.roomid = res.result
      that.setData({
        roomid: res.result
      });
      console.log('before change glabaldata', app.globalData.roomid);
      app.globalData.roomid = res.result;
      console.log('change glabaldata', app.globalData.roomid);
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
      app.globalData.roomid = options.roomid;
    }
    this.initWatcher()  //初始化监听器
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

  //初始化监听器
  initWatcher: function (e) {
    const that = this
    let dishCount = that.data.dishCount
    db.collection(that.data.roomid).watch({
      onChange: function (snapshot) {
        console.log(snapshot.docChanges)
        for (let i = 0; i < snapshot.docChanges.length; i++) {
          if (snapshot.docChanges[i].dataType == "remove")
            dishCount[snapshot.docChanges[i].doc.dishID] -= 1
          else if (snapshot.docChanges[i].dataType == "add" || snapshot.docChanges[i].dataType == "init")
            dishCount[snapshot.docChanges[i].doc.dishID] += 1
        }

        that.setData({ dishCount })
      },
      onError(err) {
        console.error(err)
      }
    })
  },

  //初始化菜量
  initDishCount: function (e) {
    let dishCount = this.data.dishCount
    for (let i = 0; i < 100; i++) {
      dishCount.push(0)
      this.setData({ dishCount })
    }
  },

  onLoad: function (options) {
    //设置像素大小
    this.imageLoad();//获取屏幕大小
    let ratio = 750 / this.data.imagewidth;
    this.setData({

      imageheight: this.data.imageheight * ratio,
      imagewidth: this.data.imagewidth * ratio
    })
    this.onGetOpenid();   //获取用户openid
    this.getMenu()      //加载菜单
    this.initDishCount()  //初始化dishCount
    this.getSettings()  //获取登录头像和id
    this.createOrJoinRoom(options)  //创建或加入房间

  },


  onShareAppMessage: function () {
    return {
      title: `房间-${this.data.roomid}`,
      path: `pages/index2/index2?roomid=${this.data.roomid}`.toString(),
    }
  },
})