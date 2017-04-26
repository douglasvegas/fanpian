<template>
<div>
    <div class="postHeader">
        <i class="fa fa-arrow-left fa-3" @click='back'></i>
        <div class="headText">文章详情</div>
        <i class="fa fa-bars fa-3" @click='more'></i>
        <transition name="bounce">
            <div class="popMore" v-if='ifShow'>
                <span class="triangle"></span>
                <ul>
                    <li>作者主页</li>
                    <li v-if='status === 1'>修改</li>
                    <li v-if='status === 1'>删除</li>

                    <li v-if='status === 2 && isKeep === 0' @click='keepIt(0)'>收藏</li>
                    <li v-if='status === 2 && isKeep === 1' @click='keepIt(1)'>取消收藏</li>
                    <li v-if='status === 2 && isLike === 0' @click='likeIt(0)'>点赞</li>
                    <li v-if='status === 2 && isLike === 1' @click='likeIt(1)'>取消点赞</li>
                    <li v-if='status === 2'>分享</li>
                </ul>
            </div>
        </transition>
    </div>
    <div class="postDetail">
        <h2> 
        {{title}}
        </h2>
        <div class="tagDiv">
            <ul class="tagUl">
                <li style="background: darkorange;"class="tagLi" v-if = 'type == 0'>图文模式</li>
                <li style="background: darkorange;"class="tagLi" v-if= 'type == 1'>文字模式</li>
                <li style="background: darkseagreen;" class="tagLi">{{cateName}}</li>
            </ul>
        </div>
        <div class="postInfo">
            <span style="color:#aaa">{{time}}</span>
            <a href="javascript:;">{{author}}</a>
        </div>
        <div class="postContent  markdown-body entry-content">
            <img :src="imgUrl" alt="" style="width: 100%;" v-if='type === 0 && imgUrl !=  ""'>
            <div v-html='content'>
            </div>
        </div>
    </div>
    <div style="margin-bottom: 128px;">
        <ul class="postTips">
            <li><i class="fa fa-eye"></i> {{pv}}</li>
            <li><i class="fa fa-thumbs-up"></i> {{like}}</li>
            <li><i class="fa fa-folder"></i> {{keep}}</li>
        </ul>
    </div>
    <div class="sendMsg" @click = 'toComment'>
        查看评论
    </div>
<transition name="bounce">
    <MyPopAlert :configPop='configPop'></MyPopAlert>
</transition>
</div>
</template>

