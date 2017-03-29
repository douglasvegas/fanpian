import axios from 'axios'
import CONFIG from './CONFIG'
import 'core-js/fn/promise';
var Promise = require('es6-promise').polyfill();

var Axios = axios.create({
  promise: Promise
});

class Server {
    request(url, type, data) {
        if (type === 'get') {
            return this.get(url, data);
        } 
        if (type === 'post') {
            return this.post(url, data);
        }
        return this.get(url ,data)
    }
    get(url, data) {
        return Axios.get(url,{params:data});
    }
    post(url, data) {
        return Axios.post(url,data);
    }
    //获取首页热门文章
    fetchHotPosts (data) {
        return this.post(CONFIG.FETCH_HOT_POST_URL,data)
    }
    //根据cateId获取文章列表
    fetchPostsByCateId () {
        return this.post(CONFIG.FETCH_POST_BY_CATEID)
    }
    //获取栏目
    fetchCategories () {
        return this.post(CONFIG.FETCH_CATEGORIES_URL)
    }
    //获取用户信息
    fetchUserInfo () {
        return this.post(CONFIG.FETCH_USERINFO)
    }
    //获取粉丝关注数量
    fetchCount () {
        return this.post(CONFIG.FETCH_COUNT)
    }
    //上传图片
    postImg (data) {
        return this.post(CONFIG.UPLOAD_IMG,data)
    }

}

export default new Server;