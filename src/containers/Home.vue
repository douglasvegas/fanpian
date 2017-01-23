<template>
    <div>
        <MyHeader></MyHeader>
        <div id="content">
            <div id="pull-down" class="pull-down">
                <div class="pull-down-content" v-show = 'isShow'>
                    {{msg}}
                </div>
            </div>
            <router-view v-on:changeLoading = 'changeLoad' v-on:resetLoading = 'restLoad'>
            </router-view>
        </div>
    </div>
</template>

<script>
import MyHeader from '../components/Header.vue'
export default {
    beforeRouteEnter: (to, from, next) => {
        // ...
        next(vm => {
            console.log("Home进来了")
        })
    },
    components: {
        MyHeader
    },
    data () {
        return {
            msg: '松手加载更多内容',
            isShow: false
        }
    },
    methods: {
        scroll: function () {
            console.log(123)
        },
        changeLoad: function () {
            this.msg = '松手加载更多内容';
            this.isShow = true;
        },
        restLoad : function () {
            this.msg = 'loading......'
            var _this = this;
            setTimeout(function () {
                this.msg = '松手加载更多内容';
                _this.isShow = false;
            },1500)
        }
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