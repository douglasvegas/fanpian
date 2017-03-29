<template>
    <div>
        <div class="postHeader">
            <i class="fa fa-arrow-left fa-3" @click='back'></i>
            <div class="headText">评论详情</div>
        </div>
        <div style="display: block;width: 100%;height: 38px;">
        </div>
        <div class="commentContent">
            
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                comments:[]
            }
        },
        mounted() {
            console.log('91291200')
        },
        methods: {
            back: function () {
                this.$router.go(-1);
            },
        }
    }
</script>

<style scoped>
     .postHeader {
        width: 100%;
        height: 38px;
        line-height: 38px;
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
</style>