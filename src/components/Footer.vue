<template>
    <div class="footer">
        <ul>
            <li><icon name="favorite" scale="20"></icon>发现</li>
            <li><icon name="add" scale="20"></icon>中.</li>
            <li><icon name="account" scale="20"></icon>我的</li>
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

<script>
  export default {
      name: 'my-footer'
  }
</script>