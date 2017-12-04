<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="pay-success">
    <div class="paySuccessWrap">
      <div class="paySuccessImg">
        <img alt="" src="../assets/images/bazhua-logo.png">
      </div>
      <div class="paySuccessLogo">
        <img alt="" src="../assets/images/pay-success.png">
      </div>
      <p class="paySuccessNote">商家支付成功</p>
      <p class="paySuccessInfo">支付方式：微信支付</p>
      <p class="paySuccessInfo">支付金额：￥450.00</p>
      <div class="paySuccessBtn">
        <a href="#">技师打分</a>
        <a href="#">返回订单</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PaySuccess',
    data() {
      return {}
    }
  }
</script>

<style scoped>
  .paySuccessWrap {
    padding: 80px 0 50px 0;
  }
  .paySuccessImg {
    width: 200px;
    margin: 0 auto;
  }
  .paySuccessImg img {
    width: 100%;
  }
  .paySuccessNote{
    font-size: 18px;
    color: #e83b4f;
    text-align: center;
    padding: 15px 0;
  }
  .paySuccessLogo {
    width: 44px;
    margin: 0 auto;
    padding-top: 17px;
  }
  .paySuccessLogo>img {
    width: 100%;
  }
  .paySuccessBtn {
    position: fixed;
    left: 10px;
    right: 10px;
    bottom: 50px;
    text-align: center;
  }
  .paySuccessBtn a:first-child {
    margin-right: 14px;
  }

  .paySuccessBtn a {
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 6px;
    font-size: 16px;
    display: inline-block;
    text-decoration: none;
  }
  .paySuccessBtn a{
    color: #a6a6a6;
    background-color: #fff;
    border: 1px solid #a6a6a6;
    box-sizing: border-box;
  }
  .paySuccessBtn a {
    width: 140px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 6px;
    font-size: 16px;
    display: inline-block;
    text-decoration: none;
  }
  .paySuccessInfo{
    color: #333333;
    font-size: 14px;
    text-align: center;
    padding-bottom: 8px;
  }
</style>




























