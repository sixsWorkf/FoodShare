// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = wx.cloud.database()
const menu = db.collection('Menu0')
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
  const countRows = await menu.count()
  const total = countRows.total
  const batchtimes = Math.ceil(total / 100)
  const tasks = []
  for (let i=0; i < batchtimes; i++){
    const promise = menu.skip(i*MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }

  return (await Promise.all(tasks)).reduce((acc, cur) => {
      return{
        data: acc.data.concat(cur.data),
        errMsg: acc.errMsg,
      }
  })
}