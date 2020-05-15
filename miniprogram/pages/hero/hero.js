// pages/hero/hero.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heroList: [],
    height: '100px',
    item_height: '150px',
    roles: [
      ['fighter','战士'],
      ['mage','法师'],
      ['assassin','刺客'],
      ['tank','坦克'],
      ['marksman','射手'],
      ['support','辅助']
    ],
    showCheckBox: true,
    screenHeight: '',
  },

  _observer: null,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    const this_ = this;


    //获取英雄列表
    wx.cloud.callFunction({
      name: 'getHeroList',
      success: (res) => {
        let heroList = (res.result).map(ele => {
          //图片show属性初始化
          return {...ele, show: false}
        })
        this_.setData({heroList}, this.lazyload);
        
      }, 
      fail: (err) => {
        console.error
      }
    })
    

    //设置图片高度，即item高度
    var query = wx.createSelectorQuery();
    // let this_ = this;
    query.select('.search-input').boundingClientRect((rect) => {
      this_.setData({
        height: (rect.width * 0.33-10) + 'px',
        item_height: (rect.width * 0.33 +40) + 'px'
      })
    }).exec();
  },

  lazyload() {
    const this_ = this;
    let heroList = this.data.heroList;

    this_._observer && this_._observer.disconnect()

    let observer = wx.createIntersectionObserver(this, {
      // 阈值设置少，避免触发过于频繁导致性能问题
      thresholds: [1],
      // 监听多个对象
      observeAll: true
    });
    observer.relativeToViewport({
      bottom: 100
    }).observe('.hero-image', (ret) => {
      if (ret.intersectionRatio > 0) {
        let index = ret.dataset.index
        heroList[index].show = true;
        this_.setData({ heroList });
      }
    })

    this_._observer = observer;
  
  },

  //跳转至英雄详情页
  switchPage(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../hero_detail/hero_detail?id='+id,
    })
  },

  //搜索
  search(e) {
    let this_ = this
    let searchWord = e.detail.value;
    wx.cloud.callFunction({
      name: 'getHeroList',
      data: {
        searchWord
      },
      success(res) {
        let heroList = (res.result).map(ele => {
          return {...ele, show:true}
        })
        this_.setData({heroList})
      }
    })
    if (searchWord === '') {
      this_.setData({ showCheckBox: true})
    }else{
      this_.setData({ showCheckBox: false })
    }
  },

  //选择英雄角色
  roleChange(e) {
    let roles = e.detail.value;
    let this_ = this;
    wx.cloud.callFunction({
      name: 'getHeroList',
      data: {
        roles
      },
      success(res) {
        let heroList = (res.result).map(ele => {
          return { ...ele, show: false }
        })
        
        this_.setData({ heroList }, this_.lazyload);
      }
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})