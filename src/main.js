import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers.js'
import './assets/css/base.css'

const FastClick = require('fastclick')
FastClick.attach(document.body)

import axios from 'axios'
// import VueAxios from 'vue-axios'
var Promise = require('es6-promise').polyfill();

var Axios = axios.create({
  promise: Promise
});

 
// Vue.use(VueAxios, axios)
Vue.use(Axios)
Vue.use(VueRouter)

let router = new VueRouter({
    routes
})


new Vue({
  router,
}).$mount('#app')