<script>    
    import MyPopAlert from './PopAlert.vue'
    var moment = require('moment');
    // import isLogin from '../common/checkLogin';

    export default {
        beforeRouteEnter: (to, from, next) => {
            var flag = false;
            if(from.name === 'post') {
                flag = true;
            }
            next(vm => {
                vm.flag = flag;
            })
        },
        data() {
            return {
                configPop: {},
                title:'',
                content:'',
                time:'',
                author:'',
                imgUrl:'',
                ifShow: false,

                type: '', //图文类型
                flag: false,
                status: 0,
                pv:0,
                like:0,
                keep:0,

                isLike:0, //判断是否点赞收藏
                isKeep:0,

                cateName:'未知'
            }
        },
        components: {
            MyPopAlert
        },
        mounted(){
            var id = this.$route.params.id;
            var _this = this;
            this.axios.post(API_ROOT+'/post/'+id)
                .then(function (result) {
                    if (result.status == 200 && result.data) {
                        var json = result.data;
                        json.create_date = moment(json.create_date).format().replace('T',' ').split('+')[0];
                        _this.title = json.title;
                        _this.content = json.content;
                        _this.time = json.create_date;
                        _this.author = json.author.name;
                        _this.imgUrl = 'api'+ json.imgUrl;
                        _this.status = json.status;
                        _this.pv = json.pv;
                        _this.like = json.like;
                        _this.keep = json.keep;

                        _this.isLike = json.isLike;
                        _this.isKeep = json.isKeep;

                        _this.type = json.type;

                        _this.getCateName(json.cateId);
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        },
        methods: {
            back: function () {
                if (this.flag) {
                    this.$router.go(-2)
                } else { 
                    this.$router.go(-1);
                }
            },
            more: function () {
                this.ifShow = !this.ifShow;
            },
            toComment: function () {
                var id = this.$route.params.id;
                this.$router.push( '/comment/' + id );
            },
            getCateName: function (id) {
                var cates = this.$store.state.categories.categories;
                if(cates) {
                    cates.map( (v,i) => {
                        if (v.categoryId == id) {
                            this.cateName = v.name;
                            return v.name;
                        }
                    })
                }else{
                    _this.cateName = '未知';
                    return '未知';
                }
                
                
            },
            popConfig: function (text) {
                this.configPop = {
                    type: 'dialog',
                    title: '温馨提示',
                    content: text,
                    buttons: [
                        {
                            value: '关闭',
                            action: () => {
                                this.$children[0]._data.isShow = false;
                            }
                        }
                    ]
                }
            },
            likeIt: function (type) {
                var id = this.$route.params.id;
                var url = API_ROOT+'/post/'+id;

                if (type === 0) {
                    url += '/like'
                }else if (type === 1) {
                    url += '/likeCancel'
                }
                this.ifShow = false;
                var _this = this;
                this.axios.post(url).then( result => {
                        if (result.data.n === 1 && result.data.ok === 1) {
                            _this.isLike = 0;
                            _this.like -= 1;
                        } else if (result.data.postId && result.data.userId) {
                            _this.isLike = 1;
                            _this.like += 1;
                        } else {
                            _this.popConfig(result.data.msg)
                        }
                    })
                    .catch( function (err) {
                        console.log(err)
                    })
            },
            keepIt: function (type) {
                this.ifShow = false;
                var id = this.$route.params.id;

                var url = API_ROOT+'/post/'+id;
                if (type === 0) {
                    url += '/keep'
                }else if (type === 1) {
                    url += '/keepCancel'
                }
                var _this = this;
                this.axios.post(url).then( result => {
                        if (result.data.n === 1 && result.data.ok === 1) {
                            _this.isKeep = 0;
                            _this.keep -= 1;
                        } else if (result.data.postId && result.data.userId) {
                            _this.isKeep = 1;
                            _this.keep += 1;
                        } else {
                            _this.popConfig(result.data.msg)
                        }
                    })
                    .catch( function (err) {
                        console.log(err)
                    })
            }
        }
    }
    
</script>

<style scoped>
@import '../assets/css/bounce.animate.css';
    .postHeader {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #24292e;
        position: fixed;
        color:#fff;
    }
    .postHeader i.fa-arrow-left {
        font-size: 20px;
        position: absolute;
        top: 9px;
        left: 12px;
        z-index: 999;
    }
    .postHeader i.fa-bars {
        font-size: 20px;
        position: absolute;
        top: 9px;
        right: 12px;
        z-index: 999;
    }
    .postHeader div.headText {
        font-size: 18px;
        font-weight: bold;
        position: absolute;
        display: inline-block;
        width: 100%;
        text-align: center;
    }
    .postDetail {
        padding: 20px;
        padding-top: 60px;
    }

   .postDetail a {
       text-decoration: none;   
       color: #3688c7;
       padding-left: 10px;
   }
   .postInfo {
       padding: 8px 0;
   }

   .postContent {
       padding: 20px 0;
   }
   .postContent div {
       padding: 10px 0;
   }

   .sendMsg {
       width: 100%;
        background-color: #28a745;
        height: 40px;
        line-height: 40px;
        position: fixed;
        bottom: 0;
        text-align: center;
        color: white;
        font-weight: bold;
   }

   .popMore {
       position: absolute;
        /* width: 60px; */
        right: 15px;
        top: 50px;
        box-shadow: 0px 0px 15px #333;
        border-radius: 8px;
   }
   .popMore ul {
        background: white;
        color: black;
        width: 70px;
        border-radius: 8px;
        text-align: center;
        padding: 0;
   }
   .popMore ul li {
       width: 100%;
       display: inline-block;
       border-bottom: 1px solid #ccc;
       margin: 0;
   }
   .popMore ul li:last-child {
       border-bottom: none !important;
   }
   .popMore .triangle {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #fff;
        position: absolute;
        left: 38px;
        top: -9px;
   }
   .postTips {
       list-style: none;
        width: 200px;
        float: left;
        padding: 20px;
   }
   .postTips li {
       float: left;
       padding: 5px 10px;
   }
    .postTips li:first-child {
        padding-left: 0;
    }
    .tagDiv {
        padding: 8px 0;
    }
    .tagUl {
        list-style-type: none;
        padding: 0;
    }
    .tagLi{
        padding: 2px 6px;
        border-radius: 5px;
        color: white;
        display: inline-block;
        margin: 0;
    }
</style>