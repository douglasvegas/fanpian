<template>
    <div>
        <div id="header">
            <div id = "row1">
            <span>翻篇</span>
            <input type="text" class="topSearch" placeholder="请搜索用户和文章" />
            </div>
            <div id = "row2">
            <ul class="tabUl">
                <li v-for="(tab,index) in tabs" @click="setCurr(index)">
                    <router-link :to="{ path:'/test/'+tab.id }"  :class="{tabCurrent:tab.isCurr}" >
                        {{tab.name}}
                    </router-link>
                </li>
            </ul>
            </div>
        </div>
        <div class="homeHeaderBlock"></div>
    </div>

</template>
<script>
    import Api from '../api/api.js'
    export default {
        mounted () {
            let _this = this;
            let timer = setTimeout(function() {
                _this.tabs = Api.tabs;
                clearTimeout(timer);
            }, 300);
        },
        data () {
            return {
                tabs: []
            }
        },
        methods: {
            setCurr: function (index) {
                this.tabs.map(function (tab,i) {
                    i == index ? tab.isCurr = true : tab.isCurr = false
                    })
                }
        }
    }
</script>


<style>
#header {
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
#header::after {
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

.homeHeaderBlock {
    top: 0;
    left: 0;
    width: 100%;
    height: 100px;
    display: block;
    position: absolute;
    background-color: #ebebeb;
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
a {
    color:black;
    text-decoration: none;
}
.tabCurrent a {
    color: #289bf3;
}
</style>