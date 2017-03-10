<template>
<div>
<div class="topBar">
    登录
</div>

 <div id="formWrap">
    <form action="" id="formData">
        <input type="text" name="name" autocomplete="off"><br />
        <input type="password" name="password" autocomplete="off"><br />
        <input type="button" value = '登录' @click = 'toLogin' class="postButton"/>
        <input type="button" value = '去注册' @click = 'toSignup' class="postButton"/>
        <div class="mask"></div>
    </form>
</div>
</div>
</template>

<script>

    import axios from 'axios'
    axios.defaults.withCredentials = true
    export default {
        methods: {
            toSignup: function () {
                this.$router.push('/signup')
            },
            toLogin: function () {
                var _this = this;
                var myForm = document.getElementById('formData');
                var formData = new FormData(myForm);

                this.axios.post(API_ROOT + '/signin',formData)
                    .then(function (result) {
                        if (result.status == 200) {
                            var json = JSON.parse(result.request.responseText)
                            if (json.code == 200) {
                                _this.$router.push('/profile')
                            }
                        }
                    }).catch(function (err) {
                        console.log(err)
                    })
            }
        }
    }
    
</script>

<style>
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
    width: 80%;
    height: 33px;
    font-size: 22px;
    line-height: 33px;
    outline-style: none;
    text-indent: 5px;
    margin-bottom: 25px;
}

.postButton {
    background: #289bf3;
    color: white;
    height: 50px;
    line-height: 50px;
    border-radius: 5px;
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
    width: 100%;
}
#formData .mask {
    width: 100%;
    height: 266px;
    background: #ccc;
    opacity: 0.3;
    position: absolute;
    top: -25px;
    left: 0;
    z-index: -1;
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
</style>
