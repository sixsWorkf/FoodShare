var that;
var watcher;
const db = wx.cloud.database();
var roomCollection;

Page({
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
      { name: "田园蔬菜" },],
      
    roomid:"",    // 房间号
    num: 0,       // 房间人数 
    currentIndexNav: 0,
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


  onLoad: function (options) {
    that = this;
    if (JSON.stringify(options) == '{}') {
      console.log("options==null")
      // 自己创建房间
      this.setRoomId();
    } else {
      // 好友分享
      this.setData({
        roomid: options.roomid
      });
      // 更新房间人数
      wx.callFunction({name:'comein', data:{roomid: this.data.roomid}}).then(res=>{
        console.log('房间人数',res.result);
        that.setData({
          num: res.result
        });
      });
    }
    roomCollection = db.collection(this.data.roomid);

    // 需要对这个room表做监听操作

  },

  onUnload:function(options){
    wx.cloud.callFunction({name:'leaveroom', data:{roomid: that.data.roomid}}).then(res=>{
      console.log('某人离开，人数：', this.data.num);
      that.setData({
        num:res.result
      });
    });
  },
  onShareAppMessage: function () {
    return {
      title: `房间-${this.data.roomid}`,
      path: `pages/index/index?roomid=${this.data.roomid}`.toString(),

    }
  },
  setRoomId:function(){
    wx.cloud.callFunction({
      name: 'newroom'
    }).then(res => {
      console.log("roomid", res.result);
      // set roomid
      that.setData({
        roomid: res.result,
        num:1
      });
    })
  }
})