<template>
  <div class="logout-wrap">
    <div class="weui-popup" v-if="logoutPopup">
      <div class="weui-mask"></div>
      <div class="weui-dialog">
        <div class="weui-dialog__hd">是否确定退出登录</div>
        <!--<div class="weui-dialog__bd"></div>-->
        <div class="weui-dialog__ft">
          <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" id="weui-dialog-cancel" v-on:click="cancelLogout">否</a>
          <router-link to="MyHome" class="weui-dialog__btn" id="weui-dialog-confirm">是</router-link>
        </div>
      </div>
    </div>
    <div class="logout">
      <div class="weui-cells border-radius-5">
        <router-link to="Feedback" class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">
            <p>意见反馈</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </router-link>
        <router-link to="Introduction" class="weui-cell weui-cell_access">
          <div class="weui-cell__bd">
            <p>产品介绍</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </router-link>
      </div>
      <a v-if="ifLogout" class="weui-btn bottom-btn bg-white theme-color" href="javascript:" v-on:click="logout">退出登录</a>
      <router-link to="Auth" v-else>
        <a class="weui-btn bottom-btn bg-white theme-color" href="javascript:">去登录</a>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'logout',
  data () {
    return {
      ifLogout: false,
      logoutPopup: false
    }
  },
  methods: {
    cancelLogout: function () {
      this.logoutPopup = false;
    },
    logout: function () {
      this.logoutPopup = true;
    }
  },
  mounted: function () {
    let technicianPhone = localStorage.getItem("technicianPhone");
    if(technicianPhone){
      this.ifLogout = true;
    }
  },
  beforeRouteLeave (to, from, next) {
      if(to.name == "MyHome"){
          localStorage.removeItem("technicianPhone");
          localStorage.setItem("stopOrder", "false");
          next();
      }else{
          next();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body{
    background-color: #efeff4;
  }
  .weui-cell_access .weui-cell__ft:after {
    transform: rotateZ(45deg);
  }
  .logout-wrap{
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .logout{
    padding-top: 10px;
  }
  .bottom-btn {
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 27px;
  }
  .weui-cells{
    margin-top: 0;
  }

  .weui-mask {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .weui-dialog {
    position: fixed;
    z-index: 5000;
    width: 80%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    text-align: center;
    border-radius: 3px;
    overflow: hidden;
  }

  .weui-dialog__hd {
    padding: 1.3em 1.6em 0.5em;
  }

  .weui-dialog__bd {
    padding: 0 1.6em 0.8em;
    min-height: 40px;
    font-size: 15px;
    line-height: 1.3;
    word-wrap: break-word;
    word-break: break-all;
    color: #999999;
  }

  .weui-dialog__ft {
    position: relative;
    line-height: 48px;
    font-size: 18px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }

  .weui-dialog__btn {
    display: block;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    color: #06a0de;
    text-decoration: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    position: relative;
  }

  .weui-dialog__btn_default {
    color: #353535;
  }

  .weui-dialog__btn:after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    bottom: 0;
    border-left: 1px solid #D5D5D6;
    color: #D5D5D6;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleX(0.5);
    transform: scaleX(0.5);
  }

  .weui-dialog__ft:after {
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D5D5D6;
    color: #D5D5D6;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

</style>
