<template>
    <div class="footer">
        
        <ul>
            <li :class="{tabCurrent:activeFooter.isLeft}" @click = "changeActive('left')">
                <i class="toTop fa fa-heartbeat"></i>
                <span>发现</span>
            </li>
            <li class="redActive">
                <i class="fa fa-dot-circle-o fa-3x"></i>
                <!--<span>中.</span>-->
            </li>
            <li :class="{tabCurrent:activeFooter.isRight}" @click = "changeActive('right')">
                <i class="toTop fa fa-gear"></i>
                <span>我的</span>
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
      color:#bf0b0b;
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