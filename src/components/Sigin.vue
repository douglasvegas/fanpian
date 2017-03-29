<template>
<div>
    <div class="topBar">
        登录
    </div>
    <div id="formWrap">
        <form action="" id="formData" enctype="multipart/form-data">
            <div class="inputWrap"><label for="">账号  </label>
                <input type="text" name="name" maxlength="8" autocomplete="off" class="loginInput" style="background-color: #ccc;" ref='name'></div>
                <div class="inputWrap"><label for="">密码  </label><input type="password" name="password" autocomplete="off" class="loginInput" ref='psw'></div>
                <div class="buttonWrap"><input type="button" value='登录' @click='toLogin' class="postButton" /></div>
                <div class="buttonWrap"><input type="button" value='快速登录' @click='toLoginFast' class="postButton" /></div>
                <div class="buttonWrap"><a>找回密码</a></div>
        </form>
    <input type="button" value='去注册' @click='toSignup' class="toSignUp" />
    </div>
    <transition name="bounce">
        <MyPopAlert :configPop='configPop'></MyPopAlert>
    </transition>
</div>
</template>

<script>
    import MyPopAlert from './PopAlert.vue';
    import Bus from '../eventBus/bus.js';
    export default {
        data() {
            return {
                configPop: {}
            }
        },
        components: {
            MyPopAlert
        },
        methods: {
            testDialog: function (data) {
                this.configPop = {
                    type: 'dialog',
                    title: '温馨提示',
                    content: data.content || '照片太大、重新上传不大于1M的照片',
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
            toSignup: function () {
                Bus.$emit('LoginCome','i‘m coming!!')
                this.$router.push('/signup')
            },
            toLoginFast: function () {
                var _this = this;
                var formData = new FormData();
                formData.append('name','testtest')
                formData.append('password','12345678')
                _this.testDialog({ content: '正在登录...' });
                this.axios.post(API_ROOT + '/signin', formData)
                    .then(result => {
                        if (result.status == 200) {
                            var json = JSON.parse(result.request.responseText)
                            if (json.code == 200) {
                                _this.$router.push('/profile')
                            } else {
                                _this.testDialog({ content: json.message });
                            }
                        }
                    }).catch(function (err) {
                        console.log(err)
                    })
            },
            toLogin: function () {
                var _this = this;
                if(!this.$refs.name.value) {
                    _this.testDialog({ content: '请填写用户名' });
                    return;
                }
                if(!this.$refs.psw.value) {
                    _this.testDialog({ content: '请填写密码' });
                    return;
                }
                var myForm = document.getElementById('formData');
                var formData = new FormData(myForm);
                _this.testDialog({ content: '正在登录...' });
                this.axios.post(API_ROOT + '/signin', formData)
                    .then(result => {
                        if (result.status == 200) {
                            var json = JSON.parse(result.request.responseText)
                            if (json.code == 200) {
                                _this.$router.push('/profile')
                            } else {
                                _this.testDialog({ content: json.message });
                            }
                        }
                    }).catch(function (err) {
                        console.log(err)
                    })
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
    width: 92%;
    background: #FFF;
    border-radius: 10px;
    box-shadow: 0 0 10px #6a737d;
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

.inputWrap {
    height: 33px;
    line-height: 33px;
    width: 80%;
    margin: 0 auto;
    position: relative;
    margin-bottom: 20px;
    margin-top: 20px;
    
}
.inputWrap::after {
    position: absolute;
    right: 0;
    bottom: -2px;
    left: 15px;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
}
#formData input.loginInput {
    width: 80%;
    height: 33px;
    line-height: 33px;
    outline-style: none;
    background-color: #fff !important;
    box-shadow: none;
    text-indent: 10px;
}

.buttonWrap {
     margin-bottom: 20px;
}
.buttonWrap  .postButton {
    background: #289bf3;
    color: white;
    height: 33px;
    line-height: 33px;
    border-radius: 5px;
    width: 80%;
}
.toSignUp{
    position: fixed;
    top: 8px;
    right: 10px;
    background: rgba(40, 155, 243, 0.73);
    color: #fafbfc;
    border-radius: 2px;
}

@import '../assets/css/bounce.animate.css';
</style>