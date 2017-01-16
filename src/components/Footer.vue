<template>
    <div class="footer">
        <ul>
            <li :class="{tabCurrent:activeFooter.isLeft}" @click = "changeActive('left')">
                <router-link to="/">
                    <i class="toTop fa fa-compass"></i>
                    <span>发现</span>
                </router-link>
            </li>
            <li class="redActive">
                <i class="fa fa-plus-circle fa-3x"></i>
                <!--<span>中.</span>-->
            </li>
            <li :class="{tabCurrent:activeFooter.isRight}" @click = "changeActive('right')">
                <router-link to = '/profile'>
                    <i class="toTop fa fa-gear"></i>
                    <span>我的</span>
                </router-link>
            </li>
        </ul>
    </div>
</template>

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
    display: table;
    width: 100%;
}
.footer li {
    /*padding: 0 30px 0;*/
    display: table-cell;
}
.footer .toTop{
    position: relative;
    top: -20px;
    left: 28px;
}
.redActive{
      color:#289bf3;
}

</style>

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
          changeActive: function (str) {
              if (str === 'left') {
                  this.activeFooter.isLeft = true;
                  this.activeFooter.isRight = false;
              }
              if (str === 'right') {
                  this.activeFooter.isRight = true;
                  this.activeFooter.isLeft = false;
              }
          }
      }
  }
</script>