// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let id = event.id;
  
  const res = await db.collection('hero-info').where({fileName: id+'.js'}).get();

  return {
    detail: res.data[0]
  }
}