<template>
<li class="imgItem">
    <img :src = "info.imgUrl" />
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
                <span>{{info.praiseCount}}</span>
            </li>
            <li>
                <i class="toTop fa fa-comment"></i>
                <span>{{info.commentCount}}</span>
            </li>
        </ul>
    </div>
</li>
</template>

<script>
    export default {
        props: ['info'],
        methods: {
            toPost: function (id) {
                this.$router.push('/post/'+ id)
            }
        }
    }
</script>
<style scoped>
    
</style>