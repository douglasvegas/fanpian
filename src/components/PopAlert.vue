<template>
    <div class="ui-dialog" v-if='isShow === true'>
        <div id="ui-dialog-cnt">
            <div class="ui-dialog-bd" v-if = 'configPopArr.type == "dialog"'>
                <h4>{{configPopArr.title}}</h4>
                <div>{{configPopArr.content}}</div>
            </div>
            <div class="ui-dialog-bd" v-if = 'configPopArr.type == "loading"'>
                <h4>{{configPopArr.title}}</h4>
            </div>
            <div v-if = 'configPopArr.type == "loading"'>
                <i class="ui-loading"></i>
            </div>
            <div class="ui-btn-group">
                <button type="button"  v-for = 'button in configPopArr.buttons' @click = 'button.action'>{{button.value}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['configPop'],
        watch: {
            configPop: function (value) {
                this.isShow = true;
            }
        },
        computed: {
            configPopArr(){
                return this.configPop
            }
        },
        data () {
            return {
                isShow: false
            }
        },
        methods: {
            popOut: function () {
                this.isShow = false;
            }
        }
    }
</script>

<style scoped>
    .ui-dialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        display: -webkit-box;
        -webkit-box-orient: horizontal;
        -webkit-box-pack: center;
        -webkit-box-align: center;
        background: rgba(0,0,0,.4);
        display: block;
        color: #000;
        display: -webkit-box;
    }
    #ui-dialog-cnt {
        width: 270px;
        height: 150px;
        border-radius: 8px;
        overflow: hidden;
        background-color: rgba(253,253,253,.95);
        margin: 0 auto;
        transform: -50%;
        position: relative;
        
    }
    #ui-dialog-cnt .ui-dialog-bd {
        padding: 20px;
        font-size: 16px;
    }
    #ui-dialog-cnt .ui-dialog-bd h4{
        text-align: center;
        padding-bottom: 10px;
    }
    #ui-dialog-cnt .ui-btn-group {
        display: -webkit-box;
        height: 42px;
        position: absolute;
        bottom: 0;
        width: 100%;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    #ui-dialog-cnt .ui-btn-group button {
        display: block;
        border-top: 1px solid #ccc;
        -webkit-box-flex: 1;
        outline: none;
        color: #00a5e0;
    }
    #ui-dialog-cnt button{
        border-right: 1px solid #ccc;
    }
    #ui-dialog-cnt button:last-child {
        border-right: none;
    }
    button:active {
        background: #e4e0e0;
    }

.ui-loading {
    width: 20px;
    height: 20px;
    display: block;
    margin: 0 auto;
    background: url(/src/assets/img/loading_sprite.png);
    -webkit-background-size: auto 20px;
    -webkit-animation: am-rotate 1s steps(12) infinite;
}

@-webkit-keyframes am-rotate{
    from{
        background-position:0 0
        }
    to{
        background-position:-240px 0
        }
}


</style>