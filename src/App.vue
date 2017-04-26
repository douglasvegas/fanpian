<template>
  <section>
   <transition name="fade">
      <router-view></router-view>
   </transition> 
      
    <MyFooter v-on:listenPop = 'handlePop'></MyFooter>
    <div class="footerPopUp">
        <div class="popActions">
            <ul>
                <li  @click = "toPost(0)">
                  相册上传
                </li>
                <li @click = "toPost(1)">
                  纯文字
                </li>
            </ul>
        </div>
        <div class="popCancel" @click = "popBack">
            <p>取消</p>
        </div>
    </div>
    <div class="globalMask" @click = "popBack"></div>
    <div class="globalMask"></div>
  </section>
</template>

<script>

import MyFooter from './components/Footer.vue'

import Velocity from 'velocity-animate'
import VueRouter from 'vue-router'

import axios from 'axios'


import { mapActions } from 'vuex'

let router = new VueRouter()
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
     MyFooter
  },
  watch: {
    'msg': 'handleChange'
  },
  methods: {
    ...mapActions({ pushNewImg:'pushNewImg' }),
    handlePop: function () {
      
      var obj = document.querySelector(".footerPopUp");
		
    	obj.style.webkitTransform="translate( 0 , -100% )";
      obj.style.transform = "translate( 0 , -100% )"
      obj.style.transition="transform .3s ease-out,-webkit-transform .3s ease-out";

      document.querySelector(".globalMask").style.top = '0%';
    },
    popBack: function () {
      var obj = document.querySelector(".footerPopUp");
      
			obj.style.webkitTransform="translate( 0 , 100% )";
      obj.style.transform = "translate( 0 , 100% )"
      obj.style.transition="transform .3s ease-out,-webkit-transform .3s ease-out";

      document.querySelector(".globalMask").style.top = '100%';
    },
    
    toPost: function (type) {
      this.$router.push('/post/create/'+type)
    }
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
  margin: 0;
}



.globalMask {
    width: 100%;
    height: 100%;
    background: black;
    display: block;
    z-index: 999;
    position: fixed;
    top: 1;
    left: 0;
    opacity: 0.4;
    top: 100%;
}

.footerPopUp {
    position: fixed;
    z-index: 10001;
    width: 96%;
    height: 147px;
    margin: 1% 2%;
    border-radius: 6px;
    text-align: center;
    top: 100%;
}

.popActions {
    width: 100%;
    height: 60%;
    background: white;
    border-radius: 6px;
    margin-bottom: 10px;
    opacity: 0.9;
    position: relative;
}

.popActions ul {
    height: 100%;
    position: absolute;
    width: 100%;
}

.popActions ul li {
    width: 100%;
    height: 45px;
    line-height: 45px;
    margin: 0;
    
}

.popActions ul li:first-child {
      border-bottom: 1px solid #ccc;
}

.popCancel {
    width: 100%;
    height: 40px;
    background: white;
    border-radius: 9px;
    opacity: 0.9;
    line-height: 40px;
}

.popActions input[type = 'file'] {
      opacity: 0;
      float: left;
      position: absolute;
      width: 100%;
      height: 45px;
      z-index: 99;
      margin: 0 auto;
      margin-left: -41%;
}


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}


</style>
