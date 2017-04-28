<template>
    <div>
        <div id="header">
            <div id = "row1">
            <span>Record</span>
            <input type="text" class="topSearch" placeholder="请搜索用户和文章" />
            <div class="maskSearch" v-on:click='toSearch'></div>
            </div>
            <div id = "row2">
            <ul class="tabUl">
                <router-link :categories = 'categories' v-for="(tab,index) in categories"  :to="{ path:'/category/'+tab.categoryId }"  tag="li"  active-class="tabCurrent" >
                    {{tab.name}}
                </router-link>
            </ul>
            </div>
        </div>
        <div class="homeHeaderBlock"></div>
    </div>

</template>
<script>
    import { mapActions } from 'vuex'
    
    export default {
        beforeRouteEnter: (to, from, next) => {
            // ...
            next ((vm) => {
                console.log("Header进不来")
            })   
        },
        mounted () {
            this.fetchCategories();
        },
        computed: {
            categories() {
                return this.$store.state.categories.categories;
            }
        },
        methods: {
            ...mapActions(['fetchCategories']),
            toSearch: function () {
                this.$router.push('/search')
            }
        }

    }
</script>


<style>
.maskSearch {
    width: 82%;
    height: 36px;
    position: fixed;
    top: 0;
    right: 0;
    margin-top: 8px;
    margin-right: 8px;
}
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