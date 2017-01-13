import Vue from 'vue'
import App from './App.vue'
import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);  
Icon.inject('account'); // the name of your svg pic
Icon.inject('add'); // the name of your svg pic
Icon.inject('favorite'); // the name of your svg pic

new Vue({
  el: '#app',

  render: h => h(App)
})
