<!-- The ref attr used to find the swiper instance -->
<template>
  <swiper :options="swiperOption" ref="mySwiper">
    <swiper-slide v-for="bulletinMsg in bulletinMsgs">
      <router-link :to="{ name: 'BulletinMsg', params: { msgId: bulletinMsg.msgId }}">
      {{ bulletinMsg.msgInfo }}
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'bulletinMsg',
    data() {
      return {
        swiperOption: {
          notNextTick: true,
          autoplay: 3000,
          direction : 'horizontal',
          loop : true
        },
        bulletinMsgs: [
          {"msgId": 1, "msgInfo": "马上认证技师，获取在线订单111"}
        ]
      }
    },
    mounted() {
      this.getBulletinMsgs();
    },
    components: {
      swiper,
      swiperSlide
    },
    methods: {
      getBulletinMsgs: function () {
        let that = this;
        $.ajax({
          type: "get",
          dataType: "json",
          url: ApiUrl.getBulletinMsg,
          data: {
//              appid: "wx33",
            mobile: localStorage.getItem("technicianPhone")
          },
          success: function (data) {
            if(data){
//              that.bulletinMsgs = data
              console.log("ok");
            }else{
              console.log("error");
            }
          },
          error: function () {
            console.log("error");
          }
        });
      },
    }
  }
</script>

<style scoped>
.swiper-container,.swiper-slide{
  height: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.swiper-slide a{
  color: #06a0de;
}
</style>
