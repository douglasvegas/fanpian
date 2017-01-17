import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)
Vue.use(VueRouter)

let router = new VueRouter({
  // linkActiveClass:'tabCurrent',
  routes
})


new Vue({
  router,
}).$mount('#app')
