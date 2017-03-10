<template>
<div>
    <div class="postHeader">
        <i class="fa fa-arrow-left fa-3" @click='back'></i>
        <div class="headText">文章详情</div>
        <i class="fa fa-bars fa-3" @click='more'></i>
        <div class="popMore">
            <span class="triangle"></span>
            <ul>
                <li>作者主页</li>
                <li>收藏</li>
                <li>分享</li>
            </ul>
        </div>
    </div>
    <div class="postDetail">
        <h2> 
        {{title}}
        </h2>
        <div class="postInfo">
            <span>{{time}}</span>
            <a href="javascript:;">{{author}}</a>
        </div>
        <div class="postContent  markdown-body entry-content">
            <img :src="imgUrl" alt="" style="width: 100%;">
            <div v-html='content'>
            </div>
        </div>
        

    </div>
    <div class="sendMsg">
        发表留言
    </div>
</div>
</template>

<script>    
    var moment = require('moment');
    import VueRouter from 'vue-router';
    let router = new VueRouter();

    export default {
        data() {
            return {
                title:'',
                content:'',
                time:'',
                author:'',
                imgUrl:''
            }
        },
        mounted(){
            var id = this.$route.params.id;
            var _this = this;
            this.axios.post(API_ROOT+'/post/'+id)
                .then(function (result) {
                    if (result.status == 200 && result.data) {
                        var json = result.data[0];
                        json.create_date = moment(json.create_date).format().replace('T',' ').split('+')[0];
                        _this.title = json.title;
                        _this.content = json.content;
                        _this.time = json.create_date.split(" ")[0];
                        _this.author = json.author.name;
                        _this.imgUrl = json.imgUrl;
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        },
        methods: {
            back: function () {
                router.back();
            },
            more: function () {
                console.log('more')
            }

        }
    }
    
</script>

<style>
    .postHeader {
        width: 100%;
        height: 52px;
        line-height: 52px;
        background-color: #24292e;
        position: fixed;
        color:#fff;
    }
    .postHeader i.fa-arrow-left {
        font-size: 20px;
        position: absolute;
        top: 15px;
        left: 12px;
        z-index: 999;
    }
    .postHeader i.fa-bars {
        font-size: 20px;
        position: absolute;
        top: 15px;
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
   }
   .postInfo {
       padding: 8px;
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
        height: 50px;
        line-height: 50px;
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
       border: none;
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
</style>