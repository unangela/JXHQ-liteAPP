// shippinglist.js
var request = require('../../../utils/request.js')
var app = getApp();
var API_URL = 'jfsh/jfsh1001/queryBody.do?';
Page({
  data: {
    goodsList:[]
  },

  onLoad: function (params) {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    console.log(params);

    request.sendRrquest(API_URL, 'GET', { bodyId: params.id }, )
      .then(function (res) {
        console.log("返回数据：");
        console.log(res);
        var data = res.data.data;
        that.setData({
          goodsList: data.bodyList
        });
        wx.hideLoading();
      }, function (error) {
        wx.showModal({
          title: '提示',
          content: '网络错误',
          showCancel: false,
        })
      });
  },

  ToShop:function(e){
    console.log(e);
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: '/pages/shopping/shopping?id=' + id,
    })
  }//跳转到商品详情界面

})