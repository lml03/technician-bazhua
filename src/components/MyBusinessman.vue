<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="my-businessman">
    <ul class="my-order-menu">
      <li v-for="orderMenu in orderMenus" v-bind:class="{ 'cur': curMenu == orderMenu.status }" v-on:click="curMenu = orderMenu.status">{{ orderMenu.menuName }}</li>
    </ul>
    <div class="order-list-wrap has-order">
      <div class="order-list-inner">
          <div class="order-list" v-for="businessman in businessmanList">
            <div class="order-head">
              <div class="order-head-list">
                <span>{{ businessman.shopName }}</span>
              </div>
              <div class="order-status">
              </div>
            </div>
            <div class="order-main">
              <p>联系人：{{ businessman.contactName }}</p>
              <p>电话：{{ businessman.mobile }}</p>
              <p>地址：{{ businessman.address }}</p>
            </div>
            <div class="order-foot" v-if="businessman.technicianEarnings">
              带来收益：<span class="order-price">{{ businessman.technicianEarnings }}</span>
            </div>
            <div class="order-foot" v-else>
              带来收益：暂无<span class="no-income">（核实通过后，即可产生收益）</span>
            </div>
          </div>
      </div>
    </div>
    <router-link to="InviteBusinessman" class="invite-businessman-btn">+邀请商家</router-link>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  export default {
    name: 'my-businessman',
    data() {
      return {
        orderMenus: [
          {status: 0, menuName: "已核实"},
          {status: 1, menuName: "待核实"}
        ],
        curMenu: 0,
        technicianId: 0,
        businessmanList: []
      }
    },
    created(){
      let that = this;
      let technicianInfo = JSON.parse(localStorage.getItem("technicianInfo"));
      if(technicianInfo.technicianId){
          that.technicianId = technicianInfo.technicianId;
      }
    },
    mounted(){
      this.fetchData();
    },
    methods:{
      fetchData: function () {
        let that = this;
        $.ajax({
          type: "get",
          dataType: "json",
          url: ApiUrl.findCustomerInfoId,
          data: {
            technicianId: that.technicianId,
            status: that.curMenu
          },
          success: function (data) {
            var resData = data;
            that.businessmanList = resData.custlist;
            console.log(resData.custlist);
          },
          error: function (err) {
            console.log("error");
          }
        });
      }
    },
    watch: {
      curMenu: "fetchData"
    }
  }
</script>

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
  .my-order-list ul li{
    margin-top: 10px;
    background-color: #ffffff;
  }
  .no-login p a{
    color: #06a0de;
    text-decoration: underline;
  }
  .weui-cell__bd p{
    color: #333333;
  }
  .no-order p,.no-login p{
    text-align: center;
    margin-top: 10px;
    color: #06a0de;
  }

  /*2017-7-6样式更改*/

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
    color: #ff0000;
  }
  .order-list-inner a{
    color: #333333;
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
  .order-price p:first-child{
    color:#333333;
    font-size:13px;
  }

  .no-order{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

.no-income{
  color: #b3b3b3;
  font-size: 10px;
}
  .invite-businessman-btn{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 44px;
    line-height: 44px;
    background-color: #14a5e0;
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
  }

</style>
