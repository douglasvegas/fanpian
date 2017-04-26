<template>
    <div>
        <div class="topBar">
            注册
        </div>

        <div id="formWrap">
            <form action="" class="postSignup" id="formData">
                <div :class="{'inputWrap':true,'hasError':ruleResult.name}">
                    <label for="">用户名</label>
                    <input type="text" name="name" autocomplete="off" @blur='handleBlur("name",$event)' maxlength="8" placeholder="英文或字母不超过8位"
                        v-model.trim='ruleForm.name' />
                </div>
                <div :class="{'inputWrap':true,'hasError':ruleResult.psw}">
                    <label for="">密码</label>
                    <input type="password" name="password" autocomplete="off" @blur='handleBlur("psw",$event)' maxlength="12" placeholder="8-12位英文字母下划线组成"
                        v-model.trim='ruleForm.psw' />
                </div>
                <div :class="{'inputWrap':true,'hasError':ruleResult.email}">
                    <label for="">邮箱</label>
                    <input type="text" name="email" autocomplete="off" @blur='handleBlur("email",$event)' v-model.trim='ruleForm.email' />
                </div>
                <div :class="{'inputWrap':true,'hasError':ruleResult.age}">
                    <label for="">年龄</label>
                    <input type="tel" maxlength="2" name="age" autocomplete="off" @blur='handleBlur("age",$event)' v-model.trim='ruleForm.age'>
                </div>
                <div class="inputWrap">
                    <label for="">性别</label>
                    <select name="gender" id="">
            <option value="m">男</option>
            <option value="f">女</option>
            <option value="x">保密</option>
        </select>
                </div>
                <div class="placeholderImg" style="margin-top: 20px;">请选择头像</div>
<input type="file" placeholder="上传头像" class="avatar file" @change='Picture'>
<input type="hidden" placeholder="上传头像" class="avatar file" name="avatar">
<div id="imgWrap">
    <img id="img" :src='imgSrc' v-if='imgSrc !== ""'>
</div>
<input type="button" value="提交" @click='postForm' class="postButton">
<input type="button" value="测试dialog" @click='testDialog' class="postButton" style="display: none;">
<input type="button" value="测试loading" @click='testLoading' class="postButton" style="display: none;">

</form>

<input type="button" value='去登陆' @click='toSignin' class="toSignIn" />
</div>
<transition name="bounce">
    <MyPopAlert :configPop='configPop'></MyPopAlert>
</transition>
<transition name="uptodown">
    <MyPopErr :text='errText'></MyPopErr>
</transition>
</div>
</template>

<script>

    import axios from 'axios'
    import MyPopAlert from './PopAlert.vue'
    import MyPopErr from './PopErr.vue'
    import Bus from '../eventBus/bus.js'
    export default {
        data() {
            return {
                imgSrc: '',
                configPop: {},
                ruleForm: {
                    name: '',
                    psw: '',
                    email: '',
                    age: ''

                },
                ruleResult: {
                    name: '',
                    psw: '',
                    email: '',
                    age: ''
                },
                fieldName: {
                    name: '用户名',
                    psw: '密码',
                    email: '邮箱',
                    age: '年龄',
                },
                rules: {
                    name: [
                        { required: true, msg: '请输入用户名!', trigger: 'blur' },
                        { length: [4, 8], msg: '用户名长度必须4-8位!', trigger: 'blur' }
                    ],
                    psw: [
                        { required: true, msg: '请输入密码!', trigger: 'blur' },
                        { length: [8, 20], msg: '密码应该8-12位!', trigger: 'blur' },
                        { regExp: /^\w{8,12}$/, msg: '密码应该为数字字母下划线组成', trigger: 'blur' }
                    ],
                    email: [
                        { required: true, msg: '请输入邮箱!', trigger: 'blur' },
                        { regExp: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/, msg: '请输入正确的邮箱格式', trigger: 'blur' }
                    ],
                    age: [
                        { required: true, msg: '请输入年龄!', trigger: 'blur' },
                        { regExp: /^[1-9][0-9]$/, msg: '请正确输入年龄!', trigger: 'blur' }
                    ]
                },
                errText: ''
            }
        },
        components: {
            MyPopAlert,
            MyPopErr
        },
        created() {
            Bus.$on('LoginCome',data => {
                console.log(data)
            })
        },
        methods: {
            //表单报错
            showErr(e) {
                this.errText = '错误！' + e.target.value;
            }, 

            //对话框
            testDialog() {
                this.configPop = {
                    type: 'dialog',
                    title: '温馨提示',
                    content: '照片太大、重新上传不大于1M的照片',
                    buttons: [
                        {
                            value: '重新选择',
                            action: function () {
                                console.log('重新选择。。。')
                            }
                        },
                        {
                            value: '取消',
                            action: () => {
                                console.log(this.$children[0].$data.isShow)
                                this.$children[0]._data.isShow = false;
                            }
                        }
                    ]
                }
            },
            //加载。。。
            testLoading() {
                this.configPop = {
                    type: 'loading',
                    title: '注册中....'
                }
            },
            //提交表单
            postForm() {
                if (!this.handlePostValidate()) {
                    return false;
                }

                var _this = this;
                var myForm = document.getElementById('formData');
                var formData = new FormData(myForm);
                _this.testLoading();

                this.axios.post(API_ROOT + '/signup', formData)
                    .then(result => {
                        var json = JSON.parse(result.request.responseText)
                        if (json.code == 200) {
                            this.$router.push('/profile')
                        } else {
                            // this.testDialog();
                            this.errText = json.msg
                        }
                    }).catch(function (err) {
                        console.log(err)
                    })
            },
            //头像压缩
            Picture(e) {
                console.log(e)
                var allowExt = ['jpg', 'gif', 'bmp', 'png', 'jpeg'];
                var ua = navigator.userAgent;
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
                            w = 380 || w;
                            h = (w / scale);
                            var quality = 0.7;  // 默认图片质量为0.7

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
                            _this.imgSrc = base64;
                            document.querySelector('input[name="avatar"]').value = base64;
                            console.log("压缩后：" + base64.length / 1024 + " ");
                        }

                    }
                    reader.readAsDataURL(file[0])
                }

            },
            //去登录页
            toSignin() {
                this.$router.push('/signin')
            },
            //校验
            handleBlur(field, e) {
                let value = e.target.value;
                let rules = this.rules[field];
                for (let i = 0; i < rules.length; i++) {
                    for (var key in rules[i]) {
                        if (key === 'required') {
                            if (!value) {
                                this.errText = rules[i]['msg'];
                                this.ruleResult[field] = true;
                                return;
                            }
                        }
                        if (key === 'regExp') {
                            let reg = new RegExp(rules[i]['regExp'])
                            if (!reg.test(value)) {
                                this.errText = rules[i]['msg'];
                                this.ruleResult[field] = true;
                                return;
                            }
                        }
                        if (key === 'length') {
                            var min = parseInt(rules[i]['length'][0]),
                                max = parseInt(rules[i]['length'][1]),
                                len = parseInt(value.length);
                            if (len < min || len > max) {
                                this.errText = rules[i]['msg'];
                                this.ruleResult[field] = true;
                                return;
                            }
                        }
                    }
                    this.ruleResult[field] = false; //无错
                }
            },
            //提交时再校验
            handlePostValidate() {
                for (let key in this.ruleResult) {
                    if (this.ruleResult[key] !== false) {
                        console.log(this.ruleResult[key] )
                        this.errText = '你确定' + this.fieldName[key] + '写对了么？';
                        return false;
                    }
                }
                //校验
                if (!document.querySelector('input[name="avatar"]').value) {
                    this.errText = '请选择头像';
                    return false;
                }
                return true;
            }
        }
    }
