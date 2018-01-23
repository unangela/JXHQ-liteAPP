//index.js
var request = require('../../utils/request.js')
var API_getBanners = "jfbs/jfbs1001/getBanners.do?";
var API_queryClassify = "/jfsh/jfsh1001/queryClassify.do?";
var app = getApp();
Page({
  data: {
    bannerInfos1:[],
    swiperCurrent:0,
  },
  //打开搜索界面
  ToSearch: function () {
    wx.navigateTo({
      url: 'search/search',
    })
  },
  onLoad: function (options) {
    var that = this;
    //获得主页banner
    request.sendRrquest(API_getBanners, 'GET', { contentType: 50 }, )
      .then(function (res) {
        console.log("返回数据：");
        console.log(res);
        var bannerInfos = res.data.data.contentTypeList[0].bannerInfos
        that.setData({
          bannerInfos1: bannerInfos,
        })
      }, function (error) {
        wx.showModal({
          title: '提示',
          content: '网络错误',
          showCancel: false,
        })
      });
  },
  
  //首页banner播放
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    },
    )
  },
  //界面设置转发
  onShareAppMessage: function () {
    return {
      title: '君享环球，您身边的品质生活专家',
      path: 'pages/index/index',
    }
  },
})













































/*第一版废弃代码
Page({
  data: {
    bannerInfos1: [],
    bannerInfos2: [],
    bannerInfos3: [],
    swiperCurrent: 0,
    article_data:[],
  },

  onLoad: function() {
    var that = this;
    request.sendRrquest(API_getBanners, 'GET', { contentType:50 }, )
      .then(function (res) {
        console.log("返回数据：");
        console.log(res);
        var bannerInfos = res.data.data.contentTypeList[0].bannerInfos
        that.setData({
          bannerInfos1: bannerInfos,
        })
        console.log(bannerInfos);
      }, function (error) {
        console.log("返回失败：");
        console.log(error);
      });//获得主页banner

    request.sendRrquest(API_getBanners, 'GET', { contentType: 51 }, )
      .then(function (res) {
        console.log("返回数据：");
        console.log(res);
        var bannerInfos = res.data.data.contentTypeList[0].bannerInfos
        that.setData({
          bannerInfos2: bannerInfos,
        })
        console.log(bannerInfos);
      }, function (error) {
        console.log("返回失败：");
        console.log(error);
      });//获得首页分类

    request.sendRrquest(API_getBanners, 'GET', { contentType: 52 }, )
      .then(function (res) {
        console.log("返回数据：");
        console.log(res);
        var bannerInfos = res.data.data.contentTypeList[0].bannerInfos
        that.setData({
          bannerInfos3: bannerInfos,
        })
        console.log(bannerInfos);
      }, function (error) {
        console.log("返回失败：");
        console.log(error);
      });//获得首页活动
  },  
       
  onShareAppMessage: function () {
    return {
      title: '君享环球，您身边的品质生活专家',
      path: 'pages/index/index',
    }
  },//界面设置转发

  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
      },
    )},//首页banner播放

  ToSearch: function () {
    wx.navigateTo({
      url: 'search/search',
    })
  },//搜索栏点击打开搜索界面

  ToArticles:function() {
    wx.navigateTo({
      url: '/pages/articles/articles',
    })
  },

  ToPro:function(param) {
    var url = param.currentTarget.id
    var Myurl = url.split("?")
    var url_type = Myurl[0]
    var url_http = Myurl[1]
    var url_params = Myurl[2]

    console.log(url_type)
    console.log(url_http)

    console.log(url_params)

    if (url_type.indexOf('goodsList')>0){
      //url_params = url_params.replace(/\=/g,"%3D");
      url_params = url_params.split("=")[1]
      wx.navigateTo({
        url: '/pages/shopping/shoppinglist/shippinglist?id=' + url_params,
      })
    } else if (url_type.indexOf('customGoodsSet') > 0){
      url_params = url_params.replace(/\=/g, "%3D");
      url_params = url_params.replace(/\&/g, "%26");
      wx.navigateTo({
        url: '/pages/shopping/productslist?id=' + url_params,
      })
      console.log('customGoodsSet')
    } else if (url_type.indexOf('customArticleSet') > 0){
      console.log('customArticleSet')
    } else if (url_type.indexOf('article') > 0){
      console.log('article')
    } else if (url_type.indexOf('webPage') > 0){
      console.log('webPage')
    } else{
      console.log('error')
    }

  },//首页各个板块点击后跳转到对应界面


  ToProDetail: function () {
    wx.navigateTo({
      url: '/pages/shopping/shopping',
    })
  },

})
*/