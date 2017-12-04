<template>
  <div class="personalInfo padding-10">
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-if="isGetPersonalInfo">
      <div class="personal-info-header">
        <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
          <div class="weui-media-box__hd" v-if="personalInfo.photo">
            <img class="weui-media-box__thumb" v-bind:src="personalInfo.photo" alt="">
          </div>
          <div class="weui-media-box__hd" v-else>
            <img class="weui-media-box__thumb" src="../assets/images/head_portrait1.png" alt="">
          </div>
          <div class="weui-media-box__bd">
            <h4 class="weui-media-box__title">
              <span>{{ personalInfo.name }}</span>
              <span>{{ personalInfo.mobile }}</span>
            </h4>
            <p class="weui-media-box__desc">好评率：<span>0%</span>服务单数<span>0</span></p>
          </div>
        </a>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>认证</p>
          </div>
          <div class="weui-cell__ft"></div>
        </div>
        <div class="authenticate-list">实名认证
          <span class="unauthenticate-tag" v-if="personalInfo.technicianCheck.idCardStatus == 1">未认证</span>
          <span class="unauthenticate-tag" v-else-if="personalInfo.technicianCheck.idCardStatus == 0">已认证</span>
          <span class="unauthenticate-tag" v-else-if="personalInfo.technicianCheck.idCardStatus == 2">认证中</span>
        </div>
        <div class="authenticate-list">正面头像
          <span class="unauthenticate-tag" v-if="personalInfo.technicianCheck.idCardStatus == 1">未认证</span>
          <span class="unauthenticate-tag" v-else-if="personalInfo.technicianCheck.idCardStatus == 0">已认证</span>
          <span class="unauthenticate-tag" v-else-if="personalInfo.technicianCheck.idCardStatus == 2">认证中</span>
        </div>
        <div class="authenticate-list">身份证真反面
          <span class="unauthenticate-tag" v-if="personalInfo.technicianCheck.idCardStatus == 1">未认证</span>
          <span class="unauthenticate-tag" v-else-if="personalInfo.technicianCheck.idCardStatus == 0">已认证</span>
          <span class="unauthenticate-tag" v-else-if="personalInfo.technicianCheck.idCardStatus == 2">认证中</span>
        </div>
        <div class="authenticate-list">资格证书
          <span class="unauthenticate-tag" v-if="personalInfo.technicianCheck.skillStatus == 1">未认证</span>
          <span class="unauthenticate-tag" v-else-if="personalInfo.technicianCheck.skillStatus == 0">已认证</span>
          <span class="unauthenticate-tag" v-else-if="personalInfo.technicianCheck.idCardStatus == 2">认证中</span>
        </div>
      </div>
      <div class="authenticate-wrap">
        <router-link to="Address">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd authenticate-tit">
              <p>常用地址</p>
            </div>
          </div>
        </router-link>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__bd">
            <p v-if="personalInfo.fixedAddress">{{ personalInfo.fixedAddress }}</p>
            <p v-else>无</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
      </div>
      <div class="authenticate-wrap">
        <router-link to="Skills">
          <div class="weui-cell weui-cell_access">
            <div class="weui-cell__bd authenticate-tit">
              <p>技能</p>
            </div>
          </div>
        </router-link>
        <a class="weui-cell weui-cell_access" href="javascript:;">
          <div class="weui-cell__bd">
            <p v-if="personalInfo.skillDeviceType">{{ personalInfo.skillDeviceType }}</p>
            <p v-else>无</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
      </div>
      <!--<div class="authenticate-wrap">-->
      <!--<div class="weui-cell weui-cell_access">-->
      <!--<div class="weui-cell__bd authenticate-tit">-->
      <!--<p>评价</p>-->
      <!--</div>-->
      <!--<div class="weui-cell__ft"></div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
export default {
  name: 'personalInfo',
  data () {
    return {
      personalInfo: null,
      isGetPersonalInfo: false,
      loading: false,
      error: null
    }
  },
  created: function () {
    this.getPersonalInfo();
  },
  methods: {
    getPersonalInfo: function () {
      let that = this;
      that.error = that.personalInfo = null;
      that.loading = true;
      $.ajax({
        type: "get",
        dataType: "json",
        url: ApiUrl.checkCenter,
        data: {
          mobile: localStorage.getItem("technicianPhone")
        },
        success: function (data) {
          that.loading = false;
          if(data.technicianCheck.idCardStatus == 0 || data.technicianCheck.idCardStatus == 1 || data.technicianCheck.idCardStatus == 2){
            that.isGetPersonalInfo = true;
            that.personalInfo = data;
          }else{
            that.error = "error";
          }
        },
        error: function () {
          that.error = "err";
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .personal-info-header,.authenticate-wrap{
    background-color: #ffffff;
    border-radius: 5px;
    margin-bottom: 10px;
  }
  .authenticate-tit::before {
    width: 3px;
    height: 16px;
    background-color: #06a0de;
    display: inline-block;
    content: "";
    position: absolute;
    left: 7px;
    top: 15px;
  }
  .authenticate-list{
    padding: 10px 7px;
    border-top: 1px solid #e6e6e6;
  }
  .unauthenticate-tag{
    display: inline-block;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    border: 1px solid #e6e6e6;
    color: #cccccc;
    padding: 0 10px;
    margin-left: 5px;
  }
  .weui-cell_access .weui-cell__ft:after{
    transform: rotateZ(45deg);
  }
  .personalInfo{
    padding-bottom: 70px;
  }
  .authenticate-wrap a{
    color: #000000;
  }
  .weui-media-box__thumb{
    border-radius: 50%;
  }
</style>
