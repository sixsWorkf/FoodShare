/ pages/test/test.js

const app = getApp()

const db = wx.cloud.database()

Page({



  data: {

    roomid: "0",

    openid: "",

    checkout: 0,    //结账价格

    imageheight: 0,

    imagewidth: 0,

    active: 0,

    activeNames: ['0000'],

    indextrue: "所有",

    dishindexs: [

      { name: "我点的" },

      { name: "所有" }

    ],



    orderedDish: [] //点菜表



  },



  initWatcher: function (e) {

    const that = this

    const orderedDish = that.data.orderedDish

    let checkout = that.data.checkout

    db.collection(that.data.roomid).watch({

      onChange: function (snapshot) {

        console.log(snapshot.docChanges)

        //这边一定是加菜（因为只做了加菜的功能），所以不用分情况

        for (let i = 0; i < snapshot.docChanges.length; i++) {

          if (snapshot.docChanges[i].dataType == "init" || snapshot.docChanges[i].dataType == "add") {

            orderedDish.push(snapshot.docChanges[i].doc)

            checkout += snapshot.docChanges[i].doc.dishPrice  //加钱

          }

          else if (snapshot.docChanges[i].dataType == "remove") {

            checkout -= snapshot.docChanges[i].doc.dishPrice    //减钱

            let index = 0

            for (; index < orderedDish.length && orderedDish[index]._id != snapshot.docChanges[i].doc._id; index++) { }



            if (index == orderedDish.length) console.error

            else {

              console.log(orderedDish[index])

              orderedDish.splice(index, 1)

            }

          }

          that.setData({ orderedDish })

          that.setData({ checkout })

        }

      },

      onError(err) {

        console.error(err)

      }

    })

  },



  subdish: function (e) {

    console.log(e)

    let deleteID = e.currentTarget.dataset.index

    //console.log(curIndex)

    //let deleteID = this.data.orderedDish[curIndex]._id

    console.log(deleteID)

    let that = this

    //console.log(curDish)

    wx.cloud.callFunction({

      name: "deleteDish",

      data:

      {

        roomid: that.data.roomid,

        deleteID: deleteID,

      },

      success: function (res) {

        console.log("减菜操作完成一次")

      },

      fail: console.error

    })

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

    this.setData({ openid: app.globalData.openid })

    this.initWatcher()

  },



  onShow: function () {

    this.setData({

      roomid: app.globalData.roomid,

    })

  },



  onShareAppMessage: function () {

    return {

      title: `房间-${this.data.roomid}`,

      path: `pages/index2/index2?roomid=${this.data.roomid}`.toString(),

    }

  },

})