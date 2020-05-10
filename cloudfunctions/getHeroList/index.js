// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database();
const _ = db.command;
const MAX_LIMIT = 100;

// 云函数入口函数
exports.main = async (event, context) => {
  let searchWord = event.searchWord;
  let roles = event.roles;
  if(searchWord) {
    let res = await db.collection('hero').where(_.or([
      {
        name: db.RegExp({
          regexp: '.*' + searchWord,
          options: 'i'
        })
      },
      {
        title: db.RegExp({
          regexp: '.*' + searchWord,
          options: 'i'
        })
      },
      {
        alias: db.RegExp({
          regexp: '.*' + searchWord,
          options: 'i'
        })
      }
    ])).get();
    return res.data;
  }else if(roles){
    let res = null;
    res = await db.collection('hero').where(_.and(roles.map(ele => {
      return {
        roles: ele
      }
    }))).get();
    return res.data;
  }else {
    let res = await db.collection('hero').limit(MAX_LIMIT).get();
    let res_ = await db.collection('hero').skip(MAX_LIMIT).limit(MAX_LIMIT).get();
    let heroList = (res.data).concat(res_.data)
    return heroList;
  }
}

