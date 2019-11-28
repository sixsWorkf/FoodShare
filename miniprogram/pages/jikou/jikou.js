// pages/jikou/jikou.js
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
      { name: "不要香菜", num: 6 },
      { name: "微辣", num: 4 },
    ],

    room_id: '0014',
    people_num: 12,
    currentIndexNav: [0],

  },
  ChooseCheckbox(e) {
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