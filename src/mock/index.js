var users = require('./database/users')
var posts = require('./database/picList')
var categories = require('./database/categories')

module.exports = function () {
    return {
        'users': users,
        'posts': posts,
        'categories':categories
    }
}