<template>
  <section>
    <!--<transition
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:leave="leave"
      >
    <my-header></my-header>
    </transition>-->

    
    <router-view></router-view>
    <my-footer></my-footer>
  </section>
</template>

<script>

import MyFooter from './components/Footer.vue'

import Velocity from 'velocity-animate'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  components: {
     MyFooter
  },
  watch: {
    'msg': 'handleChange'
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      Velocity(el, {scale: 1}, { duration: 200 })
      Velocity(el, {opacity: 1}, { duration: 300 ,complete: done})
    },
    leave: function (el, done) {
      Velocity(el, { scale: 1 }, { duration: 0 })
      Velocity(el, {opacity: 1}, {duration: 0,complete: done})
    },
    handleClick: function () {
      this.msg = '123123';
    },
    handleChange: function () {
      console.log(1111111)
    },
    
  }
  

}
</script>

<style>

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}


</style>
