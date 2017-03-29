<template>
    <div>
        <p v-show='posts.length <= 0' style="text-align: center;text-shadow: 1px 1px 1px #ccc;" :name='cateName'>暂时没有{{categoryName}}的内容,去发表一篇吧</p>
        <ul class="imgList">
            <PicItem :posts = 'posts'  v-for = 'info in posts'  :info = 'info' >

            </PicItem>
        </ul>
    </div>
</template>

<script>
    import PicItem from './PicItem.vue'
    import axios from 'axios';
    export default {
        name:'categoryDetail',
        data () {
            return {
                posts: [],
                categoryName:''
            }
        },
        components: {
            PicItem
        },
        computed: {
            cateName: function () {
                var cateId = this.$route.params.id;
                var obj = this.$store.state.categories.categories;
                obj.map((value, index) => {
                    if (value.categoryId == cateId) {
                        this.categoryName = value.name;
                        return value.name;
                    } 
                })
            }
        },
        methods: {
            getPostsByCateId: function (id) {
                var postUrl = API_ROOT + '/post/cate/' + id;
                var _this = this;
                this.axios.post(postUrl).then(function (result) {
                    console.log(result)
                    if (result.status == 200 && result.data.length > 0) {
                        _this.posts = result.data;
                    } else {
                        _this.posts = []
                    }
                }).catch(function (err) {
                    console.log(err)
                })
            }
        },
        mounted () {
            var cateId = this.$route.params.id;
            this.getPostsByCateId(cateId);
        },
        watch: {
            $route: function () {
                // var id = this.$router.history.current.params.id;
                var id = this.$route.params.id
                this.getPostsByCateId(id);
            }
        }
        
    }
</script>

<style scoped>
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



</style>