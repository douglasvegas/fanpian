<template>
    <div @touchstart= 'handleTouchStart' 
         @touchmove = 'handleTouchMove'
         @touchend  = 'handleTouchEnd'
    >
        <MySwipe></MySwipe>
        <MyPlist></MyPlist>
        <!--<router-view></router-view>-->
    </div>
</template>
<script>

import MySwipe from './Swipe.vue'
import MyPlist from './Piclist.vue'

    export default {
        components: {
            MySwipe,
            MyPlist
        },
        data () {
            return {
                msg:'2',
                start:'',
                end: ''
            }
        },
        methods : {
            handleTouchStart: function (e) {
                var _y=e.changedTouches[0].pageY;
                this.start = _y;
            },
            handleTouchMove: function (e) {
                var _x=e.changedTouches[0].pageX;
                var _y=e.changedTouches[0].pageY;
               
                this.msg = parseInt(this.end) - parseInt(this.start);
               
                if (this.msg > 160) {
                    this.$emit('changeLoading')
                }
            },
            handleTouchEnd: function (e) {
                var _x=e.changedTouches[0].pageX;
                var _y=e.changedTouches[0].pageY;

                this.end = _y;
                this.msg = parseInt(this.end) - parseInt(this.start);
               
                console.log(parseInt(this.end) - parseInt(this.start));
                this.$emit('resetLoading')
                // this.msg = _y;
            }
        }
    }
</script>