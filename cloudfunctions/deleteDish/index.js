// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

let db = cloud.database()

exports.main = async (event, context) => {
  // return await db.collection('order').doc('05a1947c5dd4f0a301a1d6373a63cb50').remove();
}