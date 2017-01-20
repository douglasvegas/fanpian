<template>
    <div>
        <div class="profileHeader">
            <ul>
                <li>设置</li>
                <li class="middle">我的</li>
                <li>分享专栏</li>
            </ul>
        </div>
        <div class="headerBlock"></div>
        <div class="profileWrap">
            <div class="profileItem">
                <div class="topDiv">
                    <div class="isLeft">
                        <img src="http://p3.pstatp.com/large/4d0008d1c73fa6ee1f" class="avatar" />
                    </div>
                    <div class="isRight">
                        <p>DouglasVegas</p>
                        <br />
                        <p>123</p>
                    </div>
                </div>
                <div class="bottomDiv">
                    <ul>
                        <li>
                            <span>123</span>
                            <p>收藏</p>
                        </li>
                        <li class="middle">
                            <span>55</span>
                            <p>关注</p>
                        </li>
                        <li>
                            <span>90</span>
                            <p>粉丝</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>

<style>
.profileHeader {
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 38px;
    background-color: white;
    padding-bottom: 2px;
    display: block;
}
.headerBlock {
    top:0;
    left: 0;
    width: 100%;
    height: 38px;
    display: block;
    margin-bottom: 20px;
}

.profileItem {
    width: 90%;
    height: 136px;
    border-radius: 10px;
    margin: 0 auto;
    background-color: white;
    border:1px solid rgba(204,204,204, 0.6);
    position: relative;
}

.profileItem div.topDiv {
    width: 80%;
    margin: 0 auto;
    height: 50px;
    padding-top: 10px;
}



.profileItem .isLeft {
    width: 20%;
    display: inline-block;
}

.profileItem .isRight {
    width: 80%;
    float: right;
}


.profileItem .bottomDiv {
    position: absolute;
    width: 100%;
    height: 50px;
    bottom:0;
    left:0;
    border: 1px solid #ccc;
    border-left: none;
    border-right: none;
    border-bottom: none;
}

.bottomDiv>ul {
    width: 100%;
    margin: 0 auto;
    text-align: center;
}

.bottomDiv>ul li {
    display: inline-block;
    margin: 0 10px;
    padding: 2% 7%;
}

.profileHeader>ul{
    display: table;
    position: relative;
    width:100%;
    height: 38px;
    line-height: 38px;
}

.profileHeader>ul li{
    display: table-cell;
    text-align: center;
    width: 33%;
}

.profileHeader>ul li:first-child{
    text-align: left;
    padding-left: 10px;
}

.profileHeader>ul li:last-child{
    text-align: right;
    padding-right: 10px;
}

.profileHeader>ul li:not(.middle) {
    color:#1890ec;
    font-family: 'microsoft yahei';
    font-size: 1rem;
}

.profileHeader>ul li.middle {
    color:black;
    font-weight: bolder;
    font-family: 'microsoft yahei';
    font-size: 1rem;
}


.profileWrap img.avatar{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

</style>