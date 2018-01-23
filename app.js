//app.js
App({
  SearchData:[],
  SearchKey:"",
  onLaunch: function() {
    var that = this;

    this.SearchData = wx.getStorageSync('SearchData') || []; //搜索栏的历史搜索缓存值    调用API从本地缓存中获取数据，如果未定义就为定义为空数组
    this.SearchKey = wx.getStorageSync('SearchKey') || "";//搜索结果页的关键字缓存

    wx.getSystemInfo({
      success: function (res) {
        that.globalData.data.device_name = res.brand,
          that.globalData.data.device_id = res.model,
          that.globalData.data.platform = res.platform,
          that.globalData.data.os_version = res.system,
          that.globalData.data.app_version = res.version
      }
    });//全局data，获取用户设备信息

  },

  removeDuplicatedItem : function (ar) {
    var ret = [];
    for (var i = 0, j = ar.length; i<j; i++) {
      if (ret.indexOf(ar[i]) === -1) {
        ret.push(ar[i]);
      }
    }return ret;
  },//数组去重函数

  extend : function (destination, source) {  
    for(var property in source)  
    destination[property] = source[property];
    return destination;  
  },//两个json对象的属性相加

  /*
  errImg: function (e) {
    var _errImg = e.target.dataset.errImg;//获得img错误地址
    var _objImg = "'" + _errImg + "'";//img代替地址
    var _errObj = {};
    _errObj[_errImg] = "/img/001.png";
    console.log(e.detail.errMsg + "----" + _errObj[_errImg] + "----" + _objImg);
    this.setData(_errObj);//注意这里的赋值方式...  
  },//图片加载出错--------------代码待完善*/

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },//获得用户信息

  globalData: {
    header: { 
      'content-type': "application/x-www-form-urlencoded",
      'Accept-Language': 'zh-CN, zh;q=0.8',
    },
    data:{
      device_name:"",
      device_id:"",
      platform:"",
      os_version:"",
      app_version:"",
      sign:"微信"
    },
    userInfo:"",
  },//全局数据
})
