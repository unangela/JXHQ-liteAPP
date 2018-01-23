// article.js
var API_URL = "https://api.douban.com/v2/movie/subject/" 
Page({
  data:{
    title: "",
    article:"",
    img_url:"",
  },

  onLoad: function (params){
    var that = this;
    console.log(params);
    wx.request({
      url: API_URL + params.id,
      data: '',
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        console.log(res.data);
        var data = res.data;
        that.setData({
          article: data.summary,
          img_url:data.images.large,
          title:data.title,
        })
      },
    })
  }
})