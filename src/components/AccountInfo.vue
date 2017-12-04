<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="accountInfo">
    <div class="portrait-name-wrap">
      <div class="portrait">
        <img v-if="accountInfo.headimgurl" v-bind:src="accountInfo.headimgurl" />
        <span v-else>
          <img src="../assets/images/portrait.png" />
        </span>
      </div>
      <div class="name">{{ accountInfo.nickname }}</div>
    </div>
    <div class="account-info-wrap">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>微信号</p>
        </div>
        <div class="weui-cell__ft">{{ accountInfo.openid }}</div>
      </div>
      <router-link to="Auth" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>手机号</p>
        </div>
        <div class="weui-cell__ft">{{ accountInfo.userLoginMobile }}</div>
      </router-link>
      <router-link to="Address" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>常用地址</p>
        </div>
        <div class="weui-cell__ft">{{ accountInfo.fixedAddress }}</div>
      </router-link>
    </div>
    <div class="account-info-wrap">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>擅修类型<span>（如需添加其他擅修类型请联系客服）</span></p>
        </div>
        <div class="weui-cell__ft"></div>
      </div>
      <div class="weui-cell">
        <div class="repair-type">
          <span v-if="accountInfo.technicianCheckSkillDeviceType">{{ accountInfo.technicianCheckSkillDeviceType }}</span>
          <span v-else>暂无</span>
          <!--<span>电热设备类</span>-->
          <!--<span>电热设备类</span>-->
          <!--<span>电热设备类</span>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  export default {
    name: 'accountInfo',
    data() {
      return {
        accountInfo: {}
      }
    },
    created(){
      this.getData();
    },
    mounted(){

    },
    methods: {
        getData: function () {
          let that = this;
          let mobile = localStorage.getItem("technicianPhone");
          let openid = $.fn.cookie('openid');
          $.ajax({
            type: "GET",
            dataType: "json",
            url: ApiUrl.myInfo,
            data: {
              openid: openid,
              mobile: mobile
            },
            success: function (res) {
              let resData = res;
              let WXPersonalInfo = JSON.parse(localStorage.getItem("WXPersonalInfo"));
              that.accountInfo = resData;
              that.accountInfo.userLoginMobile = resData.userLogin.mobile;
              that.accountInfo.technicianCheckSkillDeviceType = resData.technicianCheck.skillDeviceType;
              if(WXPersonalInfo && resData){
                if(WXPersonalInfo.nickname){
                  that.accountInfo.nickname = WXPersonalInfo.nickname;
                }else{
                  that.accountInfo.nickname = "";
                }
                if(WXPersonalInfo.headimgurl){
                  that.accountInfo.headimgurl = WXPersonalInfo.headimgurl;
                }else{
                  that.accountInfo.headimgurl = "";
                }
                if(WXPersonalInfo.openid){
                  that.accountInfo.openid = WXPersonalInfo.openid;
                }else{
                  that.accountInfo.openid = "";
                }
              }
              console.log(that.accountInfo);
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
  .portrait-name-wrap{
    background-color: #ffffff;
    padding: 12px 15px;
    margin-bottom: 10px;
    font-size: 0;
    display: flex;
    display: -webkit-flex;
    display: -webkit-box;
  }
  .portrait{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #dcdcdc;
    overflow: hidden;
    margin-right: 10px;
  }
  .portrait img{
    width: 100%;
  }
  .name{
    line-height: 36px;
    color: #333333;
    font-size: 16px;
    flex: 1;
    webkit-flex: 1;
    -webkit-box-flex:1;
  }
  .account-info-wrap{
    background-color: #ffffff;
    margin-bottom: 10px;
  }
  .weui-cell{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .weui-cell__ft{
    color: #b8b8b8;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .repair-type{
    font-size: 0;
  }
  /*.repair-type span{*/
    /*width: 80px;*/
    /*line-height: 20px;*/
    /*border: 1px solid #07a1de;*/
    /*border-radius: 10px;*/
    /*font-size: 12px;*/
    /*color: #07a1de;*/
    /*text-align: center;*/
    /*display: inline-block;*/
    /*margin-right: 10px;*/
  /*}*/
</style>
