<template>
<li class="imgItem">
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
</template>

<script>
    export default {
        props: ['info']
    }
</script>