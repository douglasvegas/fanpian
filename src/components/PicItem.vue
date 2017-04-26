<template>
<li class="imgItem">
    <img :src = "info.imgUrl" onerror="this.src='http://www.douglasvegas.com/api/default.png'"/>
    <div class="wrapContent" @click='toPost(info._id)'>
        <p>{{info.title}}</p>
        <span>{{info.author.name}}</span>
        <ul>
            <li>
                <i class="toTop fa fa-eye"></i>
                <span>{{info.pv}}</span>
            </li>
            <li>
                <i class="toTop fa fa-thumbs-up"></i>
                <span>{{info.like}}</span>
            </li>
            <li>
                <i class="toTop fa fa-comment"></i>
                <span>{{info.comments}}</span>
            </li>
        </ul>
    </div>
</li>
</template>

<script>
    export default {
        props: ['info'],
        data() {
            return {
                imgDefault:''
            }
        },
        methods: {
            toPost: function (id) {
                this.$router.push('/post/'+ id)
            }
        }
    }
</script>
<style scoped>
img {
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
    text-shadow: 1px 1px 4px rgb(10, 10, 10);
}
.wrapContent>ul {
    position: absolute;
    left: 0.7rem;
    bottom: 1rem;
    font-size: 0.8rem;
    text-shadow: 1px 1px 4px rgb(10, 10, 10);
}
li {
    display: inline-block;
}
</style>