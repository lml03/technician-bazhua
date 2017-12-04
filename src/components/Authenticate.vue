<template>
  <div class="authenticate">
    <div class="popup" id="popup" v-show="isPopup"></div>
    <p class="vertify-msg">请输入您的手机号，点击获取验证码</p>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="mobilePhone" type="tel" id="mobilePhone" placeholder="请填写您的手机号" v-on:keyup="changeBtn">
        </div>
      </div>
      <div class="weui-cell weui-cell_vcode">
        <div class="weui-cell__hd">
          <label class="weui-label">验证码</label>
        </div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="verifyCode" id="verifyCode" type="number" placeholder="请输入验证码">
        </div>
        <div class="weui-cell__ft">
          <button class="weui-vcode-btn" id="weui-vcode-btn" v-on:click.stop.prevent="getVerifyCode">获取验证码</button>
        </div>
      </div>
    </div>
    <div class="weui-btn-area">
      <!--<router-link to="MyHome">-->
        <button class="weui-btn weui-btn-disabled" disabled="disabled" id="submit-btn" href="javascript:" v-on:click="goHomePage()">提交</button>
      <!--</router-link>-->
    </div>
    <div class="agreement-msg">
      <p>轻触上面的“提交”按钮，即表示您同意</p>
      <p class="theme-color agreement-link">
        <router-link to="Agreement">《八爪-技师端用户协议》</router-link>
      </p>
    </div>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
export default {
  name: 'authenticate',
  data () {
    return {
      isPopup: false,
      mobilePhone: "",
      verifyCode: ""
    }
  },
  methods: {
    goHomePage: function () {
      let that = this;
      let $phoneVal = that.mobilePhone,
        $verifyCodeVal = that.verifyCode,
        pattern = /^1\d{10}$/;
      if($phoneVal == ""){
        that.isPopup = true;
        $("#popup").html("手机号不能为空");
        setTimeout(function () {
          that.isPopup = false;
        },2000);
        return;
      }
      if (!pattern.test($phoneVal)) {
        that.isPopup = true;
        $("#popup").html("手机号格式错误");
        setTimeout(function() {
          that.isPopup = false;
        }, 2000);
        return;
      }
      if($verifyCodeVal == ""){
        that.isPopup = true;
        $("#popup").html("验证码不能为空");
        setTimeout(function () {
          that.isPopup = false;
        },2000);
        return;
      }
      $.ajax({
        type: "get",
        dataType: "json",
        url: ApiUrl.mobileCheck,
        data: {
          mobile: $phoneVal,
          verifyCode: $verifyCodeVal,
          onLineStatus: 1
        },
        success: function (data) {
          if (data) {
            localStorage.setItem("stopOrder", "true");
            localStorage.setItem("technicianPhone", $phoneVal);
            that.$router.push({path:'MyHome'})
          }else{
            that.isPopup = true;
            $("#popup").html("提交失败");
            setTimeout(function () {
              that.isPopup = false;
            }, 2000);
          }
        },
        error: function (err) {
          that.isPopup = true;
          $("#popup").html("提交失败");
          setTimeout(function () {
            that.isPopup = false;
          }, 2000);
        }
      });
    },
    getVerifyCode: function () {
      let that = this;
      let $phoneVal = that.mobilePhone,
          pattern = /^1\d{10}$/;
      if($phoneVal == ""){
        that.isPopup = true;
        $("#popup").html("手机号不能为空");
        setTimeout(function () {
          that.isPopup = false;
        },2000);
        return;
      }
      if (!pattern.test($phoneVal)) {
        that.isPopup = true;
        $("#popup").html("手机号格式错误");
        setTimeout(function() {
          that.isPopup = false;
        }, 2000);
        return;
      }
      let openid = $.fn.cookie('openid');
      $.ajax({
        type: "get",
        dataType: "json",
        url: ApiUrl.getVerifyCode,
        data: {
          mobile: that.mobilePhone,
          openid: openid
        },
        success: function (data) {
          if(data){
            let $vcodeBtn = $("#weui-vcode-btn"),
                count = 59;
            $vcodeBtn.attr("disabled", "disabled");
            $vcodeBtn.html(count + "s");
            let timer = setInterval(function () {
              if(count > 0){
                count--;
                $vcodeBtn.html(count + "s");
              }else{
                $vcodeBtn.html("获取验证码");
                $vcodeBtn.removeAttr("disabled");
                clearInterval(timer);
              }
            }, 1000)
          }else{
            that.isPopup = true;
            $("#popup").html("获取验证码失败");
            setTimeout(function () {
              that.isPopup = false;
            }, 2000);
          }
        },
        error: function (err) {
          that.isPopup = true;
          $("#popup").html("获取验证码失败");
          setTimeout(function () {
            that.isPopup = false;
          }, 2000);
        }
      });
    },
    changeBtn: function () {
      let $phoneVal = $.trim($("#mobilePhone").val());
      if($phoneVal != ""){
        $("#submit-btn").removeAttr("disabled");
          $("#submit-btn").css({"background-color": "#06a0de", "color": "#ffffff"});
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .authenticate{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }
  .vertify-msg{
    padding: 20px 0;
    color: #333333;
    text-align: center;
  }
  .agreement-msg{
    position: absolute;
    bottom: 25px;
    left: 10px;
    right: 10px;
    font-size: 12px;
    text-align: center;
    z-index: 100;
  }
  .bottom-btn{
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 27px;
  }
  .agreement-link{
    text-decoration: underline;
    padding: 10px 0;
  }
  .agreement-link a,.weui-vcode-btn{
    color: #06a0de;
  }
  .weui-cells{
    margin-top: 0;
  }
  .weui-input,.weui-vcode-btn{
    font-size: 13px;
  }
  .weui-btn{
    height: 44px;
  }
</style>
