var that;
var watcher;
const db = wx.cloud.database();
var roomCollection;
const app = getApp();

Page({
  data: {
    roomid: "",    // 房间号
    num: 0,       // 房间人数 
    all_price: 100,
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
      { name: "田园蔬菜" },],
    currentIndexNav: 0,
    show1: false,
    show2: true,
    animationdata1: null,
    animationdata2: null,
    spiceList: [//种类列表
      {
        id: 1,
        name: '招牌菜'
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

    dish: [//已点菜
      { id: "1", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品", peoplename: "帅哥" },
      { id: "2", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "凉菜", peoplename: "帅哥" },
      { id: "3", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品", peoplename: "帅哥" },
      { id: "4", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品", peoplename: "帅哥" },
      { id: "5", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品", peoplename: "帅哥" },
      { id: "6", name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品", peoplename: "帅哥" },
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

  onLoad: function (options) {
    that = this;
    //设置像素大小
    this.imageLoad();
    let ratio = 750 / this.data.imagewidth;
    this.setData({

      imageheight: this.data.imageheight * ratio,
      imagewidth: this.data.imagewidth * ratio
    })

    if (JSON.stringify(options) == '{}') {
      console.log("new room")
      // 自己创建房间
      that.setRoomId();
      console.log('after setroomid');
    } else {
      // 好友分享
      this.setData({
        roomid: options.roomid
      });
      app.globalData.roomid = options.roomid;
      // 更新房间人数
      wx.callFunction({ name: 'comein', data: { roomid: this.data.roomid } }).then(res => {
        console.log('房间人数', res.result);
        that.setData({
          num: res.result
        });
        app.globalData.num = res.result;
        console.log('change glabaldata', app.globalData.num);
      });
    }
    roomCollection = db.collection(this.data.roomid);

    // 需要对这个room表做监听操作

  },

  onUnload: function (options) {
    wx.cloud.callFunction({ name: 'leaveroom', data: { roomid: that.data.roomid } }).then(res => {
      console.log('某人离开，人数：', this.data.num);
      that.setData({
        num: res.result
      });
      app.globalData.num = res.result;
    });
  },

  onShow: function () {
    this.setData({
      room_id: app.globalData.roomid,
      num: app.globalData.num
    })
  },
  onShareAppMessage: function () {
    return {
      title: `房间-${this.data.roomid}`,
      path: `pages/index/index?roomid=${this.data.roomid}`.toString(),

    }
  }

})