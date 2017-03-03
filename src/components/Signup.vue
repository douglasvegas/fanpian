<template>
<div>
<div class="topBar">
    注册
</div>

 <div id="formWrap">
    <form action="" class="postSignup" id="formData">
        <input type="text" placeholder="请填写姓名" name="name"><br />
        <input type="password" placeholder="密码" name="password"><br />
        <input type="number" placeholder="手机号" maxlength="11" name="phone"><br />
        <input type="number" placeholder="年龄" maxlength="2" name="age"><br />
        <select name="gender" id="">
            <option value="m">男</option>
            <option value="f">女</option>
            <option value="x">保密</option>
        </select><br />
        <input type="file" placeholder="上传头像" class="avatar" name="avatar" >
        <input type="button" value="提交" @click = 'postForm' class="postButton">
    </form>
</div>
</div>    
</template>

<script>
    import axios from 'axios'

    export default {
        methods: {
            postForm: function () {
                var _this = this;
                var myForm = document.getElementById('formData');
                var formData = new FormData(myForm);

                axios.post('http://localhost:3000/signup',formData)
                    .then(function (result) {
                        var json = JSON.parse(result.request.responseText)
                        if (json.code == 200) {
                            _this.$router.push('/profile')
                        }
                    }).catch(function (err){
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
    width: 100%;
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
    border: 1px solid #ccc;
}

select {
    border: solid 1px #000;
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    padding-right: 14px;
}
</style>