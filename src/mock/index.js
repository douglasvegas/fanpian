var users = require('./database/users')
var picList = require('./database/picList')

module.exports = function () {
    return {
        'users': users,
        'picList': picList
    }
}