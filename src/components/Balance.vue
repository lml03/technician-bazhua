<!-- The ref attr used to find the swiper instance -->
<template>
  <!--<div class="balance" v-if="PayBilldetails.length > 0">
    <router-link v-for="PayBilldetail in PayBilldetails" :to="{ name: 'BalanceDetail', params: { payBillSn: PayBilldetail.payBillSn }}" class="weui-cell weui-cell_access">
      <div class="balance-item">
        <div class="weui-cell__bd balance-item-top">
          <p>收款</p>
        </div>
        <div class="weui-cell__bd balance-item-bottom">
          <p v-if="PayBilldetail.tradeType == 'JSAPI'">微信支付</p>
          <p v-else>线下交易</p>
        </div>
      </div>
      <div class="balance-item">
        <div class="weui-cell__ft balance-item-top">{{ PayBilldetail.timeEnd }}</div>
        <div class="weui-cell__ft balance-item-bottom color-ff6">+￥{{ PayBilldetail.totalFee }}</div>
      </div>
    </router-link>
  </div>
  <div class="coupon" v-else>
    <img src="../assets/images/integral.png"/>
    <p>您还没有收入</p>
  </div>-->
  <div class="coupon">
    <img src="../assets/images/integral.png"/>
    <p>您还没有收入</p>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  export default {
    name: 'balance',
    data() {
      return {
        PayBilldetails: []
      }
    },
    created(){
      var that = this;
      var technicianInfo = JSON.parse(localStorage.getItem("technicianInfo"));
      if(technicianInfo.technicianId){
          var technicianId = technicianInfo.technicianId;
          $.ajax({
          type: "get",
          dataType: "json",
          url: ApiUrl.findPayBilldetails,
          data: {
            technicianId: technicianId
          },
          success: function (data) {
            var resData = data;
            if(resData.length > 0){
              that.PayBilldetails = resData;
            }
          },
          error: function (err) {
            console.log("error");
          }
        });
      }
    },
    mounted(){

    }
  }
</script>

<style scoped>
  .balance{
    background-color: #ffffff;
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    margin: 10px 0;
  }
  .balance-item{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .balance-item-top{
    font-size: 13px;
    color:#666666;
    padding-bottom: 2px;
  }
  .balance-item-bottom{
    font-size: 14px;
    padding-top: 2px;
  }
  .color-ff6{
    color: #ff6600;
  }
  .color-008{
    color: #008a00;
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
