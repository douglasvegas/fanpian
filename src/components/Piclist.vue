<template>
    <div class = "picList">
        <div>
            <ul class="imgList">
                <li v-for = 'info in infos'>
                    <img :src = "info.src" />
                </li>
            </ul>
        </div>
    </div>    
</template>

<style>
.picList {
    height: auto;
    width: 100%;  
}

.imgList {
    padding: 10px 5px;
}

.imgList li {
    padding-bottom: 7px;
}

.imgList img {
    width: 100%;
    height: 120px;
    border-radius: 5px;
}
</style>

<script>
  export default {
      name: 'my-plist',

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