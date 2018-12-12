var util = require('../../utils/util.js');
Page({
  data: {
    today: '2016-11-18',
    city: '北京',
    weather:{
      wendu:18,
      ganmao: '昼夜温差较大，较易发生感冒，请适当增减衣服。体质较弱的朋友请注意防护。',
      yesterday:{
          date: '17日星期四',
          type: '阴',
          fx: '南风',
          fl: '微风及',
          low: '低温8℃',
          high: '高温18℃'
      },
      forecast:[
          {
            date: '18日星期五',
            type: '阴',
            high: '高温16℃',
            low: '低温8℃',
            fengxiang: '南风',
            fengli: '微风级'
          },
          {
            date: '18日星期五',
            type: '阴',
            high: '高温16℃',
            low: '低温8℃',
            fengxiang: '南风',
            fengli: '微风级'
          },
          {
            date: '18日星期五',
            type: '阴',
            high: '高温16℃',
            low: '低温8℃',
            fengxiang: '南风',
            fengli: '微风级'
          },
          {
            date: '18日星期五',
            type: '阴',
            high: '高温16℃',
            low: '低温8℃',
            fengxiang: '南风',
            fengli: '微风级'
          },
          {
            date: '18日星期五',
            type: '阴',
            high: '高温16℃',
            low: '低温8℃',
            fengxiang: '南风',
            fengli: '微风级'
          }

      ]
    }
  },
  onLoad: function (options) {
    this.setData({
      today:util.formatTime(new Date())
    });
    var self = this;
    wx.getLocation({
      type: 'wgs84',
      success: function(res){
        wx.request({
          url: 'http://api.map.baidu.com/geocoder/v2'+'?ak=ASAT5N3tnHTa5APW0SN6&location='+
                res.latitude+','+res.longitude+ '&output=json&pois=0',
          data: {},
          header: {
            'Content-Type': 'application/json'
          },
          success: function(res){
            console.log(res)
            // var city = res.data.result.addressComponent.city.replace('市','');
            // self.searchWeather(city)
          }
        })
      }
    })
    
  },
  onReady: function () {
    this.popup = this.selectComponent('#popup')
  },

  showPopup(){
    this.popup.showPopup()
  },
  _error(){
    console.log('cancel')
    this.popup.hidePopup();
  },
  _success(){
    console.log('success')
    this.popup.hidePopup()
  }
})