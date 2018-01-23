// home.js
var request = require('../../utils/request.js')
var API_login = "jfbs/jfbs1001/login.do?";//登录
var API_register = "jfbs/jfbs1001/register.do?"//注册
var API_code = "jfbs/jfbs1001/generatePhoneCode.do?";//获取验证码
var API_forgetpsw = "jfbs/jfbs1001/forgetPassword.do?";//忘记密码

var app = getApp();
Page({
  data: {
    userInfo: {},
    register:false,
  },

  onLoad: function () {
    var that = this
    app.getUserInfo(function (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    })
  },

  //登录表单提交
  LoginSubmit: function (e) {
    /*
    console.log(e.detail.value);
    var userName = e.detail.value.userName;
    var password = e.detail.value.password;
    */
    request.sendRrquest(API_login, 'POST', {
      userName: 17778396592,
      password: 123456,
    }).then(function (res) {
      console.log("返回数据：");
      console.log(res);
      if (res.data.code == "100000I") {

      } else {
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false,
        })
      }
    }, function (error) {
      wx.showModal({
        title: '提示',
        content: '网络错误',
        showCancel: false,
      })
    });
  },

  //忘记密码
  ForgetPsw:function(e){
    /*
    console.log(e.detail.value);
    var mobile = e.detail.value.mobile;
    var newPassword = e.detail.value.newPassword;
    var newCheckPassword = e.detail.value.newCheckPassword;
    var phoneCode = e.detail.value.phoneCode;
    */
    request.sendRrquest(API_forgetpsw, 'POST', 
    {
      mobile:17778396592,
      newPassword:123456,
      newCheckPassword:123456,
      phoneCode:571441,
    }).then(function (res) {
        console.log("返回数据：");
        console.log(res);
        if (res.data.code == "100000I"){

        }else{
          wx.showModal({
            title: '提示',
            content: res.data.message,
            showCancel: false,
          })
        }
      }, function (error) {
        wx.showModal({
          title: '提示',
          content: '网络错误',
          showCancel: false,
        })
      });
  },

  //注册界面跳转
  ToRegister:function(e){
    this.setData({
      register:true
    })
  },

  //获取验证码
  PhoneCode: function () {
    request.sendRrquest(API_code, 'POST', {
      mobile: 17778396592,
      reason: 1,
    }).then(function (res) {
      console.log("返回数据：");
      console.log(res);
    }, function (error) {
      wx.showModal({
        title: '提示',
        content: '网络错误',
        showCancel: false,
      })
    });
  },

  //前往购物车
  ToCart:function(){
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },

  ToOrder: function (e) {
    console.log(e);
    var currentTab = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/order/order?currentTab=' + currentTab
    })
  }

})