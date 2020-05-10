// pages/hero_detail/hero_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hero: {heroId: 1},
    spells: [],
    roles: [],
    curindex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const this_ = this;
    var page = getCurrentPages();
    var id = page[page.length-1].options.id;
    wx.cloud.callFunction({
      name: 'getHeroDetail',
      data: {
        id
      },
      success: function(res) {
        let hero = res.result.detail.hero;
        let spells__ = res.result.detail.spells;
        let spells_ = [];
        spells_[0] = spells__.find(ele => ele.spellKey==='passive');
        spells_[1] = spells__.find(ele => ele.spellKey==='q');
        spells_[2] = spells__.find(ele => ele.spellKey==='w');
        spells_[3] = spells__.find(ele => ele.spellKey==='e');
        spells_[4] = spells__.find(ele => ele.spellKey==='r');
        let roles = hero.roles.map(ele => {
          switch(ele) {
            case 'fighter': return '战士'
            case 'mage': return '法师'
            case 'assassin': return '刺客'
            case 'tank': return '坦克'
            case 'marksman': return '射手'
            case 'support': return '辅助'
          }
        })
        let spells = spells_.map(ele => {
          return {...ele, description: ele.description.replace(/<br>/g, '\n')}
        })

        this_.setData({
          hero, spells, roles
        });
      }
    })
  },

  switchSpell(e) {
    let curindex = e.currentTarget.dataset.curindex;
    this.setData({curindex})
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