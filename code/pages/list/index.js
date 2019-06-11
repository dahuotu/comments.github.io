// pages/list/index.js
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getList();
    wx.showShareMenu({
      // 要求小程序返回分享目标信息
      withShareTicket: true
    });
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(ops) {
    let that = this;
    if (ops.from === 'button') {
      // 来自页面内转发按钮
      //console.log('ops:', ops.target.dataset.id)
      that.setData({
        id: ops.target.dataset.id
      });
    }
    //console.log('79,', that.data.id);
    return {
      title: '神评回复小程序',
      desc: '分享后打开即可复制文字',
      path: '/pages/view/index?id=' + that.data.id, //点击分享的图片进到哪一个页面
      success: function(res) {
        // 转发成功
        console.log("转发成功:", JSON.stringify(res));
      },
      fail: function(res) {
        // 转发失败
        console.log("转发失败:", JSON.stringify(res));
      }
    }
  },

  /**
   * 获取神评列表
   */
  getList() {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      url: 'https://apis.dahuotu.com/comments.json',
      data: {},
      header: {
        'Content-Type': 'application/json'
      },
      success: function(res) {
        $utils.datasStorageSync('COMMENTS_DATAS', JSON.stringify(res.data.datas));
        that.setData({
          datas: res.data.datas
        });
      },
      complete: function() {
        wx.hideLoading();
      }
    });
  },
  searchKeys(e) {
    let that = this;
    let keys = e.detail.value.toLowerCase();
    if (keys) {
      let tmp = [];
      for (var i = 0; i < that.data.datas.length; i++) {
        if (that.data.datas[i].content.indexOf(keys) > -1) {
          tmp.push({
            id: that.data.datas[i].id,
            content: that.data.datas[i].content
          });
        }
      }
      that.setData({
        datas: tmp
      });
    } else {
      that.setData({
        datas: JSON.parse($utils.datasStorageSync('COMMENTS_DATAS', null))
      });
    }
  }
})