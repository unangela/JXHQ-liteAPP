var request = require('../../../utils/request.js')
var API_URL = 'jfsh/jfsh1001/queryHotWords.do'
var app = getApp();
Page({
  data: {
    inputValue: '',
    hotWordsArray:[],
    getSearch:[],
    HisHidden:'',//历史搜索词是否隐藏
  },
  onShow:function(){
    //从缓存中获得的历史搜索词
    var getSearch = wx.getStorageSync('SearchData')
    var that = this
    this.setData({
      getSearch : getSearch,
    })

    //判断是否需要显示历史搜索词
    if (this.data.getSearch.length == 0) {
      that.setData({
        HisHidden: 'true',
      })
    }else{
      that.setData({
        HisHidden: '',
      })
    }

    //获取热搜词
    request.sendRrquest(API_URL, 'GET', )
    .then(function (res) {
        console.log("返回数据：");
        console.log(res.data)
        var data = res.data.data
        that.setData({
          hotWordsArray: data.hotWordsArray
        })
      },function (error) {
        wx.showModal({
          title: '提示',
          content: '网络错误',
          showCancel: false,
        })
      });
  },

  SearchClick: function (e) {
    var that = this
    that.setData({
      inputValue: e.detail.value,
    });
    var inputValue = that.data.inputValue;
    //判断用户输入是否有效，传递参数进行搜索
    if (inputValue.replace(/\s/g, "").length !== 0) {
      console.log('inputValue=', inputValue),
      wx.navigateTo({
        url: '../search/result/result?q='+inputValue,
      });
      app.SearchData.push(that.data.inputValue)
      app.SearchData = app.removeDuplicatedItem(app.SearchData)
      wx.setStorageSync('SearchData', app.SearchData) 
    }
    else {
      console.log('inputValue=', inputValue);
      wx.showModal({
        title: '提示',
        content: '请输入关键字进行搜索',
        showCancel: false
      });
    } 
  },

  //删除历史缓存，需要隐藏历史搜索栏
  DeleteSearchData:function(e){
    app.SearchData.splice(0, app.SearchData.length)
    wx.setStorageSync('SearchData', app.SearchData)
    this.data.getSearch = wx.getStorageSync('SearchData')
    this.setData({
      HisHidden : "true"
    })
  },

  //点击关键词后直接传参到搜索页面
  ToSearch:function(e){
    var inputValue = e.currentTarget.id;
    wx.redirectTo({
      url: '../search/result/result?q=' + inputValue,
    });
    app.SearchData.push(inputValue)
    app.SearchData = app.removeDuplicatedItem(app.SearchData)
    wx.setStorageSync('SearchData', app.SearchData)
  },

  //返回主页
  ToHome: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})