<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="balance-detail">
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <p>流水号</p>
      </div>
      <div class="weui-cell__ft">{{ PayBillInfo.payBillSn }}</div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <p>收入</p>
      </div>
      <div class="weui-cell__ft">{{ PayBillInfo.totalFee }}</div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <p>支付方式</p>
      </div>
      <div class="weui-cell__ft">
        <span v-if="PayBillInfo.tradeType == 'JSAPI'">微信支付</span>
        <span v-else>线下交易</span>
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <p>时间</p>
      </div>
      <div class="weui-cell__ft">{{ PayBillInfo.timeEnd }}</div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <p>备注</p>
      </div>
      <div class="weui-cell__ft">无</div>
    </div>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  export default {
    name: 'balanceDetail',
    data() {
      return {
        payBillSn: "",
        PayBillInfo: {}
      }
    },
    created(){
      let that = this;
      let payBillSn = that.$route.params.payBillSn;
      that.payBillSn = payBillSn;
    },
    mounted(){
      this.fetchData();
    },
    methods: {
        fetchData () {
          let that = this;
          $.ajax({
            type: "get",
            dataType: "json",
            url: ApiUrl.findPayBillInfo,
            data: {
              payBillSn: that.payBillSn
            },
            success: function (data) {
              var resData = data;
              if (resData.payBillSn) {
                that.PayBillInfo = resData;
              }
            },
            error: function (err) {
              console.log("error");
            }
          })
        }
    }
  }
</script>

<style scoped>
  .balance-detail{
    background-color: #ffffff;
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    margin: 10px 0;
  }
  .weui-cell__bd p,.weui-cell__ft{
    font-size: 14px;
    color: #333333;
  }
</style>
