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
    <MyFooter v-on:listenPop = 'handlePop'></MyFooter>
    <div class="footerPopUp">
        <div class="popActions">
            <ul>
                <li>
                <form action=""  id="formData1">
                  <input type="file" class="uploadImg" @change='upPhoto' name="uploadImg"/>
                </form>
                  相册上传
                </li>
                <li @click = "upText">纯文字</li>
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
axios.defaults.withCredentials = true

import { mapActions } from 'vuex'

let router = new VueRouter()
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
    ...mapActions({ pushNewImg:'pushNewImg' }),
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
    upPhoto: function (e) {
      
      var myForm = document.getElementById('formData1');
      var formData = new FormData(myForm);
      this.pushNewImg(formData)
      router.replace({ path: '/post/create/0' })
      // axios.post('http://localhost:3000/uploadImg',formData)
      //   .then(function (result) {
      //     if (result.status == 200 && result.data.code == 200) {
      //       var imgUrl = result.data.imgUrl;
      //       console.log(imgUrl)
      //       router.replace({ path: '/post/create/0' })
      //     }
      //   })
      //   .catch( function (err) {
      //     console.log(err)
      //   })
      this.popBack();

    },
    upText: function () {
      // router.go(-1)

      router.push({ path: '/test/5'})
      console.log("上传文字");
      this.popBack();
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
    border-radius: 20px;
    text-align: center;
    top: 100%;
}

.popActions {
    width: 100%;
    height: 60%;
    background: white;
    border-radius: 20px;
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
</style>
