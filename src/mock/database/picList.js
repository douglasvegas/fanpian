var Mock = require('mockjs')
var Random = Mock.Random;

Random.extend({
    constellation: function(date) {
        var constellations = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座']
        return this.pick(constellations)
    }
})
Random.constellation()
Random.cname()
Random.csentence()

Mock.mock('@CONSTELLATION')
Mock.mock('@CNAME')
Mock.mock('@csentence')

var data = Mock.mock({
    'picList|10-20':[{
        title:'@csentence',
        author:'@CNAME',
        'src|1' : ['src/assets/img/1.jpg','src/assets/img/2.jpg','src/assets/img/3.jpg','src/assets/img/4.jpg','src/assets/img/5.jpg',
        'src/assets/img/6.jpg','src/assets/img/7.jpg','src/assets/img/8.jpg','src/assets/img/9.jpg','src/assets/img/1.jpg'],
        'scanCount|10-200': 100,
        'commentCount|60-300': 80,
        'praiseCount|50-80': 70
    }]
})

module.exports = {
    "picList": data.picList, 
    "more": true, 
    "result": "SUCCESS"
}