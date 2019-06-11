// pages/view/index.js
import $utils from '../../utils/index';

const pageSize = 10;
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    id: 0,
    datas: [],
  },
  loading: false,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    if (options.id != undefined) {
      that.setData({
        id: options.id
      });
      that.getList();
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  linkHome() {
    wx.redirectTo({
      url: '../list/index'
    });
  },
  /**
   * 复制
   */
  onCopy(e) {
    console.log(e.currentTarget.dataset.copy);
    wx.setClipboardData({
      data: e.currentTarget.dataset.copy,
      success: function(res) {

      }
    });
  },

  /**
   * 获取神评列表
   */
  getList() {
    let that = this;
    wx.request({
      url: 'https://apis.dahuotu.com/comments.json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        $utils.datasStorageSync('COMMENTS_DATAS', JSON.stringify(res.data.datas));
        that.setData({
          datas: [res.data.datas[that.data.id - 1]]
        });
      }
    });
  },
})