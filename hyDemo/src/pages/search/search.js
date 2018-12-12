//Page Object
Page({
    data: {
        inputCity: ''
    },
    //options(Object)
    onLoad: function(options) {
        
    },
    inputing:function(e){
        this.setData({
            inputCity: e.detail.value
        })
    },
    bindSearch: function(e){
        this.searchWeather(this.data.inputCity)
    },
    searchWeather: function(cityName){
        var self = this;
        wx.request({
            url: 'http://wthrcdn.etouch.cn/weather_mini?city='+cityName,
            data:{},
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res){
                console.log(res)
                if(res.data.status == 1002){
                    wx.showModal({
                        title: '提示',
                        content: '输入的城市名称有误',
                        showCancel: false,
                        success: function(res){
                            self.setData({
                                inputCity: ''
                            })
                        }
                    })
                }else{
                    var weather = res.data.data;
                    for(var i =0;i<weather.forecast.length;i++){
                        var d = weather.forecast[i].date;
                        weather.forecast[i].date = ''+ d.replace('星期',' 星期')

                    }
                    self.setData({
                        city: cityName,
                        weather: weather,
                        
                    })
                }
            }
        })
    }
});
  