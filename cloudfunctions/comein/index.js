// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()

const db = cloud.database();
const rooms = db.collection('rooms');
const _ = db.command;
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  var roomid_=event.roomid;  
  await rooms.where({roomid:roomid_}).update({data: {
    num: _.inc(1)
  }}).then(res=>{
    console.log(res);
  }).catch(err=>{
    console.log(err);
  });
  var num_;
  const result = await rooms.where({ roomid: roomid_ }).get().then(res => {
    console.log(res.data[0].num);
    num_ = res.data[0].num;
  });
  return num_;
}