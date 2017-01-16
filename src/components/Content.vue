<template>
    <div>
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

            }
        }
    }
</script>