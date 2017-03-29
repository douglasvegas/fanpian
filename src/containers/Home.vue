<template>
    <div>
        <MyHeader></MyHeader>
        <div id="content">
            <div id="pull-down" class="pull-down">
                <div class="pull-down-content" v-show='isShow'>
                    {{msg}}
                </div>
            </div>
            <router-view>
            </router-view>
        </div>
    </div>
</template>

<script>
    import MyHeader from '../components/Header.vue'
    export default {
        beforeRouteEnter: (to, from, next) => {
            next()
        },
        components: {
            MyHeader
        },
        data() {
            return {
                msg: '松手加载更多内容',
                isShow: false
            }
        },
        methods: {

        }
    }
</script>

<style>
/*content*/
.shouldShow {
    display: block;
}
#content{
  width:100%; 
  /*overflow: auto; */
  position:absolute; 
  top:105px;
  bottom:50px;
  background-color: #ebebeb;
  -webkit-overflow-scrolling : touch;  
  overflow-x: hidden;
} 
.pull-down-content {
    text-align: center;
}
</style>