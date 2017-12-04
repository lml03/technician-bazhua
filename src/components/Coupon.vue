<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="coupon">
    <img src="../assets/images/coupon.png"/>
    <p>您还没有可用优惠券</p>
  </div>

</template>

<script>
  export default {
    name: 'coupon',
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
  html,body{
    width: 100%;
    height: 10%;
    background-color: #f1f5fa;
  }
.coupon{
  width: 209px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.coupon img{
  width: 100%;
}
.coupon p{
  color: #b4b3b1;
  font-size: 16px;
  padding-top: 20px;
  text-align: center;
}
</style>
