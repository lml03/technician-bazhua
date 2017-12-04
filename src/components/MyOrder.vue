<template>
  <div class="myOrder">
      <div class="popup" id="popup" v-show="isPopup"></div>
      <ul class="my-order-menu">
        <li v-for="orderMenu in orderMenus" v-bind:class="{ 'cur': curMenu == orderMenu.orderStatus }" v-on:click="curMenu = orderMenu.orderStatus">{{ orderMenu.menuName }}</li>
      </ul>
      <div class="order-list-wrap has-order" v-if="hasOrder && isLogin">
        <div class="order-list-inner" v-for="orderList in orderLists">
          <router-link :to="{ name: 'OrderDetail', params: { orderNo: orderList.orderNo, orderStatus: orderList.orderStatus }}">
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
                  <span v-if="orderList.orderStatus == 5">待维修</span>
                  <span v-else-if="orderList.orderStatus == 8">待收款</span>
                  <span v-else-if="orderList.orderStatus == 12">已取消</span>
                  <span v-else-if="orderList.orderStatus == 13">无法完成</span>
                  <span v-else-if="orderList.orderStatus == 16">已完成</span>
                </div>
              </div>
              <div class="order-main">
                <p>维修类型：
                  <span v-if="orderList.orderType == 1">设备维修</span>
                  <span v-else-if="orderList.orderType == 2">烟道清洗</span>
                  <span v-else-if="orderList.orderType == 3">工程改造</span>
                  <span v-else-if="orderList.orderType == 4">其他</span>
                </p>
                <p>上门时间：<span>{{ orderList.visitDate }}</span></p>
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
          <img width="172" height="140" src="../assets/images/no-order.png" alt="">
          <p>您还没有相关订单</p>
        </div>
      </div>
      <div class="no-login-wrap" v-if="!isLogin">
        <div class="no-login">
          <img width="172" height="140" src="../assets/images/no-order.png" alt="">
          <p><router-link to="Auth">请登录</router-link>后查看订单</p>
        </div>
      </div>
    <common-footer></common-footer>
  </div>
</template>
<script>
import CommonFooter from './CommonFooter.vue';
import ApiUrl from '../api/apiUrl';
export default {
  name: 'MyOrder',
  data () {
    return {
      orderMenus: [
        {orderStatus: -1, menuName: "全部"},
        {orderStatus: 5, menuName: "待维修"},
        {orderStatus: 8, menuName: "待收款"}
      ],
      curMenu: -1,
      orderLists: [],
      hasOrder: false,
      isPopup: false,
      isLogin: false
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
        url: ApiUrl.findOrderList,
        data: {
          orderStatus: that.curMenu,
          mobile: localStorage.getItem("technicianPhone")
        },
        success: function (data) {
          if(data.length > 0){
            that.orderLists = data;
            that.hasOrder = true;
          }else{
            that.hasOrder = false;
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
  },
  mounted: function () {
//    let curMenu = localStorage.getItem("curMenu");
//    if(curMenu){
//      this.curMenu = curMenu;
//    }
    //this.fetchData();
    let technicianPhone = localStorage.getItem("technicianPhone");
    if(technicianPhone){
      this.fetchData();
      this.isLogin = true;
    }
  },
  beforeRouteEnter (to, from, next){
      next(vm => {
        $(".app").find("ul.commonFooter li").eq(2).addClass("active").siblings().removeClass("active");
        if(from.name == "MyCenter" && vm.$route.params.clickMenu){
          vm.curMenu = vm.$route.params.clickMenu;
        }
      })
  },
  watch: {
      curMenu: "fetchData"
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .my-order-menu{
    display: flex;
    display: -webkit-flex;
    display: -webkit-box;
    background-color: #ffffff;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 999;
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
  .my-order-list{
    padding-top: 47px;
  }
  .my-order-list ul li{
    margin-top: 10px;
    background-color: #ffffff;
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
  }
  .no-login p a{
    color: #06a0de;
    text-decoration: underline;
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
  .weui-cell__bd p,.weui-media-box__title{
    color: #333333;
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
    color: #b4b3b1;
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
    padding: 47px 0 70px 0;
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
  .order-price{
    color: #06a0de;
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
  .order-list-wrap{
    padding: 40px 0 70px 0;
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
    color: #06a0de;
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


  .weui-tabbar__icon {
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size:22px !important;
  }
  .no-order{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }



</style>
