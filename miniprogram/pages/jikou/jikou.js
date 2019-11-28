// pages/jikou/jikou.js
const app = getApp();

var watcher;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Jikou_List: [
      { name: '不吃(*╯^╰)', choose: [{ name1: "香菜", checked: false, value: 1 }, { name1: "葱", checked: false, value: 2 }, { name1: "豆制品", checked: false, value: 3 },{ name1: "大蒜", checked: false, value: 4 }] },
      { name: '辣度(#`Д´)', choose: [{ name1: "不辣", checked: false, value: 5 }, { name1: "微辣", checked: false, value: 6 }, { name1: "中辣", checked: false, value: 7 }, { name1: "重辣", checked: false, value: 8 }, { name1: "爆辣", checked: false, value: 9 }]},
      { name: '甜度(.･ω･)' ,choose: [{ name1: "正常甜", checked: false, value: 10 }]},
      { name: '。。。', choose: [{ name1: "香菜", checked: false, value: 11 }] }
    ],

    room_like:[
      { name: "不要香菜", num: 0 },
      { name: "微辣", num: 0 },
    ],
    num1: 0,    // 香菜
    num6:0,     //微辣
    roomid: app.globalData.roomid,
    people_num: app.globalData.num,

    currentIndexNav: [0],

  },

  ChooseCheckbox(e) {
    let value = e.currentTarget.dataset.value;
    let choose = this.getItem(value);
    console.log('choose', choose);
    wx.cloud.callFunction({
      name:'JikouOfRoom',
      data:{choose:choose, roomid: this.data.roomid}
    })

    // 我不知道后面在干什么
    let items = this.data.Jikou_List;
    let values = e.currentTarget.dataset.value;
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      let chooses=items[i].choose;
      for (let j = 0, lenJ = chooses.length; j < lenJ; ++j) {
        if (chooses[j].value == values) {
          chooses[j].checked = !chooses[j].checked;
          break
        }
      }

    }
    this.setData({
      Jikou_List: items
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('jikou onlaunch');
  },

  getItem:function(value){
    if(value>=1&&value<=4){
      return this.data.Jikou_List[0].choose[value-1];
    }else if(value >= 5 && value <= 9){
      return this.data.Jikou_List[1].choose[value - 5]
    }else if(value == 10){
      return this.data.Jikou_List[2].choose[value - 10]
    } else if (value == 11) {
      return this.data.Jikou_List[3].choose[value - 11]
    }
  },

  // zz
  onShareAppMessage: function () {
    return {
      title: `房间-${this.data.roomid}`,
      path: `pages/index/index?roomid=${this.data.roomid}`.toString(),
    }
  },
  onShow:function(){
    this.setData({
      roomid: app.globalData.roomid,
      num:app.globalData.num
    })
  },
  // 设置监听
  onLoad:function(){
    const flavour = wx.cloud.database().collection('rooms');
    let that = this;

    watcher = flavour.where({roomid:this.data.roomid}).limit(1).watch({
      onChange: function (snapshot) {
        console.log('snapshot.docChanges[0].doc', snapshot.docChanges[0].doc);
        that.setData({
          room_like: [{ name: "不要香菜", num: snapshot.docChanges[0].doc.香菜 }, 
            { name: "微辣", num: snapshot.docChanges[0].doc.微辣 }]
        });
        // that.pageData._id = eve._id;
        // console.log('_id', that.pageData._id)
      },
      onError: function (eve) {
        console.error('the watch closed because of error', err);
      }
    });
  },
  onUnload:function(){
    watcher.close();
  }
})