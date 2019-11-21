// componet/myjikou/myjikou.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show1: false,
    show2: true,
    animationdata2: null,
    animationdata1: null,
    Jikou_List:[
      { name: '不吃',choose:["香菜","葱"]},
      { name: '辣度', choose: ["不辣", "微辣", "中辣", "爆辣", "爆辣", "爆辣"]},
      { name: '甜度', choose: ["香菜", "葱"]},
      { name: '。。。',}
    ],

    Jikouname:'',
  },


  /**
   * 组件的方法列表
   */
  methods: {
    showModal(e) {
      this.setData({

        modalName: e.currentTarget.dataset.target
      })
    },
    hideModal(e) {
      this.setData({
        modalName: null
      })
    },
    tap2: function () {
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
      animation1.translateX(0).opacity(1).step();

      if (this.data.show1 == true) {
        this.setData({
          animationdata2: animation2.export(),
        })
      } else {
        this.setData({
          animationdata2: animation1.export(),
        })
      }
    }

  }
})
