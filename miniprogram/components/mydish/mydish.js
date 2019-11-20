// componet/mydish/mydish.js
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
    active: 1,
    activeNames: ['0'],
    indextrue: "所有",
    dishindexs: [
      { name: "已点"}, 
      { name: "所有" }, 
      { name: "凉菜" },
      { name: "热菜" } ,
      { name: "主食" } ,
      { name: "饮品" },
      ],
    dish:[
      { id:"1",name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2" ,dishindexs:"饮品"},
      { id: "2",name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "凉菜"},
      { id: "3",name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品"},
      { id: "4",name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品"},
      { id: "5",name: "杨枝甘露", remark: ["正常冰+半糖", "正常糖"], price: "20", num: "2", dishindexs: "饮品"},
    ],

    people:[
      {dishid:1 ,peoplename:["1","2"]},
      { dishid: 2 ,peoplename: ["3", "4"] },
    ]

  },

  /**
   * 组件的方法列表
   */
  methods: {
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
      animation2.translateX(270).opacity(1).step();

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

  },

  



})
