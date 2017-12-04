<template>
  <div class="myHome">
    <!--v2.0认证提醒-->
    <div class="authenticate-note-wrap" v-show="showAuthenticateNote">
      <div class="authenticate-note">
        <h3 id="authenticate-note">维修师傅认证</h3>
        <p class="authenticate-msg" id="authenticate-msg">立即认证维修师傅，优质订单等你来接。</p>
        <router-link to="IdentityLegalize" class="authenticate-btn" id="authenticate-btn">立即去认证</router-link>
        <span class="close-authenticate-note" v-on:click="showAuthenticateNote = false">x</span>
      </div>
    </div>
    <div class="popup" id="popup" v-show="isPopup"></div>
    <div class="sign-popup-wrap" v-if="isSignPopup">
      <div class="sign-popup-inner">
        <div class="sign-popup-info">
          <img width="160" height="170" src="../assets/images/sign.png" />
          <p>恭喜您获得10个积分</p>
          <p>开始您今天的财富之旅吧</p>
        </div>
        <a href="javascript:;" class="sign-popup-btn" v-on:click="closePopup">知道了</a>
      </div>
    </div>
    <div class="bulletin-wrap" v-if="showBulletin">
      <div class="bulletin">
        <i class="iconfont">&#xe615;</i>
        <router-link to="Auth" v-if="!isLogin">
          <div class="bulletin-info">
            <span>马上认证技师，获取在线订单</span>
            <span class="bulletin-close" v-on:click="closeBulletin">x</span>
          </div>
        </router-link>
        <div class="bulletin-info" v-else>
          <span>我正在工作中，劳动人民最光荣</span>
          <span class="bulletin-close" v-on:click="closeBulletin">x</span>
        </div>
      </div>
      <!--<div class="bulletin text-align-center" v-else>我正在工作中，劳动人民最光荣</div>-->
    </div>
    <div class="msg-bulletin" v-if="msgType === 'A'">
      <div class="weui-cell">
        <div class="weui-cell__hd msg-bulletin-icon iconfont">&#xe617;</div>
        <div class="weui-cell__bd">
          <p>您有新订单</p>
        </div>
      </div>
      <p class="new-order-msg"><span>{{ orderMsg.name }}</span>,您好！系统派发了一个维修订单，店家是<span>{{ orderMsg.shopName }}</span>，请处理。</p>
      <router-link v-if="orderMsg.channel == 6" :to="{ name: 'WorkorderDetail', params: { orderNo: orderMsg.orderNo, orderStatus: orderMsg.orderStatus }}">
        <span class="order-detail-btn">查看详情</span>
      </router-link>
      <router-link v-else :to="{ name: 'OrderDetail', params: { orderNo: orderMsg.orderNo, orderStatus: orderMsg.orderStatus }}">
        <span class="order-detail-btn">查看详情</span>
      </router-link>
    </div>
    <div id="container" class="container"></div>
    <div style="display: none">{{ locaLat }}</div>
    <div class="operate-area">
      <div class="operate-area-inner">
        <i class="side-operate-btn left-operate-btn iconfont" v-on:click="refreshPosition()">&#xe609;</i>
        <i class="side-operate-btn right-operate-btn iconfont"  v-if="isSign" style="color:#b6b6b6">&#xe619;</i>
        <i class="side-operate-btn right-operate-btn iconfont" v-on:click="checkIn()" v-else>&#xe619;</i>
        <div class="center-operate-btn start-receive-order" v-show="isStartOrder">
          <router-link to="Auth">
            <i class="center-operate-icon iconfont">&#xe618;</i>
            <span>开始接单</span>
          </router-link>
        </div>
        <div class="center-operate-btn stop-receive-order" v-show="!isStartOrder" v-on:click="stopOrder">
          <i class="center-operate-icon iconfont">&#xe618;</i>
          <span>停止接单</span>
        </div>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
  import CommonFooter from './CommonFooter.vue';
  import ApiUrl from '../api/apiUrl';
  import AppConfig from '../api/appConfig';
  export default {
    name: 'orderMap',
    data () {
      return {
        timer: null,
        isSign: false,
        isLogin: false,
        isPopup: false,
        isSignPopup: false,
        isStartOrder: true,
        orderMsg: null,
        msgType: '',
        locaLat: 39.916527,
        locaLng: 116.397128,
        showBulletin: true,

        //v2.0新增
        showAuthenticateNote:false
      }
    },
    components: {
      CommonFooter
    },
    created: function () {
      this.forceFollow();
    },
    mounted: function () {
      let that = this;
      that.getPosition();

      //签到日期判断
      let technicianPhone = localStorage.getItem("technicianPhone");
      if(technicianPhone){
        that.isLogin = true;
        let nowDate = that.getDate().split(","),
          nYear = nowDate[0],
          nMonth = nowDate[1],
          nDate = nowDate[2];
        let lastSign = localStorage.getItem("signDate");
        if(lastSign){
          let signDate = lastSign.split(","),
            lYear = signDate[0],
            lMonth = signDate[1],
            lDate = signDate[2];
          if(nYear > lYear || nMonth > lMonth || nDate > lDate){
            that.isSign = false;
          }else{
            that.isSign = true;
          }
        }
      }

    },
    methods: {
      forceFollow: function () {
        //$.fn.cookie('openid', "owNlZwbiIkspQ4k908vuJw-4b8EY", { path: '/' });
        let that = this;
        let openid = $.fn.cookie('openid');
        if(!openid){
          let domainName = location.href.split("#")[0];
          let appid = AppConfig.bazhuaAppid;
          $.fn.cookie('appid', appid, { path: '/' });
          let redirect_uri = encodeURIComponent(domainName + "#/GetOauthRedirect");
          let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect";
          location.href = url;
        }else{
          let nickname = $.fn.cookie('nickname');
          let mobile = localStorage.getItem("technicianPhone");
          let headimgurl = $.fn.cookie('headimgurl');
          $.ajax({
            type: "GET",
            dataType: "json",
            url: ApiUrl.addUserLoginInfo,
            data: {
              openid: openid,
              nickname: nickname,
              mobile: mobile,
              userType: 2, //1代表商户，2代表技师
              headimgurl: headimgurl
            },
            success: function (res) {
              let resData = res;
              if(resData.status == -1){
                console.log("添加用户失败");
              }else if(resData.status == 0){
                console.log("添加用户成功");
                sessionStorage.setItem("mallUserId", resData.userId);
                if(resData.onLineStatus === 3){
                  that.isStartOrder = false;
                }
                if(resData.idCardStatus === 1){
                  that.showAuthenticateNote = true;
                  $("#authenticate-msg").html("立即认证维修师傅，优质订单等你来接。");
                  $("#authenticate-btn").html("立即去认证");
                  $("#authenticate-note").html("维修师傅认证");
                }else if(resData.idCardStatus === 3){
                  that.showAuthenticateNote = true;
                  $("#authenticate-msg").html("原因：您提交的身份证号码与原身份证信息不符，请检查重新提交！");
                  $("#authenticate-btn").html("重新提交");
                  $("#authenticate-note").html("实名认证失败");
                }
              }else if(resData.status == 1){
                console.log("用户已存在");
                sessionStorage.setItem("mallUserId", resData.userId);
                if(resData.onLineStatus === 3){
                  that.isStartOrder = false;
                }
                if(resData.idCardStatus === 1){
                  that.showAuthenticateNote = true;
                  $("#authenticate-msg").html("立即认证维修师傅，优质订单等你来接。");
                  $("#authenticate-btn").html("立即去认证");
                  $("#authenticate-note").html("维修师傅认证");
                }else if(resData.idCardStatus === 3){
                  that.showAuthenticateNote = true;
                  $("#authenticate-msg").html("原因：您提交的身份证号码与原身份证信息不符，请检查重新提交！");
                  $("#authenticate-btn").html("重新提交");
                  $("#authenticate-note").html("实名认证失败");
                }
              }
            },
            error: function () {
              console.log("error");
            }
          });
          console.log(localStorage.getItem("WXPersonalInfo"));
        }
      },
      closeBulletin: function (e) {
        this.showBulletin = false;
        e.preventDefault();
      },
      refreshPosition: function () {
        this.getPosition();
      },
      locationMap: function () {
        let that = this;
        qq.maps.convertor.translate(new qq.maps.LatLng(that.locaLat, that.locaLng), 1, function(res){
          let latlng = res[0];
          let map = new qq.maps.Map('container',{
            center: latlng,
            zoom: 15,
            disableDefaultUI: true
          });
          let anchor = new qq.maps.Point(34, 38),
            size = new qq.maps.Size(68, 76),
            origin = new qq.maps.Point(0, 0),
            icon = new qq.maps.MarkerImage('/images/locationIcon2.png', size, origin, anchor);
          let marker = new qq.maps.Marker({
            map: map,
            draggable: true,
            position: latlng
          });
          marker.setIcon(icon);
        });
      },
      getDate: function () {
        let aDate = new Date();
        let oYear = aDate.getFullYear();
        let oMonth = aDate.getMonth() + 1;
        let oDate = aDate.getDate();
        let signDate = oYear + "," + oMonth + "," + oDate;
        return signDate;
      },
      receOrderMsg: function () {
        let that = this;
          $.ajax({
            type: "get",
            dataType: "json",
            url: ApiUrl.orderMessage,
            data: {
              mobile: localStorage.getItem("technicianPhone"),
              orderStatus: 5
            },
            success: function (data) {
              if(data.length >= 1){
                that.msgType = "A";
                that.orderMsg = data[0];
              }else{
              }
            },
            error: function (err) {
              that.isPopup = true;
              $("#popup").html("获取信息失败");
              setTimeout(function () {
                that.isPopup = false;
              }, 2000);
            }
          });
      },
      closePopup: function () {
        this.isSignPopup = false;
      },
      getPosition: function () {
        let that = this;
        $.ajax({
          type : 'GET',
          dataType: "json",
          url : ApiUrl.getJsapiTicket,
          async : true,
          data : {
            url : location.href.split('#')[0]
          },
          success : function(data) {
            let res = data;
            if (res) {
              wx.config({
                debug : false,
                appId : AppConfig.bazhuaAppid,
                timestamp : res.timestamp,
                nonceStr : res.nonceStr,
                signature : res.signature,
                jsApiList : [
                  // 所有要调用的 API 都要加到这个列表中
                  'checkJsApi',
                  'getLocation'
                ]
              });
            }
          },
          error : function(xhr, type) {
            console.log('Ajax error!')
          }
        });
        wx.ready(function() {
          wx.checkJsApi({
            jsApiList : [ 'getLocation' ],
            success : function(res) {
              if (res.checkResult.getLocation == false) {
                alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                return;
              }
            }
          });
          wx.getLocation({
            success : function(res) {
              that.locaLat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              that.locaLng = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              that.locationMap();
              $.ajax({
                type : 'POST',
                dataType: "json",
                url : ApiUrl.updateCoord,
                async : true,
                data : {
                  "mobile": localStorage.getItem("technicianPhone"),
                  "coord": that.locaLat + "," + that.locaLng
                },
                success : function(data) {
                  console.log(data);
                },
                error : function(err) {
                  console.log(data);
                }
              });
            },
            cancel : function(res) {
              alert('用户拒绝授权获取地理位置');
            }
          });
        });
      },
      checkIn: function () {
        let that = this;
        let technicianPhone = localStorage.getItem("technicianPhone");
        if(technicianPhone){
          $.ajax({
            type: "get",
            dataType: "json",
            url: ApiUrl.signTechnician,
            data: {
              integral: 10,
              mobile: localStorage.getItem("technicianPhone")
            },
            success: function (data) {
              if(data){
                that.isSign = true;
                that.isSignPopup = true;
                localStorage.setItem("signDate", that.getDate());
              }else{
                that.isPopup = true;
                $("#popup").html("签到失败");
                setTimeout(function () {
                  that.isPopup = false;
                }, 2000);
              }
            },
            error: function (err) {
              that.isPopup = true;
              $("#popup").html("签到失败");
              setTimeout(function () {
                that.isPopup = false;
              }, 2000);
            }
          });
        }else{
          that.isPopup = true;
          $("#popup").html("请先登录");
          setTimeout(function () {
            that.isPopup = false;
          }, 2000);
        }
      },
      stopOrder: function () {
        let technicianPhone = localStorage.getItem("technicianPhone"),
            that = this;
        if (technicianPhone) {
          $.ajax({
            type: "get",
            dataType: "json",
            url: ApiUrl.actionState,
            data: {
              onLineStatus: 3,
              mobile: technicianPhone
            },
            success: function (data) {
              if (data) {
                that.isStartOrder = true;
                localStorage.setItem("stopOrder", "false");
                clearInterval(that.timer);
              } else {
                that.isPopup = true;
                $("#popup").html("停止接单失败");
                setTimeout(function () {
                  that.isPopup = false;
                }, 2000);
              }
            },
            error: function (err) {
              that.isPopup = true;
              $("#popup").html("停止接单失败");
              setTimeout(function () {
                that.isPopup = false;
              }, 2000);
            }
          });
        }
      }
    },
    beforeRouteEnter (to, from, next){
//      if(from.name == "Auth"){
        next(vm => {
          let isStopOrder = localStorage.getItem("stopOrder");
          $(".app").find("ul.commonFooter li").eq(0).addClass("active").siblings().removeClass("active");
          if(isStopOrder == "true"){
            vm.isStartOrder = false;
            vm.receOrderMsg();
            vm.timer = setInterval(function () {
              vm.receOrderMsg();
            },10000);
          }else if(isStopOrder == "false"){
            vm.isStartOrder = true;
          }
        })
//      }else{
//        next();
//      }
    },
    beforeRouteLeave (to, from, next) {
      let that = this;
      if(to.name == "Auth"){
        let technicianPhone = localStorage.getItem("technicianPhone");
        if(technicianPhone){
          $.ajax({
            type: "get",
            dataType: "json",
            url: ApiUrl.actionState,
            data: {
              onLineStatus: 1,
              mobile: technicianPhone
            },
            success: function (data) {
              if (data) {
                that.isStartOrder = false;
                localStorage.setItem("stopOrder", "true");
                that.receOrderMsg();
                that.timer = setInterval(function () {
                  that.receOrderMsg();
                },10000);
              } else {
                that.isPopup = true;
                $("#popup").html("开始接单失败");
                setTimeout(function () {
                  that.isPopup = false;
                }, 2000);
              }
            },
            error: function (err) {
              that.isPopup = true;
              $("#popup").html("开始接单失败");
              setTimeout(function () {
                that.isPopup = false;
              }, 2000);
            }
          });
        }else{
          clearInterval(that.timer);
          next();
        }
      }else{
        clearInterval(that.timer);
        next();
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .sign-popup-wrap{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
  }
  .sign-popup-inner{
    width: 280px;
    background-color: #ffffff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .sign-popup-info{
    height: 155px;
    border-bottom: 1px solid #e6e6e6;
    text-align: center;
  }
  .sign-popup-info img{
    margin-top: -80px;
    margin-bottom: 5px;
  }
  .sign-popup-inner p{
    line-height: 18px;
    font-size: 14px;
  }
  .sign-popup-btn{
    display: block;
    color: #06a0de;
    line-height: 40px;
    text-align: center;
  }
  .bulletin-wrap{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    padding: 10px;
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 10;
  }
  .bulletin{
    height: 20px;
    line-height: 20px;
    color: #06a0de;
    position: relative;
  }
  .bulletin i{
    font-size: 16px;
    margin-right: -15px;
  }
  .bulletin-info{
    position: absolute;
    left: 30px;
    top: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #06a0de;
    font-size: 13px;
    padding-right: 20px;
    box-sizing: border-box;
  }
  .bulletin-close{
    position: absolute;
    width: 20px;
    line-height: 16px;
    text-align: right;
    top: 0;
    right: 0;
    font-size: 20px;
  }
  .operate-area{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 53px;
    padding: 15px;
    z-index: 10;
  }
  .operate-area-inner{
    height: 50px;
    line-height: 50px;
    position: relative;
    text-align: center;
  }
  .side-operate-btn{
    width: 36px;
    height: 36px;
    line-height: 36px;
    border-radius: 50%;
    background-color: #ffffff;
    box-shadow: 0 0 5px 1px #b3b3b3;
    position: absolute;
    top: 7px;
    color: #06a0de;
  }
  .left-operate-btn{
    left: 0;
    font-size: 24px;
    z-index: 99999;
  }
  .right-operate-btn{
    right: 0;
    font-size: 18px;
  }
  .center-operate-btn{
    width: 160px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    display: inline-block;
    text-align: center;
  }
  .start-receive-order i,.start-receive-order span{
    color: #ffffff;
  }
  .stop-receive-order i,.stop-receive-order span{
    color:#fff;
  }
  .center-operate-icon{
    font-size: 22px;
  }
  .stop-receive-order{
    background-color: #7d7d7d;
    color:#7d7d7d;
  }
  .start-receive-order{
    background-color: #06a0de;
    color:#fff;
  }
  .msg-bulletin{
    position: absolute;
    left: 10px;
    right: 10px;
    top: 60px;
    z-index: 10;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 10px -3px #666666;
  }
  .msg-bulletin-icon{
    width: 25px;
    height: 25px;
    line-height: 25px;
    color: #06a0de;
    font-size: 20px;
  }
  .new-order-msg{
    padding: 10px 15px;
    border-top: 1px solid #e6e6e6;
    line-height: 20px;
  }
  .order-detail-btn{
    padding: 10px 15px;
    background-color: #f0eff4;
    color: #1a1a1a;
    text-align: center;
    display: block;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }


  /*v2.0*/
  .authenticate-note-wrap{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(30,32,39,0.7);
    z-index: 9999999;
  }
  .authenticate-note{
    position: absolute;
    left: 50%;
    margin-left: -140px;
    top: 60px;
    width: 280px;
    background-color: #FFFFFF;
    border-radius: 6px;
    padding: 15px;
    box-sizing: border-box;
  }
  .authenticate-note h3{
    font-size: 18px;
    text-align: center;
    color: #1e2027;
    padding-bottom: 12px;
    border-bottom: 1px solid #565656;
  }

  .authenticate-msg{
    padding: 25px 0;
    line-height: 24px;
    text-align: justify;
    color: #1e2027;
    font-size: 14px;
  }
  .authenticate-btn{
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #318af8;
    color: #FFFFFF;
    border-radius: 5px;
    font-size: 14px;
    text-decoration: none;
  }
  .authenticate-note::after{
    content: "";
    width: 2px;
    height: 66px;
    background-color: #FFFFFF;
    position: absolute;
    left: 50%;
    margin-left: -1px;
    top: 195px;
  }
  .close-authenticate-note{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid #FFFFFF;
    line-height: 30px;
    text-align: center;
    background:transparent;
    position: absolute;
    left: 50%;
    margin-left: -21px;
    top: 260px;
    color: #FFFFFF;
    font-size: 30px;
    box-sizing: border-box;
  }







</style>
