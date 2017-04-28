<template>
    <div>
        <div class="postHeader">
            <i class="fa fa-arrow-left fa-3" @click='back'></i>
            <div class="headText">评论详情</div>
        </div>
        <div style="display: block;width: 100%;height: 38px;">
        </div>
        <div class="commentContent">
            <ul>
                <CommentList :comments = 'comments' v-for = '(comment, index) in comments' 
                :comment = 'comment' :index = 'index'></CommentList>
            </ul>
        </div>
        <div style="display: block;width: 100%;height: 70px;"></div>
        <div class="commontInput">
            <div contenteditable="true"  id="contentDiv" placeholder="请发表评论..." ref = 'inputComment' @click = 'setFocus'></div>
            <textarea v-if='isLogin' placeholder="请发表评论" v-model.trim = 'content' ref = 'inputCtx'></textarea>
            <textarea v-else placeholder="登陆才可以发表评论" disabled></textarea>
            <span v-if='isLogin' @click='postComment'>发表</span>  
            <span v-else @click='toLogin'>登录</span>  
        </div>
        <transition name="bounce">
            <MyPopAlert :configPop='configPop' v-show='ifShow'></MyPopAlert>
        </transition>
    </div>
</template>
<script>
    import CommentList from './CommentItem.vue';
    import isLogin from '../common/checkLogin';
    import Bus from '../eventBus/bus.js';
    import MyPopAlert from './PopAlert.vue';
    export default {
        data () {
            return {
                comments:[],
                content:'',
                quoteId: null,
                quoteName:null,
                configPop: {},
                ifShow: true,
                isLogin: isLogin()
            }
        },
        watch: {
            quoteName: function (newValue, oldValue) {
                var oldStr = '@' + oldValue + ': ';
                var newStr = '@' + newValue + ': ';
                if (!oldValue) {
                    this.content = this.content.replace('',newStr);
                }else{
                    this.content = this.content.replace(oldStr,newStr);
                }
                this.$refs.inputCtx.focus()
            },
            content: function (newValue, oldValue) {
                var newStr = '@' + newValue + ': ';
                if (oldValue && newValue.indexOf(newStr) == -1 && !newValue) {
                    this.quoteId = null;
                    this.quoteName = null;
                }
            }
        },
        components:{
            CommentList,
            MyPopAlert
        },
        mounted() {
            var id = this.$route.params.id;
            Bus.$on('reply',(replyName,replyId) => {
                this.quoteName = replyName;
                this.quoteId = replyId;
            });
            this.getComments();
        },
        methods: {
            back: function () {
                this.$router.go(-1);
            },
            setFocus: function () {
                this.$refs.inputComment.focus();
            },
            testLoading() {
                this.configPop = {
                    type: 'dialog',
                    title: '评论不能为空....',
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
            testSuccess() {
                this.configPop = {
                    type: 'loading',
                    title: '发表成功'
                }
            },
            postComment: function () {
                 this.ifShow = true;
                var id = this.$route.params.id;
                var url = API_ROOT+'/comment/' + id + '/create';
                var data = {},
                    repStr = '';
                if (this.quoteName) {
                    repStr = '@' + this.quoteName + ': ';
                }
                
                data.content = this.content.replace(repStr,'');
                data.quoteId = this.quoteId;
                data.quoteName = this.quoteName;
                if(!data.content) {
                    this.testLoading();
                    return;
                }
                this.axios.post(url,data)
                    .then(result => {
                        if (result.status === 200 && result.data.code === 200) {
                            this.getComments();
                            this.content = '';
                            this.quoteId = null;
                            this.quoteName = null;
                            this.testSuccess();
                            var _this = this;
                            setTimeout(function () {
                                _this.ifShow = false;
                            }, 1000)
                            
                        }
                    }).catch( err => {

                    })
            },
            getComments: function () {
                var id = this.$route.params.id;
                var url = API_ROOT+'/comment/' + id ;
                this.axios.post(url)
                    .then(result => {
                       if (result.status == 200 && result.data.length > 0) {
                            this.comments = result.data;
                        }
                    }).catch( err => {

                    })
            },
            toLogin: function () {
                this.$router.push('/signin')
            }
        }
    }
</script>

<style scoped>
     .postHeader {
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: #24292e;
        position: fixed;
        color:#fff;
        z-index: 99999;
        opacity: 0.9;
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
    .commontInput {
        position: fixed;
        bottom: 0;
        width: 100%;
        left: 0;
        background: #24292e;
        height: 40px;
    }
    #contentDiv {
        background: white;
        outline: none;
        width: 85%;
        overflow: hidden;
        overflow-y: auto;
        border-radius: 5px;
        min-height: 40px;
        max-height: 50px;
        padding: 2px;
        display: inline-block;
        float: left;
        background: white;
        display: none;
    }
    .commontInput textarea {
        width: 85%;
        display: inline-block;
        outline: none;
        resize: none;
        padding: 2px;
        float: left;
        height: 40px;
    }
    #contentDiv:empty:before{
        content:attr(placeholder);
        font-size: 16px;
        color: #ccc;
    }
    #contentDiv:focus{
        content:none;
        color: green;
    }
    .commontInput span {
        color: #f5f5f5;
        font-size: 18px;
        font-weight: bold;
        width: 15%;
        display: inline-block;
        line-height: 40px;
        text-align: center;
    }
    ul{
        list-style: none;
        width: 100%;
        padding-left: 40px;
        padding-top: 20px;
        padding-right: 20px;
    }
    @import '../assets/css/bounce.animate.css';
</style>