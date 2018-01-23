//请求封装
var root = "http://uat.gfcarnival.com:8088/ACClient/";
var app = getApp();

var sendRrquest = function (url, method, data, header) {
  data = data || {};
  data = app.extend(data, app.globalData.data);//data和全局data对象相加
  header = header || {};
  var promise = new Promise(function (resolve, reject) {
    wx.request({
      url: root + url,
      data: data,
      method: method,
      header: app.globalData.header,
      success: resolve,
      fail: reject
    })
    console.log("请求参数：");
    console.log(data);
  });
  return promise;
};

module.exports.sendRrquest = sendRrquest