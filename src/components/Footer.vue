<template>
    <div class="footer">
        <ul>
            <li>发现</li>
            <li>中</li>
            <li>我的</li>
        </ul>
    </div>
</template>

<script>
  export default {
      name: 'my-footer'
  }
</script>

<style>
    /*footer*/
.footer {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: white;
  color:#289bf3;
  border-top:1px solid #ccc;
  position: absolute;
  bottom: 0;
  overflow: hidden;
  text-align: center;
}
.footer li {
    padding: 0 30px 0;
}
</style>