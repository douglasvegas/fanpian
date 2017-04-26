<template>
    <div class="picList">
        <div>
            <ul class="imgList">
                <PicItem :posts='posts' v-for='info in posts' :info='info'></PicItem>
            </ul>
        </div>
<div class="fill-footer" style="text-align: center;" v-if='getCanFetch === true'><i class="fa fa-spinner"></i>加载中...</div>
<div class="fill-footer" style="text-align: center;" v-else>-----到头了-----</div>
</div>
</template>

<script>
    import PicItem from '../components/PicItem.vue'
    import { mapActions } from 'vuex';

    export default {
        props: ['loadNext'],
        watch: {
            loadNext: function (value, oldValue) {
                if ((value == true) && (oldValue == false)) {
                    this.pageNo += 1;
                    this.getNext();
                }
            }
        },
        data() {
            return {
                pageNo: 1,
                pageSize: 5
            }
        },
        components: {
            PicItem
        },
        mounted() {
            var data = {};
            data.pageNo = this.pageNo;
            data.pageSize = this.pageSize;

            if (!this.$store.state.posts.canFetch) {
                return;
            }
            this.fetchHotPosts(data);
        },
        computed: {
            posts() {
                return this.$store.state.posts.posts
            },
            getCanFetch() {
                return this.$store.state.posts.canFetch;
            }
        },
        methods: {
            ...mapActions(['fetchHotPosts']),
            getNext: function () {
                var data = {};
                data.pageNo = this.pageNo;
                data.pageSize = this.pageSize;

                this.fetchHotPosts(data);
                this.$emit("listenReset");
            }
        }
    }
</script>

<style>
.fa-spinner { 
    -webkit-animation:spin 2s linear infinite;
}
@-webkit-keyframes spin{
    0%{-webkit-transform:rotate(0deg)}
    100%{-webkit-transform:rotate(359deg)}
}
.picList { 
    height: 100%;
    width: 100%;
    overflow: auto;
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