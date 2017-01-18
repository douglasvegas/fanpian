<template>
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide>
            <img class="imgload" src="http://mooc.inxedu.com/images/upload/image/20151026/1446026886181.jpg" alt="首页banner图片01">
        </swiper-slide>
        <swiper-slide>
            <img class="imgload" src="http://mooc.inxedu.com/images/upload/image/20151026/1446026905031.jpg" alt="首页banner图片02">
        </swiper-slide>
        <swiper-slide>
            <img class="imgload" src="http://mooc.inxedu.com/images/upload/image/20151026/1446026886181.jpg" alt="首页banner图片01">
        </swiper-slide>
        <swiper-slide>
            <img class="imgload" src="http://mooc.inxedu.com/images/upload/image/20151026/1446026905031.jpg" alt="首页banner图片02">
        </swiper-slide>
        <!-- 以下控件元素均为可选（使用具名slot来确定并应用一些操作控件元素） -->
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>

</template>
<style>
@import '../assets/css/swiper.min.css';
.swiper-slide {
    height: 150px;
    position: relative;
    text-align: center;
    line-height: 150px;
}
img.imgload {
    width:100%;
    height:150px;
}
.swiper-pagination-bullet-active {
    background-color: white;
}
</style>

<script>
 import Vue from 'vue'
 import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: 'my-swiper',
          components: {
            swiper,
            swiperSlide
        },
        data() {
            return {
                swiperOption: {
                    direction : 'horizontal',
                    autoplay : 3000,
                    pagination : '.swiper-pagination',
                }
            }
        }
    }
</script>