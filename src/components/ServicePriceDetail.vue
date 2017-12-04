<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="search-price-detail">
    <div class="order-list-wrap">
      <div class="order-list-inner">
        <div class="order-list">
          <div class="order-head">
            <div class="order-head-list">
              <span v-if="serviceDetail.deviceName">{{serviceDetail.deviceName}}</span>
              <span v-else>无</span>
            </div>
          </div>
          <div class="order-main">
            <p>设备类型：<span v-if="serviceDetail.deviceType">{{serviceDetail.deviceType}}</span><span v-else>无</span></p>
            <p>设备品牌：<span v-if="serviceDetail.brandNameEn">{{serviceDetail.brandNameEn}}</span><span v-else>无</span></p>
          </div>
          <div class="order-main">
            <p>故障现象：<span v-if="serviceDetail.faultPhenomenon">{{serviceDetail.faultPhenomenon}}</span><span v-else>无</span></p>
            <p>故障点：<span v-if="serviceDetail.faultPoint">{{serviceDetail.faultPoint}}</span><span v-else>无</span></p>
            <p>处理方式：<span v-if="serviceDetail.handing">{{serviceDetail.handing}}</span><span v-else>无</span></p>
          </div>
          <div class="order-main">
            <p>上门费用：<span v-if="serviceDetail.serviceFee">￥{{serviceDetail.serviceFee}}</span><span v-else>无</span></p>
            <p>维修费用：<span v-if="serviceDetail.fixCost">￥{{serviceDetail.fixCost}}</span><span v-else>无</span></p>
          </div>
          <div class="order-foot">
            合计：<span class="order-price" v-if="serviceDetail.totalPrice">{{serviceDetail.totalPrice}}</span><span class="order-price" v-else>无</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  export default {
    name: 'search-price-detail',
    data() {
      return {
        serviceDetail: {},
        serveId: -1
      }
    },
    created(){
      let serveId = this.$route.params.serveId;
      this.serveId = serveId;
    },
    mounted(){
      this.getServiceDetail();
    },
    methods: {
      getServiceDetail: function () {
          let that = this;
        $.ajax({
          type: "GET",
          dataType: "json",
          url: ApiUrl.findServeDetails,
          data: {
            serveId: that.serveId
          },
          success: function (res) {
            res.fixCost = res.unitPrice;
            if(res.typeBasics){
              res.deviceType = res.typeBasics.deviceType;
            }else{
              res.deviceType = "无";
            }
            if(res.brandBasics){
              res.brandNameEn = res.brandBasics.brandNameEn;
            }else{
              res.brandNameEn = "无";
            }
            that.serviceDetail = res;
          },
          error: function () {
            console.log("error");
          }
        });
      }
    }
  }
</script>

<style scoped>

  .order-list-wrap{

  }
  .order-list{
    background-color: #ffffff;
    margin-bottom: 10px;
  }
  .order-head{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 7px 10px;
    border-bottom: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
  }
  .order-head-list{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .order-head-list span{
    font-size: 16px;
  }
  .order-main{
    background-color: #f7f8f8;
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
  }
  .order-main h4{
    font-size: 14px;
    color: #333333;
  }
  .order-main p{
    font-size: 13px;
    color: #666666;
  }
  .order-foot{
    padding: 7px 10px;
    font-size: 16px;
  }
  .order-price{
    color: #ff0000;
  }
  .order-list-inner a{
    color: #333333;
  }
</style>
