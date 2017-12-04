<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="my-invitecode">
    <p class="scan-prompt">通过扫描二维码，添加成为您的商家</p>
    <div class="invitecode-img">
      <img v-bind:src="inviteCodeImg" />
      <p>我的ID：{{technicianId}}</p>
    </div>
    <router-link to="InviteBusinessman" class="switch-btn">切换手动添加</router-link>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  export default {
    name: 'my-invitecode',
    data() {
      return {
        technicianId: "",
        inviteCodeImg: ""
      }
    },
    created(){
      let that = this;
      let technicianId = JSON.parse(localStorage.getItem("technicianInfo")).loginName;
      that.technicianId = technicianId;
    },
    mounted(){
      this.getInviteCode();
    },
    methods: {
      getInviteCode: function () {
        let that = this;
        $.ajax({
          type: "GET",
          dataType: "json",
          url: ApiUrl.inviteCodeCreate,
          data: {
            loginName: that.technicianId
          },
          success: function (res) {
            that.inviteCodeImg = res.inviteCodePath;
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
  .my-invitecode{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  .scan-prompt{
    padding-top: 30px;
    font-size: 14px;
    text-align: center;
    color: #333333;
  }
  .invitecode-img{
    width: 244px;
    height: 244px;
    margin:0 auto;
    padding-top: 15px;
  }
  .invitecode-img img{
    width: 100%;
  }
  .invitecode-img p{
    margin-top: 18px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #FFFFFF;
    color: #333333;
    font-size: 14px;
    border-radius: 6px;
  }
  .switch-btn{
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 15px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    border-radius: 8px;
    background-color: #14a5e0;
    color: #FFFFFF;
    font-size: 16px;
  }
</style>
