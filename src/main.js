import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routers.js'

Vue.use(VueRouter)

let router = new VueRouter({
  // linkActiveClass:'tabCurrent',
  routes
})


new Vue({
  router,
}).$mount('#app')
