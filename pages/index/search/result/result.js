// result.js
var request = require('../../../../utils/request.js')
var API_queryProduct ='jfsh/jfsh1001/queryProduct.do?'
var app = getApp();
Page({
  data: {
    navbar: ['综合排序', '按销量', '按收藏', '价格降序', '价格升序'],
    currentTab: 0,
    products:["&"],
    key:"",
    orderKey:0,
  },
  
  //排序导航栏，根据不同排序规则刷新列表
  navbarTap: function (e) {
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.idx
    });
    var currentTab = that.data.currentTab;
    var orderKey; //排序规则
    if (currentTab == 0){orderKey = 0; //默认排序
    }else if (currentTab == 1){orderKey = 2; //按销量
    }else if (currentTab == 2){orderKey = 1; //按收藏
    }else if (currentTab == 3){orderKey = 3; //价格降序
    }else if (currentTab == 4){orderKey = 4; //价格升序
    }else{console.log("error")};
    that.setData({
      orderKey:orderKey
    });
    wx.showLoading({
      title: '加载中',
      mask: true,
    });
    request.sendRrquest(API_queryProduct, 'GET', { pageNum: 1, pageSize: 99, key:that.data.key, orderKey:orderKey })
      .then(function (res) {
        console.log("返回数据：");
        console.log(res.data);
        var data = res.data.data;
        that.setData({
          products: data.bodyList
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

  //onLoad
  onLoad: function (params) {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var that = this;
    var key = that.data.key = params.q
    request.sendRrquest(API_queryProduct, 'GET', { pageNum:1, pageSize:99, key:key, orderKey:0 } )
      .then(function (res) {
        console.log("返回数据：");
        console.log(res.data);
        var data = res.data.data;
        that.setData({
          products: data.bodyList
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

  //搜索功能复用，参考search.js
  SearchClick: function (e) {
    var that = this;
    that.setData({
      key: e.detail.value,
    });
    var key = that.data.key;
    var orderKey = that.data.orderKey;

    if (key.replace(/\s/g, "").length !== 0) {
      app.SearchData.push(key)
      app.SearchData = app.removeDuplicatedItem(app.SearchData)
      wx.setStorageSync('SearchData', app.SearchData)
      wx.showLoading({
        title: '加载中',
        mask: true,
      })
      request.sendRrquest(API_queryProduct, 'GET', { pageNum:1, pageSize:99, key:key, orderKey:orderKey })
        .then(function (res) {
          console.log("返回数据：");
          console.log(res.data);
          var data = res.data.data;
          that.setData({
            products: data.bodyList
          });
          wx.hideLoading();
        }, function (error) {
          wx.showModal({
            title: '提示',
            content: '网络错误',
            showCancel: false,
          })
        });
    }else{
      console.log('key=', key);
      wx.showModal({
        title: '提示',
        content: '请输入关键字进行搜索',
        showCancel: false
      });
    };
  },

  ToDetails:function(e){
    var id = e.currentTarget.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/shopping/shopping?id=' + id,
    })
  },

  ToHome:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  }
})