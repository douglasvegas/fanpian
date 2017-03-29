import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './router/routers.js';
import store from './vuex/store';
import 'core-js/fn/promise';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './common/Common';
const FastClick = require('fastclick');
FastClick.attach(document.body);

import './assets/css/base.css'
require('es6-promise').polyfill();

 
Vue.use(VueAxios, axios);
Vue.axios.defaults.withCredentials = true;

Vue.use(VueRouter)

let router = new VueRouter({
    routes
})

new Vue({
  store,
  router
}).$mount('#app')
