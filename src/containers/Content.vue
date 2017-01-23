<template>
    // <div @touchstart= 'handleTouchStart' 
    //      @touchmove = 'handleTouchMove'
    //      @touchend  = 'handleTouchEnd'
    //      @scroll = 'scroll'
    // >
    <div id="scrollView">
        <div @scroll = 'scroll' id = 'scrollContent'>
            <MySwipe></MySwipe>
            <MyPlist :shouldLoadMore = 'shouldLoadMore'></MyPlist>
        </div>
    </div>
    
</template>

<script>

import MySwipe from '../components/Swipe.vue'
import MyPlist from './Piclist.vue'

export default {
    components: {
        MySwipe,
        MyPlist
    },
    data () {
        return {
            shouldLoadMore: false
        }
    },
    methods : {
        clickHandle: function () {
            this.shouldLoadMore = true;
        },
        scroll: function () {
            alert('滑动了')
            // this.shouldLoadMore = true;
        },
        // handleTouchStart: function (e) {
        //     var _y=e.changedTouches[0].pageY;
        //     this.start = _y;
        // },
        // handleTouchMove: function (e) {
        //     var _x=e.changedTouches[0].pageX;
        //     var _y=e.changedTouches[0].pageY;
            
        //     this.msg = parseInt(this.end) - parseInt(this.start);
            
        //     if (this.msg > 160) {
        //         this.$emit('changeLoading')
        //     }
        // },
        // handleTouchEnd: function (e) {
        //     var _x=e.changedTouches[0].pageX;
        //     var _y=e.changedTouches[0].pageY;

        //     this.end = _y;
        //     this.msg = parseInt(this.end) - parseInt(this.start);
            
        //     this.$emit('resetLoading')
        // }
    }
}
</script>

<style>
#scrollView {
    width: 100%;
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
}
</style>