// pages/hero/hero.js
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
    showCheckBox: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const this_ = this;

    wx.cloud.callFunction({
      name: 'getHeroList',
      success: (res) => {
        this_.setData({heroList: res.result});
      }, 
      fail: (err) => {
        console.error
      }
    })

    var query = wx.createSelectorQuery();
    // let this_ = this;
    query.select('.search-input').boundingClientRect((rect) => {
      this_.setData({
        height: (rect.width * 0.33-10) + 'px',
        item_height: (rect.width * 0.33 +40) + 'px'
      })
    }).exec();
  },

  switchPage(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../hero_detail/hero_detail?id='+id,
    })
  },
  search(e) {
    let this_ = this
    let searchWord = e.detail.value;
    wx.cloud.callFunction({
      name: 'getHeroList',
      data: {
        searchWord
      },
      success(res) {
        this_.setData({heroList: res.result})
      }
    })
    if (searchWord === '') {
      this_.setData({ showCheckBox: true})
    }else{
      this_.setData({ showCheckBox: false })
    }
  },

  roleChange(e) {
    let roles = e.detail.value;
    let this_ = this;
    wx.cloud.callFunction({
      name: 'getHeroList',
      data: {
        roles
      },
      success(res) {
        this_.setData({heroList: res.result});
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