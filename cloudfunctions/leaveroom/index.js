// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database();
const rooms = db.collection('rooms');
const _ = db.command;

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var roomid_ = event.roomid;
  // 减少房间人数
  await rooms.where({ roomid: roomid_ }).update({
    data: {
      num: _.inc(-1)
    }
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
  // 获取房间人数
  var num_;
  const result = await rooms.where({ roomid: roomid_ }).get().then(res => {
    console.log(res.data[0].num);
    num_ = res.data[0].num;
  });
  // 当房间没有人，销毁房间记录
  if(num_<=0){
    await rooms.where({ roomid: roomid_ }).remove();
  }
  return num_;
}