// pages/sort/sort.js
var request = require('../../utils/request.js')
var API_getBanners = "jfbs/jfbs1001/getBanners.do?";
var API_queryClassify = "/jfsh/jfsh1001/queryClassify.do?";
var app = getApp();

Page({
  data: {
    currentTab: 0,  //对应样式变化
    scrollTop:0,  //用作跳转后右侧视图回到顶部
    screenArray:[], //左侧导航栏内容
    screenId:"",  //后台查询需要的字段
    childrenArray:[], //右侧内容
  },
  
  onLoad: function (options) {
    var that = this;
    //获得分类筛选
    request.sendRrquest(API_queryClassify, 'POST', { flag: 0 }, )
      .then(function (res) {
        console.log("返回数据：");
        var screenArray = res.data.data.screenArray;
        var screenId = screenArray[0].screenId;
        that.setData({
          screenArray: screenArray,
          screenId: screenId,
        })
        console.log(screenArray);
        request.sendRrquest(API_queryClassify, 'POST', { flag:1, screenId:screenId }, )
          .then(function (res) {
            console.log("返回数据：");
            that.setData({
              childrenArray: res.data.data.screenArray[0],
            })
            console.log(that.data.childrenArray);
          }, function (error) {console.log("返回失败");});
      }, function (error) {
        wx.showModal({
          title: '提示',
          content: '网络错误',
          showCancel:false,
        })
      });
  },

  navbarTap:function(e){
    var that = this;
    console.log(e);
    this.setData({
      currentTab: e.currentTarget.id,   //按钮CSS变化
      screenId: e.currentTarget.dataset.screenid,
      scrollTop: 0,   //切换导航后，控制右侧滚动视图回到顶部
    })
    //刷新右侧内容的数据
    var screenId = this.data.screenId;
    request.sendRrquest(API_queryClassify, 'POST', { flag: 1, screenId: screenId }, )
      .then(function (res) {
        console.log("返回数据：");
        that.setData({
          childrenArray: res.data.data.screenArray[0],
        })
        console.log(that.data.childrenArray);
      }, function (error) { console.log("返回失败"); });
  },

  //点击商品后跳转到搜索结果页
  ToSearchResult: function (e) {
    var key = e.currentTarget.id;
    console.log(key);
    wx.navigateTo({
      url: '../index/search/result/result?q=' + key,
    });
    app.SearchData.push(key)
    app.SearchData = app.removeDuplicatedItem(app.SearchData)
    wx.setStorageSync('SearchData', app.SearchData)
  },
  
  //顶部搜索栏点击事件
  ToSearch: function () {
    wx.navigateTo({
      url: '../index/search/search',
    })
  },

  //页面设置转发
  onShareAppMessage: function () {
    return {
      title: '君享环球，您身边的品质生活专家',
      path: 'pages/index/index',
    }
  },
})