</script>

<style scoped>

input:-webkit-autofill,select:-webkit-autofill {    
    -webkit-box-shadow: 0 0 0px 1000px white  inset !important;    
}   
input{  
    outline-color: invert ;  
    outline-style: none ;  
    outline-width: 0px ;  
    border: none ;  
    border-style: none ;  
    text-shadow: none ;  
    -webkit-appearance: none ;  
    -webkit-user-select: text ;  
    outline-color: transparent ;  
    box-shadow: none;  
}  
#formData input {
    width: 78%;
    height: 33px;
    line-height: 33px;
    outline-style: none;
    text-indent: 12px;
}

.postButton {
    background: #289bf3;
    color: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
}
.topBar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 38px;
    background-color: white;
    padding-bottom: 2px;
    display: block;
    text-align: center;
    line-height: 38px;
}
#formWrap {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 100%;
    left: 100%;
    text-align: center
}
#formData {
    position: absolute;
    top: -50%;
    left: -50%;
    transform: translate(-50%,-50%);
    width: 90%;
    border-radius:10px;
    background-color: #FFF;
    box-shadow: 0 0 10px #6a737d;
}


#formData .mask {
    width: 100%;
    height: 405px;
    background: #ccc;
    opacity: 0.3;
    position: absolute;
    top: -25px;
    left: 0;
    z-index: -1;
}

.postSignup{
    width: 100%;
}
.postSignup input {
    width: 80%;
    height: 30px;
    margin-bottom: 10px;
    outline-style: none;
}
.postSignup input[name='gender'] {
    border: none;
}

select[name='gender'] {
    background: transparent;
    width: 80%;
    padding: 6px;
    font-size: 16px;
    border: none;
    height: 34px;
    -webkit-appearance: none;
    margin-bottom: 20px;
    outline: none;
}
.file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
    line-height: 20px;
    top: -34px;
    opacity: 0;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}

.placeholderImg {
    width: 80%;
    height: 36px;
    background: #db4437;
    margin: 0 auto;
    border-radius: 5px;
    line-height: 36px;
    color: white;
}

#img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
}

.inputWrap {
    height: 43px;
    line-height: 43px;
    position: relative;
}
.inputWrap::after {
    position: absolute;
    right: 0;
    bottom: 0px;
    left: 15px;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
}

.hasError::after {
    position: absolute;
    right: 0;
    bottom: 0px;
    left: 15px;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #ff4949;
}
#formData label{
    width: 20%;
    float: left;
}

.toSignIn{
    position: fixed;
    top: 8px;
    left: 10px;
    background: rgba(40, 155, 243, 0.73);
    color: #fafbfc;
    border-radius: 2px;
}

@import '../assets/css/bounce.animate.css';
@import '../assets/css/uptodown.animate.css';

</style>