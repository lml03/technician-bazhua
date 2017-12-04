<template>
  <div class="myOrder">
      <div class="popup" id="popup" v-show="isPopup">{{popupMsg}}</div>
      <div class="order-list-wrap has-order" v-if="hasOrder && isLogin">
        <div class="order-list-inner" v-for="orderList in orderLists">
          <router-link :to="{ name: 'WorkorderDetail', params: { orderNo: orderList.orderNo, orderStatus: orderList.orderStatus }}">
            <div class="order-list">
              <div class="order-head">
                <div class="order-head-list">
                  <i v-if="orderList.orderType == 1" class="item-icon iconfont icon-shebeiweixiu1"></i>
                  <i v-else-if="orderList.orderType == 2" class="item-icon iconfont icon-yandaoqingxi1"></i>
                  <i v-else-if="orderList.orderType == 3" class="item-icon iconfont icon-gongchenggaizao1"></i>
                  <i v-else-if="orderList.orderType == 4" class="item-icon iconfont icon-qita1"></i>
                  <span>{{ orderList.shopName }}</span>
                </div>
                <div class="order-status">
                  <span v-if="orderList.orderStatus == 4">检修中</span>
                  <span v-else-if="orderList.orderStatus == 5">检修中</span>
                  <span v-else-if="orderList.orderStatus == 8">检修完成</span>
                  <span v-else-if="orderList.orderStatus == 14">已取消</span>
                  <span v-else-if="orderList.orderStatus == 16">已完成</span>
                </div>
              </div>
              <div class="order-main">
                <p>服务项目：<span>{{orderList.serviceProject}}</span>
                  <!--<span v-if="orderList.orderType == 1">设备维修</span>-->
                  <!--<span v-else-if="orderList.orderType == 2">烟道清洗</span>-->
                  <!--<span v-else-if="orderList.orderType == 3">工程改造</span>-->
                  <!--<span v-else-if="orderList.orderType == 4">其他</span>-->
                </p>
                <p>开始检修时间：<span>{{ orderList.startRecondition }}</span></p>
                <p>商户地址：<span>{{ orderList.address }}</span></p>
                <p>下单时间：<span>{{ orderList.createDate }}</span></p>
              </div>
              <div class="order-foot">
                估价：<span class="order-price">{{ orderList.price ? orderList.price : "待定" }}</span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="no-order-wrap" v-if="!hasOrder && isLogin">
        <div class="no-order">
          <img width="160" height="130" src="../assets/images/no-workorder.png" alt="">
          <p class="no-workorder">您还没有工单，创建一个吧！</p>
        </div>
      </div>
      <div class="no-login-wrap" v-if="!isLogin">
        <div class="no-login">
          <img width="160" height="130" src="../assets/images/no-workorder.png" alt="">
          <p class="no-workorder"><router-link to="Auth">请登录</router-link>后查看工单</p>
        </div>
      </div>
      <router-link v-if="isLogin" class="create-workorder" :to="{ name: 'CreateWorkorder', params: { }}">+新建工单</router-link>
  </div>
