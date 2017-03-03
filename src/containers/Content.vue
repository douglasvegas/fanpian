<template>
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
        }
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