<template>
    <div>
    <section>
        <div class="postHeader">
            <ul>
                <li @click='back'>返回</li>
                <li class="middle">编辑</li>
                <li>完成</li>
            </ul>
        </div>
    </section>
        
        <div>
            <div class="imgWrap">
                <img :src = "posts.imgUrl" />
            </div>
            <div class="postContent">
                <div style="text-align: center;">
                    <select name="category" id="" @change = 'onSelect'>
                        <option value="0">请选择分类</option>
                        <option v-for = 'cate in categories.categories' :value = "cate.categoryId" >{{cate.name}}</option>
                    </select>
                    <input type="text" placeholder="请输入标题" v-model='title' />
                    <textarea name="" id=""  v-model='content' style="width: 92%;height: 200px;outline: none;resize: none;margin: 0 auto;margin-top: 10px;"></textarea>
                </div>
            </div>
            <div class="toPost" @click='toPost'>
                提交
            </div>
        </div>
    </div>

</template>

<script>
import { mapState } from 'vuex'

 export default {
     data () {
        return {
            title : '',
            content : '',
            imgUrl : '',
            cateId : 0
            
        }
     },
     computed: {
         ...mapState(['posts','categories'])
     },
     methods: {
        onSelect: function () {
            var id = document.querySelector('select').value;
            this.cateId = id;
        },
        back: function () {
          this.$router.go(-1)  
        },
        toPost: function () {
            var _this = this;
            var data = {
                title: this.title,
                content: this.content,
                imgUrl: this.posts.imgUrl
            }
            var oMyForm = new FormData();
            oMyForm.append('title',this.title)
            oMyForm.append('content',this.content)
            oMyForm.append('imgUrl',this.posts.imgUrl)
            oMyForm.append('cateId',this.cateId)
            this.axios.post(API_ROOT+'/post',oMyForm)
                .then(function (result) {
                    if (result.status == 200 && result.data.code == 200) {
                        var url = '/post/' + result.data.data._id;
                        _this.$router.push(url)
                    }
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
     }
 }


</script>

<style scoped>

.postHeader {
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 38px;
    background-color: white;
    padding-bottom: 2px;
    display: block;
}
.postHeader>ul{
    display: table;
    position: relative;
    width:100%;
    height: 38px;
    line-height: 38px;
}

.postHeader>ul li{
    display: table-cell;
    text-align: center;
    width: 33%;
}

.postHeader>ul li:first-child{
    text-align: left;
    padding-left: 10px;
}

.postHeader>ul li:last-child{
    text-align: right;
    padding-right: 10px;
}

.postHeader>ul li:not(.middle) {
    color:#1890ec;
    font-family: 'microsoft yahei';
    font-size: 1rem;
}

.postHeader>ul li.middle {
    color:black;
    font-weight: bolder;
    font-family: 'microsoft yahei';
    font-size: 1rem;
}

.imgWrap{
    text-align: center;
    margin-top: 52px;
}
.imgWrap img {
    width: 92%;
    height: 250px;
    border: 10px solid #4b7598;
    border-radius: 10px;
}
.toPost{
    width: 80%;
    height: 50px;
    background: #1890ec;
    color: white;
    text-align: center;
    line-height: 50px;
    margin: 0 auto;
    font-size: 18px;
    border-radius: 10px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.postContent input{
    width: 92%;
    height: 30px;
    outline: none;
    margin: 10px;
    font-size: 18px;
    line-height: 30px;
}
select[name='category'] {
    background: transparent;
    width: 92%;
    padding: 6px;
    font-size: 16px;
    border: 1px solid #ccc;
    height: 34px;
    margin-top: 20px;
    -webkit-appearance: none;
}
</style>