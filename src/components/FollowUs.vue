<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="follow-us">
    <img class="code-img" width="210" height="210" alt="" src="../assets/images/code-img.jpg">
    <p class="code-img-note">长按二维码 关注我们</p>
    <!--
      <p class="follow-note">或点击下面按钮关注</p>
      <div class="weui-btn-wrap">
          <a href="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzI0Mzg5MTEzNg==&scene=124#wechat_redirect" class="weui-btn weui-btn_primary">去关注</a>
      </div>
       -->
  </div>
</template>

<script>
  export default {
    name: 'follow-us',
    data() {
      return {

      }
    },
    created(){

    },
    mounted(){

    }
  }
</script>

<style scoped>
  .follow-us{
    color:rgb(62, 62, 62);
  }
  .code-img{
    display:block;
    margin:20px auto 10px;
  }
  .code-img-note{
    text-align:center;
  }
  .follow-note{
    font-size:12px;
    text-align:center;
    padding: 30px 0;
  }
  .weui-btn_primary {
    background-color: #1AAD19;
  }
  .weui-btn {
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 14px;
    padding-right: 14px;
    box-sizing: border-box;
    font-size: 16px;
    text-align: center;
    text-decoration: none;
    color: #FFFFFF;
    line-height: 44px;
    border-radius: 5px;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow: hidden;
  }
  .weui-btn-wrap{
    padding:0 10px;
  }
</style>
