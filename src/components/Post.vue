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
            <div style="display: block;width: 100%;height: 38px;">
            </div>
        </section>
            
        <div>
            <div class="imgWrap" v-if='ifHasPic'>
            <img :src = "imgUrl" />

            <i class="fa fa-cloud-upload fa-3x" aria-hidden="true" id="uploadIcon" v-show='imgUrl === ""'
            style="position: absolute;display: block;left: 44%;top: 44%;color:#666;"></i>
                
            <input type="file" class="uploadImg" @change='upPhoto' />
            <input type="hidden" name="uploadImg"/>
            </div>
            
            <div class="postContent">
                <div style="text-align: center;">
                    <select name="category" id="" @change = 'onSelect'>
                        <option value="0">请选择分类</option>
                        <option v-for = 'cate in categories.categories' :value = "cate.categoryId" >{{cate.name}}</option>
                    </select>
                    <input type="text" placeholder="请输入标题" v-model.trim='title' />
                    <textarea name="" id=""  v-model.trim='content' style="width: 92%;height: 200px;outline: none;resize: none;margin: 0 auto;margin-top: 10px;border:none;border-radius: 5px;"></textarea>
                </div>
            </div>
            <div class="toPost" @click='toPost'>
                提交
            </div>
        </div>
        <transition name="bounce">
            <MyPopAlert :configPop='configPop'></MyPopAlert>
        </transition>
    </div>
</template>

<script>

import MyPopAlert from './PopAlert.vue';
import { mapState,mapMutations } from 'vuex';

import isLogin from '../common/checkLogin';

import Vue from 'vue';
// Vue.filter('cut_blank', function (value) {
//     if (!value) { return ''}
//     value = value.toString()
//     return value.replace(/^\s+|\s+$/g,'');
// })
// var cutBlank = Vue.filter('cut_blank');

 export default {
     data () {
        return {
            title : '',
            content : '',
            imgUrl : '',
            cateId : 0,
            configPop: {},
            isLogin: isLogin(),
            ifHasPic: true
        }
     },
     mounted() {
         var id = this.$route.params.id;
         if (id == 0) {
            this.ifHasPic = true;
         }else if (id == 1) {
            this.ifHasPic = false;
         }
         console.log(id)
     },
     computed: {
         ...mapState(['posts','categories'])
     },
     components:{
         MyPopAlert
     },
     methods: {
         ...mapMutations(['RESET_FETCH']),
         toLogin: function (data) {
            this.configPop = {
                type: 'dialog',
                title: '温馨提示',
                content: '必须先登录才能发表文章哦～',
                buttons: [
                    {
                        value: '去登录',
                        action: () => {
                            this.$router.push('/signin')
                        }
                    },
                    {
                        value: '回去逛逛',
                        action: () => {
                            this.$router.go(-1);
                        }
                    }
                ]
            }
        },
        handleBlank: function (text) {
            this.configPop = {
                    type: 'dialog',
                    title: '温馨提示',
                    content: text,
                    buttons: [
                        {
                            value: '关闭',
                            action: () => {
                                console.log(this.$children[0].$data.isShow)
                                this.$children[0]._data.isShow = false;
                            }
                        }
                    ]
                }
        },
        //加载。。。
        posting() {
            this.configPop = {
                type: 'loading',
                title: '提交中....'
            }
        },
        onSelect: function () {
            var id = document.querySelector('select').value;
            this.cateId = id;
        },
        back: function () {
          this.$router.go(-1)  
        },
        upPhoto: function (e) {
      
            var file = e.target.files;
            var _this = this;
            if (file) {
                var reader = new FileReader();
                reader.onload = function () {
                    console.log("压缩前：" + this.result.length / 1024 + " ");
                    //创建图片
                    var img = new Image();
                    img.src = this.result;
                    img.onload = function () {
                        var that = this;
                        // 默认按比例压缩
                        var w = that.width,
                        h = that.height,
                        scale = w / h;
                        w = 500 || w;
                        h = (w / scale);
                        var quality = 0.8;  // 默认图片质量为0.7

                        //生成canvas
                        var canvas = document.createElement('canvas');
                        var ctx = canvas.getContext('2d');
                        // 创建属性节点
                        var anw = document.createAttribute("width");
                        anw.nodeValue = w;
                        var anh = document.createAttribute("height");
                        anh.nodeValue = h;
                        canvas.setAttributeNode(anw);
                        canvas.setAttributeNode(anh); 
                        ctx.drawImage(that, 0, 0, w, h);

                        var base64 = canvas.toDataURL('image/jpeg', 0.7);
                        _this.imgUrl = base64;
                        document.querySelector('input[name="uploadImg"]').value = base64;
                        console.log("压缩后：" + base64.length / 1024 + " ");
                        }
                                
                            }
                            reader.readAsDataURL(file[0])
                        }
        

        },
        toPost: function () {
             if (this.isLogin == false) {
                 this.toLogin();
                 return;
             }
            if(this.ifHasPic && !this.imgUrl) {
                this.handleBlank('请选择一张相片');
                return false;
            } 
            if (this.cateId === 0) {
                this.handleBlank('请选择分类');
                return false;
            }
            if(!this.title) {
                this.handleBlank('请输入标题');
                return false;
            }
            if(!this.content) {
                this.handleBlank('请输入内容');
                return false;
            }
            var oMyForm = new FormData();
            oMyForm.append('title',this.title)
            oMyForm.append('content',this.content)
            if(this.imgUrl) {
                oMyForm.append('imgUrl',this.imgUrl)
            }
            oMyForm.append('cateId',this.cateId);
            this.posting();
            this.axios.post(API_ROOT+'/post',oMyForm)
                .then(result => {
                    if (result.status == 200 && result.data.code == 200) {
                        var url = '/post/' + result.data.data._id;
                        this.$router.push(url);
                        this.RESET_FETCH();
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
    margin-top: 16px;
    position: relative;
}
.imgWrap img {
    width: 92%;
    height: 250px;
    box-shadow: 0px 0px 12px #24292e;
    border-radius: 10px;
}
.toPost{
    width: 90%;
    height: 40px;
    background: #1890ec;
    color: white;
    text-align: center;
    line-height: 40px;
    margin: 0 auto;
    font-size: 18px;
    border-radius: 5px;
    margin-top: 20px;
    margin-bottom: 20px;
}
.postContent input{
    width: 92%;
    outline: none;
    margin: 10px;
    font-size: 18px;
    padding: 8px 2px;
    border: none;
    border-radius: 5px;
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
    outline: none;
}

.uploadImg {
    /* float: left; */
    opacity: 0;
    position: absolute;
    width: 92%;
    height: 98%;
    z-index: 99;
    /* margin: 0 auto; */
    /* margin-left: -41%; */
    border: 1px solid #ccc;
    /* left: -51%; */
    /* top: -50%; */
    left: 4%;
    /* top: -3%; */
}
@import '../assets/css/bounce.animate.css';
</style>