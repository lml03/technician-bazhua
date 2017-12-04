<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="getOauthRedirect">

  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  export default {
    name: 'getOauthRedirect',
    data() {
      return {

      }
    },
    created(){
      this.getOpenid();
    },
    mounted(){

    },
    methods: {
      getOpenid: function () {
        let that = this;
        let code = location.href.split("?")[1].split("&")[0].split("=")[1];
        console.log(code);
        $.ajax({
          type: "GET",
          dataType: "json",
          url: ApiUrl.getOpenid,
          data: {
            code: code
          },
          success: function (res) {
            let resData = res;
            if(resData.subscribe == 1){
              $.fn.cookie('openid', resData.openid, { path: '/' });
              localStorage.setItem('openid', resData.openid);
              $.fn.cookie('nickname', resData.nickname, { path: '/' });
              $.fn.cookie('headimgurl', resData.headimgurl, { path: '/' });
              localStorage.setItem("WXPersonalInfo", JSON.stringify(resData));
              that.$router.push('MyHome');
            }else if(resData.subscribe == 0){
              that.$router.push('FollowUs');
            }else{
              console.log("error1");
            }
          },
          error: function () {
            console.log("error2");
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
