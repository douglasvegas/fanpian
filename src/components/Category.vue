<template>
    <div  v-scroll="loadMore" style="width:100%;height:100%;overflow: scroll " :getCanFetch='getCanFetch'>
        <p v-show='posts.length <= 0' style="text-align: center;text-shadow: 1px 1px 1px #ccc;" :name='cateName'>暂时没有{{categoryName}}的内容,去发表一篇吧</p>
        <ul class="imgList" id="scrollContent">
            <PicItem :posts = 'posts'  v-for = 'info in posts'  :info = 'info' >

            </PicItem>
        </ul>
<div class="fill-footer" style="text-align: center;" v-if='isBottom === true'><i class="fa fa-spinner"></i>加载中...</div>
<div class="fill-footer" style="text-align: center;opacity: 0;" v-if='isEnd === false && isBottom === false'>
asdasd
</div>
<div class="fill-footer" style="text-align: center;" v-if='isEnd === true'>-----到头了-----</div>
    </div>
</template>

<script>
    // var API_ROOT = 'http://www.douglasvegas.com/api' ;
    import PicItem from './PicItem.vue'
    import axios from 'axios';
    export default {
        name:'categoryDetail',
        data () {
            return {
                posts: [],
                categoryName:'',
                getCanFetch: true,
                isBottom: false,
                isEnd: false,
                pageNo: 1,
                pageSize: 5
            }
        },
        components: {
            PicItem
        },
        directives: {
            scroll: {
                bind: function (el, binding) {
                    el.addEventListener('scroll', () => {
                        if (!el.getAttribute("getCanFetch")) {
                            return;
                        }
                        var scrollContent = document.querySelector("#scrollContent").clientHeight;

                        if (el.scrollTop + window.innerHeight == scrollContent + 174) {
                            binding.value();
                        }
                    })
                }
            }
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
            getPostsByCateId: function (id,pageNo) {
                var postUrl = API_ROOT + '/post/cate/' + id;
                var _this = this;
                var data = {};
                data.pageNo = pageNo || this.pageNo;
                data.pageSize = this.pageSize;
                this.axios.post(postUrl,data).then(function (result) {
                    if (result.status == 200 && result.data.length > 0) {
                        var res = result.data;
                        res.map(function (v, i) {
                            if(v.imgUrl){
                                v.imgUrl = API_ROOT + v.imgUrl
                            }
                        })
                        _this.posts = _this.posts.concat(result.data);
                    } else {
                        _this.isEnd = true;
                        _this.isBottom = false;
                        _this.getCanFetch = false;
                    }
                }).catch(function (err) {

                })
            },
            loadMore: function () {
                var cateId = this.$route.params.id;
                this.isBottom = true;
                this.pageNo++;
                this.getPostsByCateId(cateId,this.pageNo)
            }
        },
        mounted () {
            var cateId = this.$route.params.id;
            this.getPostsByCateId(cateId);
        },
        watch: {
            $route: function () {
                this.posts = [];
                this.categoryName = '';
                this.getCanFetch = true;
                this.isBottom = false;
                this.isEnd = false;
                this.pageNo = 1;
                // var id = this.$router.history.current.params.id;
                var id = this.$route.params.id
                this.getPostsByCateId(id);
            }
        }
        
    }
</script>

<style scoped>
.fa-spinner { 
    -webkit-animation:spin 2s linear infinite;
}
@-webkit-keyframes spin{
    0%{-webkit-transform:rotate(0deg)}
    100%{-webkit-transform:rotate(359deg)}
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
</style>