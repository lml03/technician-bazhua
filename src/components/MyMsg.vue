<template>
  <div>
    <div class="popup" id="popup" v-show="isPopup"></div>
    <div class="has-msg" v-if="hasMsg">
      <div class="my-order-list">
        <ul>
          <li v-for="orderList in orderLists">
            <router-link :to="{ name: 'MsgDetail', params: { orderNo: orderList.orderNo }}">
              <div class="weui-cell">
                <div class="weui-cell__bd">
                  <p>{{ orderList.createDate }}</p>
                </div>
                <div class="weui-cell__ft orderStatus">
                  <span v-if="orderList.orderStatus == 1">客户报修</span>
                  <span v-else-if="orderList.orderStatus == 3">客户受理</span>
                  <span v-else-if="orderList.orderStatus == 5">订单指派</span>
                  <span v-else-if="orderList.orderStatus == 16">已完成</span>
                  <span v-else>暂无状态</span>
                </div>
              </div>
              <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text  my-order-list-info">
                  <h4 class="weui-media-box__title">{{ orderList.shopName }}</h4>
                  <p class="weui-media-box__desc">订单编号<span>{{ orderList.orderNo }}</span></p>
                  <p class="weui-media-box__info">维修内容<span>{{ orderList.faultContent }}</span></p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="no-msg" v-else>
      <img width="172" height="140" src="../assets/images/No_message.png" alt="">
      <p>您还没有相关订单</p>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonFooter from './CommonFooter.vue';
import ApiUrl from '../api/apiUrl';
export default {
  name: 'myMsg',
  data () {
    return {
      hasMsg: false,
      orderLists: null,
      isPopup: false
    }
  },
  components: {
    CommonFooter
  },
  methods: {
    fetchData: function () {
      let that = this;
      $.ajax({
        type: "get",
        dataType: "json",
        url: ApiUrl.orderMessage,
        data: {
          orderStatus: 0,
          mobile: localStorage.getItem("technicianPhone")
        },
        success: function (data) {
            console.log(data);
          if(data.length >= 1){
            that.hasMsg = true;
            that.orderLists = data;
          }
        },
        error: function (err) {
          that.isPopup = true;
          $("#popup").html("获取数据失败");
          setTimeout(function () {
            that.isPopup = false;
          }, 2000);
        }
      });
    }
  },
  created: function () {
      let technicianPhone = localStorage.getItem("technicianPhone");
      //if(technicianPhone){
        this.fetchData();
      //}
  },
  beforeRouteEnter (to, from, next){
    next(vm => {
      $(".app").find("ul.commonFooter li").eq(1).addClass("active").siblings().removeClass("active");
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .myMsg{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: #efeff4;
  }
  .no-msg{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    margin-top: -70px;
  }
  .no-msg p{
    text-align: center;
    margin-top: 15px;
    color: #06a0de;
  }
  .my-order-list{
    padding-bottom: 65px;
  }
  .my-order-list ul li{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .my-order-list ul li p,.my-order-list ul li h4{
    color: #333333;
  }
  .my-order-list-info::after{
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -4px;
    right: 15px;
  }
  .my-order-list ul li .weui-cell{
    border-bottom: 1px solid #e9e9e9;
    padding: 5px 10px;
  }
  .orderStatus{
    color: #06a0de;
  }
  .weui-media-box_text .weui-media-box__title{
    margin-bottom: 0;
  }
  .weui-media-box__desc,.weui-media-box__info{
    margin: 0;
    padding: 0;
    line-height: 22px;
    color: #6a6a6a;
    font-size: 14px;
  }
</style>
