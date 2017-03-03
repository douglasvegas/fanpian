import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/routers.js'
import store from './vuex/store'
import 'core-js/fn/promise';
const FastClick = require('fastclick')
FastClick.attach(document.body)

import './assets/css/base.css'

// import axios from 'axios'
// import VueAxios from 'vue-axios'
// var Promise = require('es6-promise').polyfill();

// var Axios = axios.create({
//   promise: Promise
// });
// Vue.use(axios)

// import axios from 'axios'
// import VueAxios from 'vue-axios'
 
// Vue.use(VueAxios, axios)

Vue.use(VueRouter)

let router = new VueRouter({
    routes
})


new Vue({
  store,
  router
}).$mount('#app')