</template>
<script>
import ApiUrl from '../api/apiUrl';
import axios from 'axios';
export default {
  name: 'overhaulOrder',
  data () {
    return {
      orderLists: [],
      popupMsg: "",
      hasOrder: true,
      isPopup: false,
      isLogin: false
    }
  },
  created: function () {
    let technicianPhone = localStorage.getItem("technicianPhone");
    if(technicianPhone){
      this.fetchData();
      this.isLogin = true;
    }
  },
  mounted: function () {

  },
  methods: {
    showPrompt () {
      let that = this;
      that.isPopup = true;
      setTimeout(function () {
        that.isPopup = false;
      }, 2000);
      return false;
    },
    fetchData: function () {
      let that = this;
      let mobile = localStorage.getItem("technicianPhone");
      that.isPopup = true;
      that.popupMsg = "加载中...";
      axios.get(ApiUrl.findWorkOrders , {
        params: {
          mobile: mobile
        }
      })
      .then(function (response) {
        that.isPopup = false;
        that.popupMsg = "";
        if(response.status == 200){
          if(response.data.length > 0){
            that.orderLists = response.data;
            that.hasOrder = true;
          }else{
            that.hasOrder = false;
          }
        }else{
          that.popupMsg = "数据获取失败";
          that.showPrompt();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .no-workorder,.no-workorder a{
    color: #b3b3b3 !important;
    font-size: 14px;
  }
  .create-workorder{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #14a5e0;
    color: #FFFFFF;
    font-size: 16px;
  }
  .my-order-menu li{
    padding: 12px 0;
    flex: 1;
    -webkit-flex: 1;
    -webkit-box-flex: 1;
    font-size: 14px;
    line-height: 15px;
    text-align: center;
    position: relative;
    border-bottom: 1px solid #e6e6e6;
    color:#333333;
  }
  .my-order-menu li::after{
    width: 1px;
    height: 15px;
    background-color: #e6e6e6;
    display: inline-block;
    content: "";
    position: absolute;
    right: 0;
    top: 15px;
  }
  .my-order-menu li.cur{
    border-bottom: 2px solid #06a0de;
  }
  .my-order-menu li:last-child::after{
    background-color: #ffffff;
  }
  .my-order-list ul li{
    margin-top: 10px;
    background-color: #ffffff;
  }

  .my-order-list ul li .weui-cell{
    border-bottom: 1px solid #e9e9e9;
  }
  .no-login p a{
    color: #06a0de;
    text-decoration: underline;
  }
  .no-order-wrap,.no-login-wrap{
    position: absolute;
    left: 0;
    top: 40px;
    right: 0;
    bottom: 50px;
  }
  .no-order,.no-login{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .no-order p,.no-login p{
    text-align: center;
    margin-top: 10px;
    color: #06a0de;
  }

  /*2017-7-6样式更改*/

  .item-icon{
    float: left;
    width: 24px;
    height: 24px;
    text-align: center;
    line-height: 24px;
    vertical-align: middle;
    border-radius: 4px;
    color: #ffffff;
    margin-right: 10px;
    font-size: 14px;
  }
  .order-list-wrap{
    padding-bottom:54px;
  }
  .order-list{
    background-color: #ffffff;
    margin-top: 10px;
  }
  .order-head{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 7px 10px;
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
    font-size: 14px;
  }
  .order-head-list i.icon-gongchenggaizao1{
    background-color: #4bc4a3;
  }
  .order-head-list i.icon-yandaoqingxi1{
    background-color: #64a1d5;
  }
  .order-head-list i.icon-shebeiweixiu1{
    background-color: #fac751;
  }
  .order-head-list i.icon-qita1{
    background-color: #b3b3b3;
  }
  .order-status{
    text-align: right;
    color: #06a0de;
    width: 70px;
    padding-left: 10px;
    font-size: 14px;
  }
  .order-main{
    background-color: #f7f8f8;
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
  }
  .order-main h4{
    font-size: 14px;
    color: #333333;
  }
  .order-foot{
    padding: 7px 10px;
    font-size: 14px;
  }
  .order-list-inner a{
    color: #333333;
  }


  .item-icon{
    float: left;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    vertical-align: middle;
    border-radius: 4px;
    color: #ffffff;
    margin-right: 10px;
    font-size: 14px;
  }
  .order-list{
    background-color: #ffffff;
    margin-top: 10px;
  }
  .order-head{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 10px 12px;
  }
  .order-head-list{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height:20px;
    line-height:20px;
  }
  .order-head-list span{
    font-size:14px;
    color: #333333;
  }
  .order-head-list i{
    font-size:12px;
  }
  .order-head-list i.icon-gongchenggaizao1{
    background-color: #4bc4a3;
  }
  .order-head-list i.icon-shebeiweixiu1{
    background-color: #64a1d5;
  }
  .order-head-list i.icon-yandaoqingxi1{
    background-color: #fac751;
  }
  .order-head-list i.icon-qita1{
    background-color: #b3b3b3;
  }
  .order-status{
    text-align: right;
    color: #06a0de;
    width: 70px;
    padding-left: 10px;
    font-size: 14px;
    line-height:20px;
  }
  .order-main{
    background-color: #f7f8f8;
    padding: 12px;
    border-bottom: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
  }
  .order-main h4{
    font-size: 14px;
    color: #333333;
  }
  .order-main p{
    font-size: 13px;
    color: #666666;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-bottom: 6px;
  }
  .order-main p:last-child{
    padding-bottom: 0;
  }
  .order-foot{
    padding: 10px 12px;
    font-size:13px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .order-foot p{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .order-foot p:last-child span{
    display:none;
  }
  .order-foot p:last-child{
    text-align:right;
    text-decoration:underline;
    color:#06a0de;
  }
  .order-price{
    color: #ff0000;
  }
  .order-price p:first-child{
    color:#333333;
    font-size:13px;
  }
  .no-order-wrap{
    position: absolute;
    left: 0;
    top:40px;
    right:0;
    bottom: 50px;
  }

  .no-order{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }




</style>
