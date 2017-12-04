<template>
  <div class="msgDetail">
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div class="my-service-msg" v-if="post">
      <div class="deal-order">
        <h3>{{ post.shopName }}</h3>
        <p>订单编号：<span>{{ post.orderNo }}</span></p>
        <p>维修内容：<span>{{ post.faultContent }}</span></p>
        <p>上门时间：<span>{{ post.visitingTime }}</span></p>
      </div>
      <div class="my-service-fault-wrap">
        故障点<span class="my-service-fault">{{ post.faultPoint }}</span>
      </div>
    </div>
    <div class="maintenance-progress">
      <div class="repair-detail-title">
        <h2>维修进度</h2>
      </div>
      <div class="maintenance-progress-info-wrap">
        <div class="maintenance-progress-info check-step">
          <ul>
            <li v-for="(orderRecord, index) in post.orderRecord" v-bind:class="{ cur: index == 0 }">
              <p>{{ orderRecord.createDate }}</p>
              <p>
                <span v-if="orderRecord.orderStatus == 1">待受理</span>
                <span v-else-if="orderRecord.orderStatus == 2">待取消</span>
                <span v-else-if="orderRecord.orderStatus == 3">待指派</span>
                <span v-else-if="orderRecord.orderStatus == 5">待维修</span>
                <span v-else-if="orderRecord.orderStatus == 11">商户取消</span>
                <span v-else-if="orderRecord.orderStatus == 12">技师取消、待指派</span>
                <span v-else-if="orderRecord.orderStatus == 13">无法完成、待指派</span>
                <span v-else-if="orderRecord.orderStatus == 16">订单完成</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
export default {
  name: 'msgDetail',
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      let that = this;
      that.error = that.post = null;
      that.loading = true;
      $.ajax({
        type: "get",
        dataType: "json",
        url: ApiUrl.findOrderRecordDetail,
        data: {
          orderNo: that.$route.params.orderNo
        },
        success: function (data) {
          that.loading = false;
          if(data){
            that.post = data;
          }else{
            that.error = err.toString()
          }
        },
        error: function (err) {
          that.error = err.toString();
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .msgDetail{
    padding: 10px 10px 45px 10px;
  }
  .my-service-msg{
    background-color: #ffffff;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .my-service-fault-wrap{
    padding: 10px 15px;
    color: #808080;
    font-size: 14px;
  }
  .my-service-fault{
    padding: 2px 10px;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
    margin-left: 10px;
  }
  .maintenance-progress{
    background-color: #ffffff;
    border-radius: 5px;
  }
  .repair-detail-title {
    border-bottom: 1px solid #f0eff4;
    padding: 10px;
  }
  .repair-detail-title h2 {
    font-size: 16px;
    height: 25px;
    line-height: 25px;
    color: #000000;
    padding-left: 13px;
    position: relative;
  }
  .repair-detail-title h2::before {
    width: 3px;
    height: 16px;
    background-color: #06a0de;
    display: inline-block;
    content: "";
    position: absolute;
    left: 0;
    top: 6px;
  }
  .maintenance-progress-info-wrap{
    padding: 0 15px 15px 25px;
    background-color: #ffffff;
  }
  .deal-order{
    padding:10px 15px;
    border-bottom: 1px solid #e6e6e6;
  }
  .deal-order h3{
    color: #383838;
    font-size: 16px;
  }
  .deal-order p{
    color: #666666;
    font-size: 14px;
  }

  .check-step li.cur {
    border-color: #06a0de;
    color: #06a0de;
  }
  .check-step li {
    position: relative;
    padding: 15px 0 0 15px;
    border-left: 1px solid #ccc;
    color: #999;
    font-size: 16px;
  }
  .check-step li.cur:after {
    background: #06a0de;
  }
  .check-step li:after {
    position: absolute;
    left: 0;
    margin-left: -6px;
    top: 18px;
    content: "";
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #ccc;
  }

  .check-step ul li p{
    line-height: 18px;
    font-size: 14px;
  }

</style>
