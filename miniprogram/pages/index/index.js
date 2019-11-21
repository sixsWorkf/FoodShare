var that;
var watcher;
const db = wx.cloud.database();
var roomCollection;

Page({
  data: {
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