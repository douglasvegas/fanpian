<template>
    <div id="scrollView" v-scroll="loadMore" :data-isScroll="loadNext" :getCanFetch='getCanFetch'>
        <div id='scrollContent'>
            <Swipe></Swipe>
            <PicList :loadNext='loadNext' @listenReset='reset'></PicList>
        </div>
    </div>
</template>

<script>

    import Swipe from '../components/Swipe.vue'
    import PicList from './Piclist.vue'

    export default {
        components: {
            Swipe,
            PicList
        },
        directives: {
            scroll: {
                bind: function (el, binding) {
                    el.addEventListener('scroll', () => {
                        if (!el.getAttribute("getCanFetch")) {
                            return;
                        }
                        var scrollContent = document.querySelector("#scrollContent").clientHeight;
                        if (el.scrollTop + window.innerHeight == scrollContent + 155) {
                            binding.value();
                        }
                    })
                }
            }
        },
        data() {
            return {
                loadNext: false
            }
        },
        computed: {
            getCanFetch() {
                return this.$store.state.posts.canFetch;
            }
        },
        methods: {
            loadMore: function () {
                if (this.$store.state.posts.canFetch == true) {
                    this.loadNext = true;
                } else {
                    this.loadNext = false;
                }
            },
            reset: function () {
                this.loadNext = false;
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