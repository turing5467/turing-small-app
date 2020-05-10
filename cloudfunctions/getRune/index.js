// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();


// 云函数入口函数
exports.main = async (event, context) => {
  let index = event.index;
  let rune = await db.collection('rune').get();
  if (index>=0) {
    return rune.data[index];
  }else {
    return rune;
  }
}