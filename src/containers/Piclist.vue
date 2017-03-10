<template>
    <div class = "picList">
        <div>
            <ul class="imgList">
                <PicItem :posts = 'posts'  v-for = 'info in posts'  :info = 'info' ></PicItem>
            </ul>
        </div>
        <div class="fill-footer"></div>
    </div>    
</template>

<script>
import PicItem from '../components/PicItem.vue'
import { mapActions } from 'vuex'

export default {
    props: ['shouldLoadMore'],
    watch: {
        shouldLoadMore: function (value) {
            console.log('变成' + value);
        }
    },
    components: {
        PicItem
    },
    mounted () {
        this.fetchHotPosts();
    }, 
    computed: {
        posts() {
            return this.$store.state.posts.posts
        }
    },
    methods: {
        ...mapActions(['fetchHotPosts'])
    }
}
</script>

<style>
.picList { 
    height: 100%;
    width: 100%;
    overflow: auto;
}

.imgList {
    padding: 10px 5px;
    color:rgba(255, 255, 255, 0.9);
}

.imgList>li {
    padding-bottom: 7px;
    position: relative;
    width: 100%;
    margin:0;
}

.imgList img {
    width: 100%;
    height: 150px;
    border-radius: 10px;
}

.wrapContent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.wrapContent p {
    font-weight: bold;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: absolute;
    top: 12px;
    width: 90%;
    left: 16px;
    text-shadow: 1px 1px 4px rgb(10, 10, 10);
}
.wrapContent>span {
    position: absolute;
    top: 38px;
    left: 16px;
    font-size: 10px;
}
.wrapContent>ul {
    position: absolute;
    left: 0.7rem;
    bottom: 1rem;
    font-size: 0.8rem;
}


h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
}

a {
  color: #000000;
}

</style>

