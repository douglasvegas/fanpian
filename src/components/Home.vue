<template>
    <div>
        <my-header></my-header>
        <div id="content">
        <div id="pull-down" class="pull-down">
            <div class="pull-down-content">
                松手加载更多内容
            </div>
        </div>
        <router-view></router-view>
        </div>
    </div>
    
</template>
<script>
import MyHeader from './Header.vue'
export default {
    components: {
        MyHeader
    },
    data () {
        return {

        }
    }
}
</script>
<style>
/*content*/
#content{
  width:100%; 
  /*overflow: auto; */
  position:absolute; 
  top:82px;
  bottom:50px;
  background-color: #ebebeb;
  -webkit-overflow-scrolling : touch;  
} 
</style>