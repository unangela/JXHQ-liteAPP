// order.js
var app = getApp()
Page({
  data: {
    navbar: ['全部订单', '待付款', '待发货', '已发货','待评价'],
    currentTab: 0 ,
  },
  onLoad:function(e){
    console.log(e.currentTab)
    this.setData({
      currentTab: e.currentTab
    })
  },
  navbarTap: function (e) {
    console.log(e)
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  }
})  