<template>
<div v-if = 'isShow === true' @click='reset' class="popError">
    {{showErrText}}
</div>   
</template>
<script>
    export default {
        props: ['text'],
        watch: {
            text: function (newValue, oldValue) {
                if(newValue) {
                    this.isShow = true;
                    this.showErrText = newValue
                }
                
            }
        },
        data() {
            return {
                timer: null,
                duration: 3000,
                isShow: false,
                showErrText: this.text
            }
        },
        methods: {
            reset() {
                var obj = document.querySelector(".popError");
                obj.style.webkitTransform="translate( 0 , 0 )";
                obj.style.transform = "translate( 0 , -50px)"
                obj.style.transition="transform .5s ease-out,-webkit-transform .3s ease-out";
                setTimeout(() => {
                    this.isShow = false;
                    this.showErrText = '';
                },600)

            }
        }

    }
</script>

<style scoped>
div{
    position: relative;
    background: #1f2d3d;
    color: #FFF;
    width: 100%;
    text-align: center;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
}

</style>