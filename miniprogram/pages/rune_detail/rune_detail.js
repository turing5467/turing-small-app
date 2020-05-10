// pages/rune_detail/rune_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rune: {},
    cur_rune: {},
    text: ['jishi','rune_1','rune_2','rune_3']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const this_ = this;
    var page = getCurrentPages();
    var index = page[page.length - 1].options.index;
    wx.cloud.callFunction({
      name: 'getRune',
      data: {
        index
      },
      success(res) {
        console.log(res)
        this_.setData({rune: res.result})
      }
    })
    
  },

  show_desc_box(e) {
    let obj = e.currentTarget.dataset.obj;
    console.log(obj)
    this.setData({cur_rune: obj})
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