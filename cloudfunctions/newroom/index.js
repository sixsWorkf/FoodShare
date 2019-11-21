// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database();
const rooms = db.collection('rooms');
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()

  var nok = 1;
  var roomid_;
  // 查找没分配的roomid
  while (nok) {
    roomid_ = Math.floor(Math.random() * 10000).toString();
    await rooms.where({ roomid: roomid_ }).count().then(res => {
      console.log(res.total);
      if (res.total == 0) {
        nok = 0;
      }
    }).catch(res => {
      console.log("count", res);
    });
  }
  // 增加房间记录
  await rooms.add({ data: { roomid: roomid_, num:1 } }).then(res => {
    console.log('add successfully', res);
  }).catch(res => {
    console.log("add fail", res);
  });
  // 创建新的数据库，存放这个房间的点菜记录
  await db.createCollection(roomid_);

  return roomid_;
}