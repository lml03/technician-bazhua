<template>
  <div>
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <!--放大图片-->
    <div class="zoom-img-wrap" v-if="showZoomImg">
      <div class="close-img-btn" v-on:click="showZoomImg = false">
        <img alt="" src="../assets/images/close-btn.png">
      </div>
      <img alt="" v-bind:src="zoomImgUrl">
    </div>
    <div class="popup" id="popup" v-show="isPopup"></div>
    <div class="weui-popup" v-if="showCompleteOrder">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd">是否维修完成</div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" v-on:click="showCompleteOrder = false">否</a>
          <a href="javascript:;" class="weui-dialog__btn color-ff6" v-on:click="completeOrder()">是</a>
        </div>
      </div>
    </div>
    <div class="weui-popup" v-if="showCannotOrder">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd">是否无法维修</div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" v-on:click="showCannotOrder = false">否</a>
          <a href="javascript:;" class="weui-dialog__btn color-ff6"  v-on:click="cannotCOrder()">是</a>
        </div>
      </div>
    </div>
    <div class="weui-popup" v-if="showCancelOrder">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd" id="weui-dialog__hd">是否取消订单</div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" v-on:click="showCancelOrder = false">否</a>
          <a href="javascript:;" class="weui-dialog__btn weui-dialog-cancel color-ff6" v-on:click="cancelOrder()">是</a>
        </div>
      </div>
    </div>
    <div class="order-price-popup" v-if="showPopup">
      <div class="order-price-popup-inner">
        <h5>请输入维修金额<i class="close-icon" v-on:click="closePopup()" >x</i></h5>
        <div class="order-price-popup-info">
          <p class="order-price-input-wrap">
            <span class="order-price-tag">上门费用</span>
            <input v-model="post.visitCost" type="text" placeholder="请输入费用" class="order-price-input" />
          </p>
          <p class="order-price-input-wrap">
            <span class="order-price-tag">维修费用</span>
            <input v-model="post.maintenanceCost" type="text" placeholder="请输入费用" class="order-price-input" />
          </p>
          <p class="order-price-input-wrap">
            <span class="order-price-tag">配件费用</span>
            <input v-model="post.partsCost" type="text" placeholder="请输入费用" class="order-price-input" />
          </p>
          <div class="fix-price-btn-wrap">
            <span class="fix-price-btn" v-on:click="setPriceConfirm()">确定</span>
          </div>
        </div>
      </div>
    </div>

    <div class="order-detail-wrap" v-if="post">
      <div class="order-detail-head">
        <div>
          <i class="order-icon iconfont icon-wodedingdan1"></i>
          <span class="order-status">{{ post.orderStatus }}</span>
        </div>
        <div class="contact-service">
          <a href="tel:4008621623">
            <i class="contact-icon iconfont icon-lianxijishi"></i>
            <span>联系客服</span>
          </a>
        </div>
      </div>
      <div class="order-detail-main">
        <div class="order-address">
          <h4>{{ post.shopName }}</h4>
          <div class="order-address-info">
            <h5>
              <div class="order-contact-info">
                <i class="iconfont icon-didian site-icon"></i>
                <span>{{ post.contactName }}</span>
                <span class="color-ff6"><a class="order-contact-phone" v-bind:href="'tel:' + post.mobile">{{ post.mobile }}</a></span>
              </div>
            </h5>
            <div class="order-address-map">
              <div class="order-site-info">地址：<span>{{ post.address }}</span></div>
              <div class="order-site-map">
                <router-link class="order-site-map" :to="{ name: 'OrderLocation', params: { address: post.address, orderCoord: post.orderCoord }}">
                  地图
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="order-type">
          <p>上门时间：<span>{{ post.visitDate }}</span></p>
          <p>维修类型：<span>{{post.orderType}}</span>
          </p>
          <p>故障描述：<span>{{ post.faultContent }}</span></p>
          <div class="breakdownImgWrap">
            <div></div>
            <ul class="breakdownImg">
              <li v-for="image in faultImage" v-on:click="zoomImg(image)">
                <img alt="" v-bind:src="image">
              </li>
            </ul>
          </div>
        </div>
        <div class="order-number">
          <div class="order-number-info">
            <p>订单编号：<span>{{ post.orderNo }}</span></p>
            <p>提交时间：<span>{{ post.createDate }}</span></p>
          </div>
          <div class="estimate-cost" v-if="post.orderStatus == '待维修' || post.orderStatus == '已取消' || post.orderStatus == '无法维修'">价格：待估</div>
          <div class="computeCost" v-if="post.orderStatus == '待收款'">
            <h5>
              <span>费用详情</span>
              <span><a href="javascript:;" v-on:click="editCost()">修改金额</a></span>
            </h5>
            <p>
              <span>上门费用</span>
              <span>￥{{post.visitCost}}</span>
            </p>
            <p>
              <span>维修费用</span>
              <span>￥{{post.maintenanceCost}}</span>
            </p>
            <p>
              <span>配件费用</span>
              <span>￥{{post.partsCost}}</span>
            </p>
          </div>
          <div class="computeCost" v-if="post.orderStatus == '已完成'">
            <h5>
              <span>费用详情</span>
            </h5>
            <p>
              <span>上门费用</span>
              <span>￥{{post.visitCost}}</span>
            </p>
            <p>
              <span>维修费用</span>
              <span>￥{{post.maintenanceCost}}</span>
            </p>
            <p>
              <span>配件费用</span>
              <span>￥{{post.partsCost}}</span>
            </p>
          </div>
        </div>
        <p class="pay-coupon-prompt" v-if="post.orderStatus == '待维修'">八爪承诺：15天设备出现与报修同故障免费维修</p>
      </div>
      <div v-if="post.orderStatus == '待维修'" class="set-status-wrap">
        <span class="set-status-btn" v-on:click="showCancelOrder = true">取消订单</span>
        <span class="set-status-btn" v-on:click="showCannotOrder = true">无法维修</span>
        <span style="border: 1px solid #06a0de;color:#06a0de;" class="set-status-btn" v-on:click="editCost()">维修完成</span>
      </div>
      <div class="get-pay-wrap" v-if="post.orderStatus == '待收款'">
        <div>
          <router-link :to="{ name: 'MyOrder'}">查看订单</router-link>
        </div>
        <div>
          <router-link :to="{ name: 'MyHome'}">回到首页</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  export default {
    name: 'OrderDetail',
    data () {
      return {
        isPopup: false,
        loading: false,
        post: {},
        error: null,
        orderNo: "",
        showPopup: false,
        showCannotOrder: false,
        showCompleteOrder: false,
        showCancelOrder: false,
        //v2.0
//        orderStatus: "",//监听状态变化以决定是否重新发送请求
        showEditPrice: false,
        faultImage: [],
        zoomImgUrl: "",
        showZoomImg: false
      }
    },
    created () {
      let that = this;
      let orderNo = that.$route.params.orderNo;
      if(orderNo){
        localStorage.setItem("orderNo", orderNo);
      }

      that.orderNo = localStorage.getItem("orderNo");

    },
    mounted: function () {
      this.fetchData();
    },
//    watch:{
//      orderStatus: function () {
//        this.fetchData();
//      }
//    },
    methods: {
      zoomImg(image){
          this.zoomImgUrl = image;
          this.showZoomImg = true;
      },
      fetchData () {
        let that = this;
        that.error = that.post = null;
        that.loading = true;
        $.ajax({
          type: "get",
          dataType: "json",
          url: ApiUrl.findOrderBasicInfo,
          data: {
            orderNo: that.orderNo
          },
          success: function (data) {
            that.loading = false;

            /*2017/11/16 v2.0 新增故障图*/
            if(data.faultImage){
              let faultImageArr = data.faultImage.split(";");
              faultImageArr.length = faultImageArr.length - 1;
              that.faultImage = faultImageArr;
            }


            //对获取的费用做相关处理
            data.visitCost = data.visitCost.toFixed(2);
            data.partsCost = data.partsCost.toFixed(2);
            data.maintenanceCost = data.maintenanceCost.toFixed(2);


            //类型转换
            if (data.orderType == 1) {
              data.orderType = "设备维修";
            } else if (data.orderType == 2) {
              data.orderType = "烟道清洗";
            } else if (data.orderType == 3) {
              data.orderType = "工程改造";
            } else if (data.orderType == 4) {
              data.orderType = "其他";
            }

            /*状态转换*/
            if (data.orderStatus == 12) {
              data.orderStatus = "已取消";
            } else if (data.orderStatus == 13) {
              data.orderStatus = "无法维修";
            } else if (data.orderStatus == 16) {
              data.orderStatus = "已完成";
            } else if (data.orderStatus == 5) {
              data.orderStatus = "待维修";
            } else if (data.orderStatus == 8) {
              data.orderStatus = "待收款";
            }

            that.post = data;

          }
        });
      },
      editCost () {
        this.showPopup = true;
      },
      setPriceConfirm() {
        let pattern = /^\d+(\.\d+)?$/;
        let that = this;
        if(that.post.visitCost == "" || that.post.maintenanceCost == "" || that.post.partsCost == ""){
          that.isPopup = true;
          $("#popup").html("费用不能为空");
          setTimeout(function () {
            that.isPopup = false;
          },2000);
          return false;
        }
        if (!pattern.test(that.post.visitCost) || !pattern.test(that.post.maintenanceCost) || !pattern.test(that.post.partsCost)) {
          that.isPopup = true;
          $("#popup").html("费用格式错误");
          setTimeout(function() {
            that.isPopup = false;
          }, 2000);
          return false;
        }

        that.post.visitCost = parseFloat(that.post.visitCost).toFixed(2);
        that.post.maintenanceCost = parseFloat(that.post.maintenanceCost).toFixed(2);
        that.post.partsCost = parseFloat(that.post.partsCost).toFixed(2);

        let orderInfoJson = {
          orderNo: that.orderNo,
          visitCost: that.post.visitCost,
          maintenanceCost: that.post.maintenanceCost,
          partsCost: that.post.partsCost
        };

        $.ajax({
          type: "get",
          dataType: "json",
          url: ApiUrl.updateOrderPrice,
          data: {
            orderInfoJson: JSON.stringify(orderInfoJson),
            userType: 2,
            orderStatus: 8
          },
          success: function (data) {
            if(data){
              that.showPopup = false;
              that.isPopup = true;
              $("#popup").html("提交成功");
              that.post.orderStatus = "待收款";
              setTimeout(function () {
                that.isPopup = false;
              }, 2000);

            }else{
              that.showPopup = false;
              that.isPopup = true;
              $("#popup").html("提交失败");
              setTimeout(function () {
                that.isPopup = false;
              }, 2000);
            }

          },
          error: function (err) {
            that.showPopup = false;
            that.isPopup = true;
            $("#popup").html("提交失败");
            setTimeout(function () {
              that.isPopup = false;
            }, 2000);
          }
        });
      },
      closePopup () {
        this.showPopup = false;
      },
      cancelOrder () {
        this.changeOrderStatus(12);
        this.showCancelOrder = false;
      },
      cannotCOrder () {
        this.changeOrderStatus(13);
        this.showCannotOrder = false;
      },
      completeOrder () {
        this.changeOrderStatus(8);
        this.showCompleteOrder = false;
      },
      changeOrderStatus(orderStatus) {
        let that = this;
        $.ajax({
          type: "get",
          dataType: "json",
          url: ApiUrl.updateOrderStatus,
          data: {
            orderStatus: orderStatus,
            orderNo: that.orderNo,
            mobile: localStorage.getItem("technicianPhone")
          },
          success: function (data) {
            if(data){
              localStorage.setItem("orderStatus", orderStatus);
              if(orderStatus == 12){
                that.post.orderStatus = "已取消";
              }else if(orderStatus == 13){
                that.post.orderStatus = "无法维修";
              }else if(orderStatus == 8){
                that.post.orderStatus = "待收款";
              }
              that.showPopup = false;
              that.isPopup = true;
              $("#popup").html("操作成功");
              setTimeout(function () {
                that.isPopup = false;
              }, 2000);
            }else{
              that.isPopup = true;
              $("#popup").html("提交失败");
              setTimeout(function () {
                that.isPopup = false;
              }, 2000);
            }
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .color-ff6{
    color: #06a0de;
  }
  .order-detail-wrap{
    padding-bottom: 70px;
  }
  .order-detail-head{
    padding: 15px;
    background-color: #06a0de;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    margin-bottom: 10px;
  }
  .order-detail-head > div{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .order-icon{
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 50%;
    color: #06a0de;
    display: inline-block;
    margin:0 10px;
  }
  .order-status{
    color: #fff;
  }
  .contact-service a{
    color: #fff;
    text-align: right;
    line-height: 35px;
    display: block;
  }
  .contact-icon{
    font-size: 22px;
    margin-right: 10px;
    vertical-align: middle;
  }

  .order-detail-main{

  }

  .order-detail-main > div{
    margin-bottom: 10px;
    background-color: #ffffff;
  }
  .order-address h4{
    padding: 10px;
    color: #333333;
    font-size: 14px;
    border-bottom: 1px solid #eeeeee;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .site-icon{
    color: #666666;
    font-size: 24px;
    margin-right: 10px;
  }
  .order-address-info,.order-type,.order-number-info{
    padding: 10px;
    font-size: 13px;
  }
  .order-address-info h5{
    color: #333333;
    font-size: 16px;
    line-height: 26px;
    padding-bottom: 5px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }

  .order-address-map{
    color: #666666;
    font-size: 13px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding-bottom:7px;
  }
  .order-site-info,.order-contact-info{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .order-site-map,.order-contact-phone{
    color: #06a0de;
  }
  .order-site-map a{
    color: #06a0de;
  }
  .order-number h5{
    padding: 10px;
    border-top: 1px solid #eeeeee;
  }
  .order-number h5 span{
    color: #06a0de;
  }

  .order-operation{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 7px;

  }
  .order-operation > div{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    border-right: 1px solid #f0eff4;
    box-sizing: border-box;
    text-align: center;
    line-height: 34px;
  }
  .order-operation > div:last-child{
    border-right: none;
  }
  .order-operation > div span{
    color: #333333;
    font-size: 14px;
  }
  .order-operation > div i{
    width: 24px;
    color: #06a0de;
    margin-right: 10px;
    vertical-align: middle;
  }

  .order-pay-btn > div{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 0 6px;
  }


  .order-price-popup{
    position: fixed;
    left: 0;
    top:0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
  .order-price-popup-inner{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 280px;
    background-color: #ffffff;
    border-radius: 6px;
  }
  .order-price-popup-inner h5{
    border-bottom: 1px solid #eeeeee;
    line-height: 50px;
    text-align: center;
    position: relative;
  }
  .close-icon{
    position: absolute;
    right:5px;
    top:5px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 16px;
    color: #666666;
  }
  .order-price-popup-info{
    padding: 15px;
  }
  .fix-price-btn{
    line-height: 40px;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    background-color: #06a0de;
    border-radius: 6px;
    display: block;
  }

  .order-price-input-wrap{
    padding: 10px;
    border-radius: 6px;
    background-color: #1e2027;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    margin-bottom: 15px;
    font-size: 14px;
    color: #1e2027;
  }
  .order-price-tag{
    width: 110px;
    border-right: 1px solid #ffffff;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
  }
  .order-price-input{
    display: block;
    border: none;
    outline: none;
    -webkit-appearance: none;
    background-color: transparent;
    width: 100%;
  }
  .set-status-wrap{
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #ffffff;
    border-top: 1px solid #dcdcdc;
    padding: 10px 5px;
    text-align: right;
    font-size: 0;
  }
  .set-status-btn{
    margin: 0 5px;
    border: 1px solid #b3b3b3;
    color: #666666;
    font-size: 12px;
    line-height: 24px;
    box-sizing: border-box;
    padding: 0 15px;
    border-radius: 12px;
    display: inline-block;
  }

  .order-detail-wrap{
    padding-bottom: 70px;
  }
  .order-detail-head{
    padding:14px 12px;
    background-color: #06a0de;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    margin-bottom: 10px;
  }
  .order-detail-head > div{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    line-height:34px;
  }
  .order-icon{
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    background-color: #ffffff;
    border-radius: 50%;
    color: #06a0de;
    display: inline-block;
    margin-right: 10px;
    position:relative;
  }
  .order-icon:after{
    position:absolute;
    width:1px;
    height:16px;
    background-color:#fff;
    left:50%;
    top:-15px;
    content:"";
  }
  .order-status{
    color: #fff;
    font-size:14px;
  }
  .contact-service{
    color: #fff;
    text-align: right;
    line-height: 35px;
  }
  .contact-icon{
    font-size: 22px;
    margin-right: 10px;
    vertical-align: middle;
  }
  .contact-service span{
    font-size:14px;
  }
  .order-detail-main{

  }

  .order-detail-main > div{
    margin-bottom: 10px;
    background-color: #ffffff;
  }
  .order-address h4{
    padding: 10px;
    color: #333333;
    font-size: 14px;
    border-bottom: 1px solid #eeeeee;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height:20px;
    line-height:20px;
  }
  .order-address-info{
    padding: 10px;
  }
  .order-type,.order-number-info{
    padding: 18px 10px;
  }
  .order-address-info h5{
    color: #333333;
    font-size: 13px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding-top:3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .order-address-info p{
    color: #666666;
    font-size: 13px;
    padding:6px 0 7px 0;
    height:20px;
    line-height:20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .order-address-info > div:first-child{
    margin-right:10px;
  }

  .order-type p:first-child,.order-number-info p:first-child{
    padding-bottom:2px;
  }
  .order-type p:last-child,.order-number-info p:last-child{
    padding-top:2px;
  }
  .order-type p{
    padding-bottom: 10px !important;
  }


  .order-number h5{
    padding: 10px;
    font-size:14px;
    border-top: 1px solid #eeeeee;
  }
  .order-number h5 span{
    color: #06a0de;
  }

  .order-operation > div{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    border-right: 1px solid #f0eff4;
    box-sizing: border-box;
    text-align: center;
    line-height: 34px;
  }
  .order-operation > div:last-child{
    border-right: none;
  }
  .order-operation > div span{
    color: #333333;
    font-size: 14px;
  }
  .order-operation > div i{
    width: 24px;
    color: #06a0de;
    margin-right: 10px;
    font-size:18px;
  }

  .order-pay-btn > div{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 0 6px;
  }

  .wx-pay,.offline-pay{
    display: block;
    border-radius: 6px;
    line-height: 40px;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
  }


  .order-price-popup{
    position: fixed;
    left: 0;
    top:0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 99
  }
  .order-price-popup-inner{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 280px;
    background-color: #ffffff;
    border-radius: 6px;
  }
  .order-price-popup-inner h5{
    border-bottom: 1px solid #eeeeee;
    line-height: 50px;
    text-align: center;
  }
  .fix-price-btn-wrap{
    padding-top: 10px;
  }
  .fix-price-btn{
    line-height: 40px;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    background-color: #06a0de;
    border-radius: 6px;
    display: block;
  }

  .order-price-input-wrap{
    padding: 10px;
    border-radius: 6px;
    background-color: #eef0f2;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    color:#1e2027;
    font-size:14px;
  }
  .order-price-tag{
    width: 110px;
    border-right: 1px solid #666666;
    height: 20px;
    line-height: 20px;
    margin-right: 10px;
  }
  .order-price-input{
    display: block;
    border: none;
    outline: none;
    -webkit-appearance: none;
    background-color: transparent;
    width: 100%;
  }
  .set-status-wrap{
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #ffffff;
    border-top: 1px solid #dcdcdc;
    padding: 10px 5px;
  }

  .order-type p,.order-number-info p,.order-number h5{
    color:#666;
    font-size:13px;
  }
  .order-number-info p{
    padding-bottom: 10px !important;
  }
  .order-number-info p:last-child{
    padding-bottom: 0 !important;
  }


  .site-icon {
    color: #666666;
    font-size: 18px;
    margin:0 10px;
    width: 20px;
    line-height: 24px;
    display: inline-block;
  }
  .site-icon span:first-child{
    padding-right: 15px;
  }





  /*v2.0*/
  .breakdownImgWrap {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .breakdownImgWrap>div {
    width: 65px;
  }
  .breakdownImgWrap>ul {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    font-size: 0;
  }
  .breakdownImgWrap>ul>li {
    width: 50px;
    height: 50px;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    overflow: hidden;
    display: inline-block;
    margin: 10px 10px 0 0;
  }
  .breakdownImgWrap>ul>li>img {
    width: 100%;
    height: 100%;
  }
  .computeCost{
    padding-bottom: 5px;
  }
  .computeCost h5 {
    padding: 10px;
    font-size: 14px;
    border-top: 10px solid #f1f6fa;
    border-bottom: 1px solid #eeeeee;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    margin-bottom: 5px;
  }
  .computeCost h5 span:first-child, .computeCost p>span:first-child {
    color: #666 !important;
    width: 100px;
  }
  .computeCost h5 span:last-child {
    color: #e83b4f !important;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: right;
  }
  .computeCost>p {
    padding: 5px 10px;
    font-size: 14px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .computeCost h5 span:first-child, .computeCost p>span:first-child {
    color: #666 !important;
    width: 100px;
  }
  .computeCost h5 span, .computeCost>p span {
    display: inline-block;
  }
  .computeCost p>span:last-child {
    color: #666 !important;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    text-align: right;
  }
  .computeCost h5 span, .computeCost>p span {
    display: inline-block;
  }


  .get-pay-btn{
    width: 140px;
    background-color: #e83b4f;
    color: #FFFFFF;
    text-align: center;
    line-height: 50px;
  }

  .get-pay-money{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 0 10px;
    color: #e83b4f;
    line-height: 50px;
  }

  .computeCost h5 span:last-child a {
    width: 60px;
    height: 22px;
    display: inline-block;
    line-height: 22px;
    text-align: center;
    background-color: #318af8;
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
  }
  .computeCost h5 span{
    line-height: 22px;
  }

  .estimate-cost{
    border-top: 1px solid #eeeeee;
    padding: 10px;
    line-height: 20px;
    font-size: 13px;
    color: #333333;
    margin-top: -10px;
  }
  .estimate-cost span {
    font-weight: bold;
  }

  .pay-coupon-prompt {
    font-size: 13px;
    color: #b3b3b3;
    padding: 0 10px;
  }

.get-pay-wrap{
  padding: 12px 6px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  background-color: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
  .get-pay-wrap > div{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding: 0 6px;
  }
  .get-pay-wrap > div > a{
    display: block;
    border-radius: 6px;
    line-height: 40px;
    text-align: center;
    color: #ffffff;
    font-size: 14px;
    text-decoration: none;
    border: 1px solid #666;
    color: #666;
  }


  .zoom-img-wrap{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 99999;
  }
  .zoom-img-wrap img{
    position: absolute;
    left: 0;
    right:0;
    top: 50%;
    width:100%;
    transform: translateY(-50%);
    max-height:500px;
  }
  .close-img-btn{
    position: absolute;
    top: 10px;
    right: 10px;
    width: 24px;
    height: 24px;
  }
  .close-img-btn img{
    width:100%;
  }










</style>
