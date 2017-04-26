<template>
<li>
    <img :src=  "'http://www.douglasvegas.com/api' + comment.author.avatar"  alt="">
    <div class="commentHeader">
        <div class="authorInfo">
            <span class='authorName'>
                {{comment.author.name}}
            </span>
            <span class="ifSelf" v-show='false'>作者</span>
            <span class="createTime" style="">
                2017-04-04
            </span>
        </div>
        <div class="commentInfo">
            <span class="like">
                <i class="fa fa-thumbs-up" @click='likeIt(comment._id)'></i> {{getCommentLikes}}
            </span>
            <span class="location">#{{index + 1}}</span>
        </div>
    </div>
    <div class='quoteComment' v-if = 'comment.quoteId != null'>
        <a href="javascript:;">{{comment.quoteName}}</a>
        {{comment.quoteId.content}}
    </div>
    <div class="singleContent" @click = 'reply' :data-name='comment.author.name' :data-commentId = 'comment._id'>
        {{comment.content}}
    </div>
</li>
</template>

<script>
    import Bus from '../eventBus/bus.js';
    export default {
        props:['comment','index'],
        data() {
            return {
                getCommentLikes: this.comment.like
            }
        },
        methods: {
            reply: function (e) {
                var name = e.target.getAttribute('data-name');
                var commentId = e.target.getAttribute('data-commentId');
                
                var commentId = commentId;
                Bus.$emit('reply',name, commentId)
            },
            likeIt: function (id) {
                this.getCommentLikes += 1;
            }
        }
    }
</script>

<style scoped>
    a {
        color: #0366d6;
    }
    li {
        width: 100%;
        min-height: 78px;
        position: relative;
        margin-bottom: 15px;
    }
    li>img {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        position: absolute;
        left: -35px;
    }
    li>div {
        width: 100%;
    }
    .commentHeader {
        height: 30px;line-height: 30px;
    }
    .commentHeader>div {
        display: inline-block;
    }
    .commentHeader .commentInfo {
        float: right;
    }
    .commentHeader .commentInfo>span.like {
        margin-right: 10px;
    }
    .commentHeader .authorName {
        font-size: 16px;
        font-weight: bold;
    }
    .commentHeader .ifSelf {
        background-color: #0366d6;
        border-radius: 5px;
        padding: 0px 6px;
        color: white;
    }
    .commentHeader .createTime {
        color: #aaa;
    }
    .quoteComment {
        padding: 8px;
        background: #ddd;
        max-height: 56px;
        overflow: auto;
    }
    .singleContent {
        padding: 10px 0px 15px;
        border-bottom: 1px solid #ccc;
    }    
</style>