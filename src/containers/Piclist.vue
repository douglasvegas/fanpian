<template>
    <div class = "picList">
        <div>
            <ul class="imgList">
                <PicItem v-for = 'info in infos' :info = 'info'></PicItem>
            </ul>
        </div>
        <div class="fill-footer"></div>
    </div>    
</template>

<script>
import PicItem from '../components/PicItem.vue'
var axios = require('axios');
var Promise = require('es6-promise').polyfill();
var Axios = axios.create({
  promise: Promise
});
  export default {
       components: {
           PicItem
       },
        mounted () {
            var _this = this;
            Axios.get('http://localhost:3000/picList')
                .then(function (response) {
                    console.log(response)
                    if (response.status == 200 && response.data.picList.picList.length > 0) {
                        _this.infos = response.data.picList.picList
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, 
        data () {
          return {
            infos: [
                    {
                        title:'测试1',
                        author:'作者1',
                        src : 'src/assets/img/1.jpg',
                        scanCount: 123,
                        commentCount: 65,
                        praiseCount: 22
                    },
                    {
                        title:'测试2',
                        author:'作者2',
                        src : 'src/assets/img/2.jpg',
                        scanCount: 123,
                        commentCount: 65,
                        praiseCount: 22
                    },
                    {
                        title:'测试3',
                        author:'作者1',
                        src : 'src/assets/img/3.jpg',
                        scanCount: 222,
                        commentCount: 12,
                        praiseCount: 33
                    },
                    {
                        title:'测试4',
                        author:'作者4',
                        src : 'src/assets/img/4.jpg',
                        scanCount: 123,
                        commentCount: 65,
                        praiseCount: 22
                    },
                    {
                        title:'测试1',
                        author:'作者1',
                        src : 'src/assets/img/5.jpg',
                        scanCount: 123,
                        commentCount: 65,
                        praiseCount: 22
                    },
                    {
                        title:'测试1',
                        author:'作者1',
                        src : 'src/assets/img/6.jpg',
                        scanCount: 123,
                        commentCount: 65,
                        praiseCount: 22
                    }
                ]
            }
      }
  }
</script>

<style>
.picList {
    height: auto;
    width: 100%;  
}

.imgList {
    padding: 10px 5px;
    color:rgba(255, 255, 255, 0.9);
}

.imgList>li {
    padding-bottom: 7px;
    position: relative;
    width: 100%;
    margin:0;
}

.imgList img {
    width: 100%;
    height: 150px;
    border-radius: 10px;
}

.wrapContent {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.wrapContent p {
    font-weight: bold;
    font-size: 16px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: absolute;
    top: 12px;
    width: 90%;
    left: 16px;
    text-shadow: 1px 1px 4px rgb(10, 10, 10);
}
.wrapContent>span {
    position: absolute;
    top: 38px;
    left: 16px;
    font-size: 10px;
}
.wrapContent>ul {
    position: absolute;
    left: 0.7rem;
    bottom: 1rem;
    font-size: 0.8rem;
}


h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
}

a {
  color: #000000;
}

</style>

