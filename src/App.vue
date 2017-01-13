<template>
  <section>
  <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:leave="leave"
    >
  <div id="app">
    <div id = "row1">
      <span>翻篇</span>
      <input type="text" class="topSearch" placeholder="请搜索用户和文章" />
    </div>
    <div id = "row2">
      <ul class="tabUl">
        <li v-for="(tab,index) in tabs"  :class="{tabCurrent:tab.isCurr}" @click="setCurr(index)">{{tab.name}}</li>
      </ul>
    </div>
  </div>
  
  </transition>
  
  <div id="content">
    <div id="pull-down" class="pull-down">
        <div class="pull-down-content">
            松手加载更多内容
        </div>
    </div>
    <MySwipe></MySwipe>
    <MyPlist></MyPlist>
  </div>

  <my-footer></my-footer>

  </section>
    
</template>

<script>
import MySwipe from './components/Swipe.vue'
import MyFooter from './components/Footer.vue'
import MyPlist from './components/Piclist.vue'

import Velocity from 'velocity-animate'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      tabs: [
        {
          name: '热点',
          id  : 1,
          isCurr: true
        },
        {
          name: '关注',
          id  : 2,
          isCurr: false
        },
        {
          name: '摄影',
          id  : 3,
          isCurr: false
        },
        {
          name: '旅行',
          id  : 4,
          isCurr: false
        },
        {
          name: '美文',
          id  : 5,
          isCurr: false
        },
        {
          name: '亲子',
          id  : 6,
          isCurr: false
        },
        {
          name: '美食',
          id  : 7,
          isCurr: false
        },
        {
          name: '音乐',
          id  : 8,
          isCurr: false
        },
        {
          name: '电视',
          id  : 9,
          isCurr: false
        },
        {
          name: '体育',
          id  : 10,
          isCurr: false
        },
        {
          name: '娱乐',
          id  : 11,
          isCurr: false
        }
      ]
    }
  },
  components: {
     MySwipe,
     MyFooter,
     MyPlist
  },
  watch: {
    'msg': 'handleChange'
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
    },
    enter: function (el, done) {
      Velocity(el, {scale: 0.5}, { duration: 200 })
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
    setCurr: function (index) {
      this.tabs.map(function (tab,i) {
        i == index ? tab.isCurr = true : tab.isCurr = false
      })
    }
  }
  

}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:white;
  margin: 0;
  background-color: #289bf3;
  top:0;
  width: 100%;
  height: auto;
  line-height:50px;
  position:fixed;
  z-index: 999;
}
#app::after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
#row1 {
  position: relative;
}
#row1 span {
    font-family: microsoft yahei;
    font-weight: bolder;
    font-size: 17px;
}
.topSearch {
    width: 80%;
    padding: 8px;
    border-radius: 5px;
    border: 0;
    outline: 0;
    font-family: microsoft yahei;
}
#row2 {
  height: 50px;
  overflow: hidden;
}
#row2::after {
  content: "";
  display: block;
  clear: both;
  height: 0;
  visibility: hidden;
}
.tabUl {
    background-color: white;
    color: black;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    /*font-weight: bolder;*/
    padding-bottom: 50px;
    -webkit-overflow-scrolling : touch;  
}
.tabUl li {
  display: inline-block;
  margin: 0 10px;
  white-space: nowrap;
}
.tabCurrent {
  color: #289bf3;
}
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
/*content*/
#content{
  width:100%; 
  overflow: auto; 
  position:absolute; 
  /*top:100px; */
  top:83px;
  bottom:50px;
  background-color: #ebebeb;
  -webkit-overflow-scrolling : touch;  
}

</style>
