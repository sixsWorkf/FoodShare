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
    animationdata1: null,
    animationdata2: null,
    Jikou_List:[
      { name: '不吃',choose:["香菜","葱"]},
      { name: '辣度', choose: ["不辣", "微辣", "中辣", "爆辣", "爆辣", "爆辣"]},
      { name: '甜度', choose: ["香菜", "葱"]},
      { name: '。。。',}
    ],

    list: [{ title: "题目1", content: "内容1" },
    { title: "题目2", content: "内容2" },
    { title: "题目3", content: "内容3" },
    { title: "题目4", content: "内容4" }],

    navList: [
      {
        id: 1,
        name: '热销菜品',
        price: 12,
        count: 1
      },
      {
        id: 2,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 3,
        name: '凉菜',
        price: 12,
        count: 1
      },
      {
        id: 4,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 5,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 6,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 7,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },
      {
        id: 8,
        name: '热菜',
        price: 12,
        count: 1
      },

    ],
  },
  invite() {
    console.log("invite")
  },
  activeNav(e) {
    // console.log(123)
    this.setData({
      currentIndexNav: e.target.dataset.index
    })
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
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
      animation2.translateX(216).opacity(1).step();

      var animation1 = wx.createAnimation({
        duration: 1000,
        timingFunction: "ease",
        delay: 0,
        transformOrigin: "50% 50%",
      })
      animation1.translateX(-10).opacity(1).step();

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
