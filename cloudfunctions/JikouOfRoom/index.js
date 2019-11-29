// 云函数入口文件
const cloud = require('wx-server-sdk');
cloud.init();

const db = cloud.database();
const flavour = db.collection('rooms');
const _ = db.command;

exports.main = async (event, context) => {
  console.log("event", event);
  let field = event.choose.name1;
  let inc;
  if(event.choose.checked === false)
    inc = 1;
  else
    inc = -1;

  if(field == '香菜')
    return await flavour.where({roomid: event.roomid}).limit(1).update({
      data: {
        香菜: _.inc(inc)
      }
    }).then(res => {
      console.log('update successfully', res);
    }).catch(res => {
      console.log('update fail', res);
    });
  else if (field == '葱')
    return await flavour.where({ roomid: event.roomid }).limit(1).update({
      data: {
        葱: _.inc(inc)
      }
    }).then(res => {
      console.log('update successfully', res);
    }).catch(res => {
      console.log('update fail', res);
    });
  else if (field == '豆制品')
    return await flavour.where({ roomid: event.roomid }).limit(1).update({
      data: {
        豆制品: _.inc(inc)
      }
    }).then(res => {
      console.log('update successfully', res);
    }).catch(res => {
      console.log('update fail', res);
    });
  else if (field == '大蒜')
    return await flavour.where({ roomid: event.roomid }).limit(1).update({
      data: {
        大suan: _.inc(inc)
      }
    }).then(res => {
      console.log('update successfully', res);
    }).catch(res => {
      console.log('update fail', res);
    });
  else if (field == '不辣')
    return await flavour.where({ roomid: event.roomid }).limit(1).update({
      data: {
        不辣: _.inc(inc)
      }
    }).then(res => {
      console.log('update successfully', res);
    }).catch(res => {
      console.log('update fail', res);
    });
  else if (field == '微辣')
    return await flavour.where({ roomid: event.roomid }).limit(1).update({
      data: {
        微辣: _.inc(inc)
      }
    }).then(res => {
      console.log('update successfully', res);
    }).catch(res => {
      console.log('update fail', res);
    });
  else if (field == '中辣')
    return await flavour.where({ roomid: event.roomid }).limit(1).update({
      data: {
        中辣: _.inc(inc)
      }
    }).then(res => {
      console.log('update successfully', res);
    }).catch(res => {
      console.log('update fail', res);
    });
  else if (field == '重辣')
    return await flavour.where({ roomid: event.roomid }).limit(1).update({
      data: {
        重辣: _.inc(inc)
      }
    }).then(res => {
      console.log('update successfully', res);
    }).catch(res => {
      console.log('update fail', res);
    });
  else if (field == '爆辣')
    return await flavour.where({ roomid: event.roomid }).limit(1).update({
      data: {
        爆辣: _.inc(inc)
      }
    }).then(res => {
      console.log('update successfully', res);
    }).catch(res => {
      console.log('update fail', res);
    });
  else if (field == '正常甜')
    return await flavour.where({ roomid: event.roomid }).limit(1).update({
      data: {
        正常甜: _.inc(inc)
      }
    }).then(res => {
      console.log('update successfully', res);
    }).catch(res => {
      console.log('update fail', res);
    });


  // if (event.type == 'spicy') {
  //   await flavour.doc(event._id).update({
  //     data: {
  //       noSpicy: _.inc(event.inc)
  //     }
  //   }).then(res => {
  //     console.log('update successfully', res);
  //   }).catch(res => {
  //     console.log('update fail', res);
  //   });
  // } else if (event.type == 'onion') {
  //   await flavour.doc(event._id).update({
  //     data: {
  //       noOnion: _.inc(event.inc)
  //     }
  //   }).then(res => {
  //     console.log('update successfully', res);
  //   }).catch(res => {
  //     console.log('update fail', res);
  //   });
  // } else if (event.type == "addroom") {
  //   var nok = 1;
  //   var roomid_;
  //   while (nok) {
  //     roomid_ = Math.floor(Math.random() * 10000).toString();
  //     console.roomid_;
  //     await flavour.where({ roomid: roomid_ }).count().then(res => {
  //       console.log(res.total);
  //       if (res.total == 0) {
  //         nok = 0;
  //       }
  //     }).catch(res => {
  //       console.log("count", res);
  //     });
  //   }
  //   await flavour.add({ data: { roomid: roomid_, noSpicy: 0, noOnion: 0 } }).then(res => {
  //     console.log('add successfully', res);
  //   }).catch(res => {
  //     console.log("add fail", res);
  //   });
  //   return roomid_;
  // }
}