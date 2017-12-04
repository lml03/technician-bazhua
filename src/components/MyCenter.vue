<template>
  <div>
    <div class="popup" v-if="loading">加载中...</div>
    <div class="myCenter" v-else>
      <div class="popup" id="popup" v-show="isPopup"></div>
      <div class="personal-center-header">
        <div v-if="isLogin" class="personal-info">
          <router-link to="AccountInfo">
            <div class="personal-info-inner">
              <div class="head-portrait">
                <img v-if="personalInfo.headimgurl" v-bind:src="personalInfo.headimgurl" alt="" />
                <span v-else>
                  <img src="../assets/images/head_portrait1.png" alt="" />
                </span>
              </div>
              <div class="account-prompt">
                <p>{{ personalInfo.nickname }}</p>
                <p>ID：{{ personalInfo.loginName }}</p>
              </div>
              <div class="personal-info-prompt-icon"></div>
            </div>
          </router-link>
        </div>
        <div v-else class="personal-info">
          <div class="personal-info-inner">
            <div class="head-portrait">
              <img src="../assets/images/head_portrait1.png" />
            </div>
            <p class="login-prompt">
              <router-link to="Auth">请登录</router-link>
            </p>
            <div class="personal-info-prompt-icon"></div>
          </div>
        </div>
        <div class="order-area-wrap">
          <ul class="order-area">
            <li>
              <router-link :to="{ name: 'MyOrder', params: { clickMenu: -1 }}">
                <span v-if="isLogin && personalInfo.orderCount">{{ personalInfo.orderCount }}</span>
                <span v-else>0</span>
                <span>全部订单</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'MyOrder', params: { clickMenu: 5 }}">
                <span v-if="isLogin && personalInfo.toMaintain">{{ personalInfo.toMaintain }}</span>
                <span v-else>0</span>
                <span>待维修</span>
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'MyOrder', params: { clickMenu: 8 }}">
                <span v-if="isLogin && personalInfo.toPaid">{{ personalInfo.toPaid }}</span>
                <span v-else>0</span>
                <span>待收款</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="personal-category-wrap">
        <ul class="personal-category">
          <li>
            <router-link to="Balance">
              <span class="personal-incoming"></span>
              <span>
                <!--<i v-if="isLogin && personalInfo.income">{{ personalInfo.income }}元</i>
                <i v-else>0元</i>-->
                <i>{{personalInfo.income}}元</i>
                <i>收入</i>
              </span>
            </router-link>
          </li>
          <li>
            <router-link to="Integral">
              <span class="personal-integral"></span>
              <span>
                <!--<i v-if="isLogin && personalInfo.integral">{{ personalInfo.integral }}分</i>-->
                <!--<i v-else>0分</i>-->
                <i>0分</i>
                <i>积分</i>
              </span>
            </router-link>
          </li>
          <li>
            <router-link to="Coupon">
              <span class="personal-discount"></span>
              <span>
                <i>0张</i>
                <i>优惠券</i>
              </span>
            </router-link>
          </li>
        </ul>
      </div>
      <div v-if="personalInfo.identityType == 3" class="personal-center-link">
        <div class="personal-center-link-list">
          <!--检修工单-->
          <router-link to="OverhaulOrder" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd personal-link-icon link-workorder"></div>
            <div class="weui-cell__bd">
              <p>检修工单</p>
            </div>
            <div class="weui-cell__ft"></div>
          </router-link>
        </div>
      </div>
      <div class="personal-center-link">
        <div class="personal-center-link-list">
          <!--服务报价-->
          <router-link to="ServicePrice" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd personal-link-icon service-quotes"></div>
            <div class="weui-cell__bd">
              <p>服务报价</p>
            </div>
            <div class="weui-cell__ft"></div>
          </router-link>
          <!--配件报价-->
          <router-link to="AccessoryPrice" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd personal-link-icon accessory-quotes"></div>
            <div class="weui-cell__bd">
              <p>配件报价</p>
            </div>
            <div class="weui-cell__ft"></div>
          </router-link>
        </div>
      </div>
      <div class="personal-center-link">
        <div class="personal-center-link-list">
          <!--我的商家-->
          <router-link v-if="isLogin && personalInfo.idCardStatus == 0" to="MyBusinessman" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd personal-link-icon my-businessman"></div>
            <div class="weui-cell__bd">
              <p>我的商家</p>
            </div>
            <div class="weui-cell__ft">已认证</div>
          </router-link>
          <router-link v-if="isLogin && personalInfo.idCardStatus == 1" to="" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd personal-link-icon my-businessman"></div>
            <div class="weui-cell__bd">
              <p>我的商家</p>
            </div>
            <div class="weui-cell__ft">您还没认证</div>
          </router-link>
          <router-link v-if="isLogin && personalInfo.idCardStatus == 2" to="" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd personal-link-icon my-businessman"></div>
            <div class="weui-cell__bd">
              <p>我的商家</p>
            </div>
            <div class="weui-cell__ft">认证中</div>
          </router-link>
          <router-link v-else-if="!isLogin" to="Auth" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd personal-link-icon my-businessman"></div>
            <div class="weui-cell__bd">
              <p>我的商家</p>
            </div>
            <div class="weui-cell__ft">去登录</div>
          </router-link>
          <!--配件商城-->
          <a class="weui-cell weui-cell_access" href="https://weidian.com/diyPage/index.php?id=25245">
            <div class="weui-cell__hd personal-link-icon link-shop"></div>
            <div class="weui-cell__bd">
              <p>配件商城</p>
            </div>
            <div class="weui-cell__ft"></div>
          </a>
          <!--技术支持-->
          <a class="weui-cell weui-cell_access" href="tel:4008621623">
            <div class="weui-cell__hd personal-link-icon link-support"></div>
            <div class="weui-cell__bd">
              <p>技术支持</p>
            </div>
            <div class="weui-cell__ft"></div>
          </a>
          <!--认证中心-->
          <router-link v-if="isLogin && personalInfo.idCardStatus == 0" to="IdentityLegalize" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd personal-link-icon link-auth"></div>
            <div class="weui-cell__bd">
              <p>认证中心</p>
            </div>
            <div class="weui-cell__ft">已认证</div>
          </router-link>
          <router-link v-else-if="isLogin && personalInfo.idCardStatus == 1" to="IdentityLegalize" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd personal-link-icon link-auth"></div>
            <div class="weui-cell__bd">
              <p><span class="unauth">认证中心</span></p>
            </div>
            <div class="weui-cell__ft">您还没认证</div>
          </router-link>
          <router-link v-else-if="isLogin && personalInfo.idCardStatus == 2" to="IdentityLegalize" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd personal-link-icon link-auth"></div>
            <div class="weui-cell__bd">
              <p>认证中心</p>
            </div>
            <div class="weui-cell__ft">认证中</div>
          </router-link>
          <router-link v-else-if="isLogin && personalInfo.idCardStatus == 3" to="IdentityLegalize" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd personal-link-icon link-auth"></div>
            <div class="weui-cell__bd">
              <p>认证中心</p>
            </div>
            <div class="weui-cell__ft">认证失败</div>
          </router-link>
          <router-link v-else-if="!isLogin" to="Auth" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd personal-link-icon link-auth"></div>
            <div class="weui-cell__bd">
              <p>认证中心</p>
            </div>
            <div class="weui-cell__ft">去登录</div>
          </router-link>
        </div>
      </div>
      <div class="personal-center-link">
        <div class="personal-center-link-list">
          <!--设置-->
          <router-link to="Logout" class="weui-cell weui-cell_access">
            <div class="weui-cell__hd personal-link-icon link-setting"></div>
            <div class="weui-cell__bd">
              <p>设置</p>
            </div>
            <div class="weui-cell__ft"></div>
          </router-link>
        </div>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  import axios from 'axios';
  import CommonFooter from './CommonFooter.vue';
  export default {
    name: 'myCenter',
    data () {
      return {
        personalInfo: {},
        isPopup: false,
        isLogin: false,
        loading: false
      }
    },
    components: {
      CommonFooter
    },
    created: function () {
      let technicianPhone = localStorage.getItem("technicianPhone");
      if(technicianPhone){
        this.isLogin = true;
      }
    },
    mounted: function () {

    },
    methods: {

    },
    beforeRouteEnter (to, from, next){
      next(vm => {
        vm.loading = true;
        $(".app").find("ul.commonFooter li").eq(3).addClass("active").siblings().removeClass("active");
        let mobile = localStorage.getItem("technicianPhone");
        axios.get(ApiUrl.personalCenter , {
          params: {
            mobile: mobile
          }
        })
        .then(function (response) {
          vm.loading = false;
          if(response.status == 200){
            let WXPersonalInfo = JSON.parse(localStorage.getItem("WXPersonalInfo"));
            vm.personalInfo = response.data;
            vm.personalInfo.nickname = WXPersonalInfo.nickname;
            vm.personalInfo.headimgurl = WXPersonalInfo.headimgurl;
            localStorage.setItem("technicianInfo", JSON.stringify(response.data));
          }else{
            vm.isPopup = true;
            $("#popup").html("获取数据失败");
            setTimeout(function () {
              vm.isPopup = false;
            }, 2000);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .personal-center-link-list{
    background-color: #FFFFFF;
  }
  .myCenter{
    padding-bottom: 50px;
  }
  .weui-cells{
    margin-top: 0;
  }
  .personal-center-header{
    height: 150px;
    background: -webkit-linear-gradient(left bottom, #49a1fc , #53d0f7); /* Safari 5.1 - 6.0 */
    background: linear-gradient(to top right, #49a1fc , #53d0f7); /* 标准的语法 */
    background-size: cover;
    position: relative;
    margin-bottom: 10px;
  }
  .personal-info{
    text-align: center;
    color: #ffffff;
    padding: 13px 10px 0 20px;
  }
  .personal-info-inner{
    display: flex;
    display: -webkit-flex;
    display: -webkit-box;
  }
  .personal-info a{
    color: #ffffff;
  }
  .login-prompt{
    height: 65px;
    line-height: 65px;
    padding-left: 10px;
    flex: 1;
    webkit-flex: 1;
    -webkit-box-flex:1;
    text-align: left;
  }
  .account-prompt{
    padding-left: 10px;
    height: 65px;
    flex: 1;
    webkit-flex: 1;
    -webkit-box-flex:1;
    text-align: left;
  }
  .account-prompt p:first-child{
    font-size: 16px;
    padding-top: 10px;
  }
  .account-prompt p:last-child{
    padding-top: 10px;
    font-size: 12px;
  }
  .personal-info-prompt-icon{
    width: 24px;
    height: 65px;
    background: url("../assets/images/bazhua-icon.png") no-repeat center -300px;
    background-size: 150%;
  }
  .head-portrait{
    width: 65px;
    height: 65px;
    border-radius: 50%;
    background-size: cover;
    display: inline-block;
    overflow: hidden;
  }
  .head-portrait img{
    width: 100%;
    height: 100%;
  }
  .order-area-wrap{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    padding:10px 0;
  }
  .order-area{
    display: flex;
    display: -webkit-flex;
    display: -webkit-box;
  }
  .order-area li{
    flex: 1;
    webkit-flex: 1;
    -webkit-box-flex:1;
    border-left: 1px solid #fff;
    text-align: center;
    width: 33.33%;
  }
  .order-area li:first-child{
    border-left: none;
  }
  .order-area li span{
    display: block;
    text-align: center;
  }
  .order-area li span:first-child{
    font-size: 21px;
    line-height: 24px;
  }
  .order-area li span:last-child{
    font-size: 13px;
    line-height: 16px;
  }
  .order-area li a{
    color:#fff;
  }

  .personal-category-wrap{
    padding: 10px 0;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    background-color: #ffffff;
    margin-bottom: 10px;
  }
  .personal-category{
    display: flex;
    display: -webkit-flex;
    display: -webkit-box;
    /*padding: 0 10px;*/
  }
  .personal-category li{
    position: relative;
    display: flex;
    display: -webkit-flex;
    display: -webkit-box;
    flex: 1;
    webkit-flex: 1;
    -webkit-box-flex:1;
    border-left: 1px solid #eeeeee;
    text-align: center;
    width: 33.33%;
    height: 40px;
  }
  .personal-category li:first-child{
    border-left: none;
  }
  .personal-category li span{
    display: block;
  }
  .personal-category li span:first-child{
    width:40px;
    height: 40px;
    color: #06a0de;
    background: url("../assets/images/bazhua-icon.png") no-repeat;
    background-size: 90%;
  }

  .personal-category li span:first-child.personal-incoming{
    background-position: center 6px;
  }
  .personal-category li span:first-child.personal-integral{
    background-position: center -43px;
  }
  .personal-category li span:first-child.personal-discount{
    background-position: center -87px;
  }
  .personal-category li span:last-child{
    flex: 1;
    webkit-flex: 1;
    -webkit-box-flex:1;
    padding: 0 5px;
  }
  .personal-category li span:last-child i{
    font-size: 13px;
    line-height: 20px;
    display: block;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .personal-category li span:last-child i:first-child{
    color: #333333;
  }
  .personal-category li span:last-child i:last-child{
    color: #666666;
  }
  .personal-center-link{
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 10px;
  }
  .personal-link-icon{
    width: 35px;
    height: 25px;
    background: url("../assets/images/bazhua-icon.png") no-repeat;
    background-size: 110%;
    margin-right: 10px;
  }
  .my-businessman{
    background-position: center -410px;
  }
  .service-quotes{
    background-position: center -456px;
  }
  .accessory-quotes{
    background-position: center -500px;
  }
  .link-shop{
    background-position: center -146px;
  }
  .link-setting{
    background-position: center -279px;
  }
  .link-auth{
    background-position: center -235px;
  }
  .link-support{
    background-position: center -190px;
  }
  .link-workorder{
    background-position: center -999px;
  }

  .unauth{
    position: relative;
  }
  .unauth::after{
    position: absolute;
    content: "";
    width: 6px;
    height: 6px;
    background-color: #ff0000;
    border-radius: 50%;
    right: -12px;
    top: 7px;
  }

  .sign-popup-info img{
    margin-top: -80px;
    margin-bottom: 5px;
  }
  .sign-popup-inner p{
    line-height: 18px;
    font-size: 14px;
  }

  .personal-category>li>a{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    display: flex;
    -webkit-box-align: center;
  }
  .weui-cell__bd p{
    font-size: 14px;
    color: #333333;
  }
  .weui-cell__ft{
    font-size: 12px;
    color: #b3b3b3;
  }
  .weui-cell__bd p span{
    font-size: 14px;
    color: #333333;
  }
  .loading{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #ffffff;
    z-index: 9999999;
  }
  .loading img{
    width: 32px;
    height: 32px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -16px;
    margin-top: -16px;
  }
</style>
