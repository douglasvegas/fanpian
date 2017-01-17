<template>
    <div class = "picList">
        <div>
            <ul class="imgList">
                <li v-for = 'info in infos' class="imgItem">
                    <img :src = "info.src" />
                    <div class="wrapContent">
                        <p>{{info.title}}</p>
                        <span>{{info.author}}</span>
                        <ul>
                            <li>
                                <i class="toTop fa fa-eye"></i>
                                <span>{{info.scanCount}}</span>
                            </li>
                            <li>
                                <i class="toTop fa fa-thumbs-up"></i>
                                <span>{{info.praiseCount}}</span>
                            </li>
                            <li>
                                <i class="toTop fa fa-comment"></i>
                                <span>{{info.commentCount}}</span>
                            </li>
                        </ul>
                    </div>
                    
                </li>
            </ul>
        </div>
        <div class="fill-footer"></div>
    </div>    
</template>

<style>
.picList {
    height: auto;
    width: 100%;  
}

.imgList {
    padding: 10px 5px;
    color:rgba(255, 255, 255, 0.9)
}

.imgList>li {
    padding-bottom: 7px;
    position: relative
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
    font-size: 1.2rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
    text-shadow:1px 1px 4px rgb(10, 10, 10)
}
.wrapContent>span {
    position: absolute;
    top: 2.6rem;
    left: 1rem;
    font-size: 0.8rem;
}
.wrapContent>ul {
    position: absolute;
    left: 0.7rem;
    bottom: 1rem;
    font-size: 0.8rem;
}
.fill-footer {
    width: 100%;
    height: 34px;
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
  margin: 0 10px;
}

a {
  color: #000000;
}

</style>

<script>

  var axios = require('axios');
  export default {
        mounted () {
            var _this = this;
            axios.get('http://localhost:3000/picList')
                .then(function (response) {
                    console.log(response)
                    if (response.status == 200 && response.data.picList.picList.length > 0) {
                        _this.infos = response.data.picList.picList
                        console.log(_this.infos)
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
                        src : 'src/assets/1.jpg',
                        scanCount: 123,
                        commentCount: 65,
                        praiseCount: 22
                    },
                    {
                        title:'测试2',
                        author:'作者2',
                        src : 'src/assets/2.jpg',
                        scanCount: 123,
                        commentCount: 65,
                        praiseCount: 22
                    },
                    {
                        title:'测试3',
                        author:'作者1',
                        src : 'src/assets/3.jpg',
                        scanCount: 222,
                        commentCount: 12,
                        praiseCount: 33
                    },
                    {
                        title:'测试4',
                        author:'作者4',
                        src : 'src/assets/4.jpg',
                        scanCount: 123,
                        commentCount: 65,
                        praiseCount: 22
                    },
                    {
                        title:'测试1',
                        author:'作者1',
                        src : 'src/assets/5.jpg',
                        scanCount: 123,
                        commentCount: 65,
                        praiseCount: 22
                    },
                    {
                        title:'测试1',
                        author:'作者1',
                        src : 'src/assets/6.jpg',
                        scanCount: 123,
                        commentCount: 65,
                        praiseCount: 22
                    }
                ]
            }
      }
  }
</script>