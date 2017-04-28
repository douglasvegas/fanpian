<template>
    <div class="footer">
        <ul>
            <router-link to="/"  tag='li' active-class='active'>
                <i class="toTop fa fa-compass"></i>
                <span>发现</span>
            </router-link>
            <li class="redActive">
                <i class="fa fa-plus-circle fa-3x" @click = "toWrite"></i>
                <!--<span>中.</span>-->
            </li>
            <router-link to = '/profile' tag='li' active-class='active'>
                <i class="toTop fa fa-gear"></i>
                <span>我的</span>
            </router-link>
        </ul>
    </div>
</template>

<script>
  export default {
      name: 'my-footer',
      data () {
          return {
              activeFooter:{
                  isLeft: true,
                  isRight: false
              }
          }
      },
      methods: {
          toWrite: function () {
              this.$emit("listenPop")
          }
      }
  }
</script>

<style>
    /*footer*/
.footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: white;
  color:#737070;
  border-top:1px solid #ccc;
  position: fixed;
  bottom: 0;
  overflow: hidden;
  text-align: center;
}
.footer ul {
    display: flex;
    width: 100%;
}
.footer li {
    /*padding: 0 30px 0;
    display: table-cell;*/
    flex: 1;
}

.footer li a {
    height: 100%;
    display: inline-block;
}

.footer .toTop{
    /*position: relative;
    top: -20px;
    left: 28px;*/
}
.footer .active{
    color: #289bf3;
}
.redActive{
      color:#289bf3;
}
.tabCurrent a {
    color: #289bf3;
}


</style>

