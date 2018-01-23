// shopping.js
var request = require('../../utils/request.js')
var API_bodyDetail = 'jfpd/jfpd1001/bodyDetail.do';//系列详情
var API_productDetail = 'jfpd/jfpd1001/productDetail.do';//产品详情
var app = getApp();
Page({
  data: {
    swiperCurrent:0,

    productInfos:[],  //系列下所有产品
    productInfo:{}, //当前选中并展示的商品

    bodyImages:[],  //轮播图
    contentImages:[], //商品详情图

    pronum: 1, //选择的商品数量
    proprice:0,//所选的商品总价
    procolor:"",  //选择的商品颜色
    prosize:"",  //选择的商品尺寸
    productId:"",  //所选商品的PID

    ProColorArray:[], //系列下所有的商品颜色
    ProSizeArray:[],  //系列下所有的商品尺寸
    hiddenprice:true, //是否打折
    id:""//界面转发URL需要的参数
  },

  onLoad: function (params) {
    var that = this
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    var id = params.id.toString()
    that.setData({
      id : id,
    })
    //向后台请求数据
    request.sendRrquest(API_bodyDetail, 'POST', { bodyId:id },)
      .then(function (res) {
        console.log("返回数据：");
        var data = res.data.data;
        console.log(data);
        that.setData({
          productInfos: data.productInfos,
          bodyImages: data.bodyImages,
          contentImages: data.contentImages,
          productInfo: data.productInfos[0],  //界面默认选取第一个商品
          proprice: data.productInfos[0].price,
          procolor: data.productInfos[0].colorInfo.colorName,
          prosize: data.productInfos[0].modelSizeInfo.modelSizeName,
          productId: data.productInfos[0].productId,
        });
        //遍历展示出颜色尺寸
        var productInfos = data.productInfos;
        console.log(productInfos);
        var ProColorArray=[];var ProSizeArray=[];
        for(var i=0;i<productInfos.length;i++){ //
          if (productInfos[i].colorInfo.colorName!=""){   //看看是不是空字符串，如果不是空的才传
            ProColorArray.push(productInfos[i].colorInfo.colorName);
          }else{console.log("无颜色类别")}
          if (productInfos[i].modelSizeInfo.modelSizeName!=""){
            ProSizeArray.push(productInfos[i].modelSizeInfo.modelSizeName);
          }else{console.log("无尺寸类别")}
          ProColorArray = app.removeDuplicatedItem(ProColorArray);  //去重
          ProSizeArray = app.removeDuplicatedItem(ProSizeArray);    //去重
        };
        that.setData({
          ProColorArray : ProColorArray,
          ProSizeArray : ProSizeArray,
        });
        console.log(ProColorArray);
        console.log(ProSizeArray);
        //隐藏加载中
        wx.hideLoading();
      }, function (error) {
        wx.showModal({
          title: '提示',
          content: '网络错误',
          showCancel: false,
        })
      });
  },

  //界面设置转发分享
  onShareAppMessage: function () {
    var title = this.data.productInfo.productName ;
    var id = this.id;
    return {
      title: title ,
      path: 'pages/shoping/shoping?id=' + id ,
    }
  },

  //分享按钮点击后提示右上角分享
  Share:function(){
    wx.showModal({
      title: '提示',
      content: '点击页面右上角按钮进行转发',
      showCancel: false ,
    })
  },

  //图片滑动展示效果
  swiperChange: function (e) {
    this.setData({
      swiperCurrent: e.detail.current
    },
    )
  },

  //增加购买数量
  addCount: function (e) {
    let num = this.data.pronum;
    num = num + 1;
    let price = this.data.productInfo.price;  //商品单价，用于加减数量时的价格变化
    price = parseFloat(price);
    price = price*num;
    price = price.toFixed(2); //四舍五入
    this.setData({
      pronum: num,
      proprice: price
    });
  },

  //减少购买数量
  minusCount: function (e) {
    let num = this.data.pronum;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    let price = this.data.productInfo.price;
    price = parseFloat(price);
    price = price * num;
    price = price.toFixed(2);
    this.setData({
      pronum: num,
      proprice: price
    });
  },

  //切换维度后刷新界面数据
  refresh: function () {
    var color = this.data.procolor;
    var size = this.data.prosize;
    var productInfos = this.data.productInfos;
    var index;  //数组角标
    //循环查找当前维度下的商品信息
    for (var item of productInfos) {
      if (item.colorInfo.colorName == color && item.modelSizeInfo.modelSizeName == size) {
        index = productInfos.indexOf(item);
      }
    }
    let num = this.data.pronum;
    let price = productInfos[index].price;
    price = parseFloat(price);
    price = price * num;
    price = price.toFixed(2);
    this.setData({
      productInfo: productInfos[index],
      proprice: price
    })
  },

  //选择颜色和尺寸
  ToSelectColor:function(e){
    var color = e.currentTarget.id;
    this.setData({
      procolor: color
    });
    this.refresh();
  },
  ToSelectSize: function (e) {
    var size = e.currentTarget.id;
    this.setData({
      prosize: size
    });
    this.refresh();
  },
})