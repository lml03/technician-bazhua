<template>
  <div class="orderMap">
    <div id="container" class="container"></div>
    <div class="operate-area">
      <div class="operate-area-inner">
        <i class="side-operate-btn left-operate-btn iconfont">&#xe609;</i>
        <i class="side-operate-btn right-operate-btn iconfont" v-on:click="showPopup">&#xe619;</i>
        <div class="center-operate-btn start-receive-order">
          <router-link to="auth">
            <i class="center-operate-icon iconfont">&#xe618;</i>
            <span>开始接单</span>
          </router-link>
        </div>
      </div>
    </div>
    <common-footer></common-footer>
  </div>
</template>

<script>
  import CommonFooter from './CommonFooter.vue';
  export default {
    name: 'OrderMap',
    data () {
      return {
        bulletinMsg: '马上认证技师，获取在线订单',
        isShow: false
      }
    },
    components: {
      CommonFooter
    },
    mounted: function () {
      let center = new qq.maps.LatLng(22.57889,113.9185);
      let map = new qq.maps.Map(document.getElementById('container'),{
        center: center,
        zoom: 13,
        disableDefaultUI: true
      });

      let anchor = new qq.maps.Point(6, 6),
        size = new qq.maps.Size(50, 50),
        origin = new qq.maps.Point(0, 0),
        icon = new qq.maps.MarkerImage('https://ss0.baidu.com/73t1bjeh1BF3odCf/it/u=3853850738,1579173117&fm=85&s=76A086E0044A9B4F5CA1A0220300704B', size, origin, anchor);
      let marker = new qq.maps.Marker({
        icon: icon,
        map: map,
        position:map.getCenter()});
    },
    methods: {
      closePopup: function () {
        this.isShow = !this.isShow;
      },
      showPopup: function () {
        this.isShow = true;
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
    height: 25px;
    line-height: 25px;
    color: #06a0de;
  }
  .bulletin i{
    font-size: 20px;
    margin-right: -15px;
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
  }
  .right-operate-btn{
    right: 0;
    font-size: 18px;
  }
  .center-operate-btn{
    width: 160px;
    height: 50px;
    border-radius: 25px;
    display: inline-block;
    text-align: center;
  }
  .center-operate-btn i,.center-operate-btn span{
    color: #ffffff;
  }
  .center-operate-icon{
    width: 30px;
    height: 30px;
    line-height: 30px;
    display: inline-block;
    font-size: 22px;
  }
  .stop-receive-order{
    background-color: #ffffff;
    color: #06a0de;
  }
  .start-receive-order{
    background-color: #06a0de;
    color: #ffffff;
  }
</style>
