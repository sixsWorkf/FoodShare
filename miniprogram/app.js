//app.js
App(
  {
    globalData: {
      roomid: '0',
    },
    onGetInfo: function () {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log('[云函数] [login] user openid: ', res.result.openid)
          this.globalData.openid = res.result.openid
          this.toLogin()
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
    },


    toLogin: function () {
      var that = this;
      wx.getUserInfo({
        withCredentials: true,
        success: function (res) {
          //此处为获取微信信息后的业务方法
          console.log(res)
          that.globalData.avatarUrl = res.userInfo.avatarUrl
          that.globalData.nickName = res.userInfo.nickName
          console.log(that)
          wx.cloud.callFunction({
            name: 'addPerson',
            data:
            {
              roomid_members: "0000.members",
              openid: that.globalData.openid,
              avatarUrl: that.globalData.avatarUrl,
            },
            success: function (res) {
              console.log("房间加入一人")
            },
            fail: console.error
          })
        },

        fail: function () {
          //获取用户信息失败后。请跳转授权页面
          wx.showModal({
            title: '警告',
            content: '尚未进行授权，请点击确定跳转到授权页面进行授权。',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.navigateTo({
                  url: '../tologin/tologin',
                })
              }
            }
          })
        }
      }
      )
    },

    onLaunch: function () {
      if (!wx.cloud) {
        console.error('请使用 2.2.3 或以上的基础库以使用云能力')
      } else {
        wx.cloud.init({
          // env 参数说明：
          //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
          //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
          //   如不填则使用默认环境（第一个创建的环境）
          // env: 'my-env-id',
          traceUser: true,
        })
      }
      this.onGetInfo()
    }

  })
