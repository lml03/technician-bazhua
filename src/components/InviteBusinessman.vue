<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="invite-businessman">
    <div class="popup" id="popup" v-show="isPopup"></div>
    <div class="search-wrap" v-show="isSearch">
      <div class="search-input-wrap">
        <div class="search-input-inner">
          <input v-model="businessmanId" placeholder="请输入商家ID" type="text" class="search-input" />
        </div>
      </div>
      <div class="search-btn" v-on:click="searchBusinessman()">搜索</div>
    </div>
    <div class="search-wrap" v-show="isCancel">
      <div class="search-input-wrap">
        <div class="searched-input-inner">
          <input v-model="businessmanId" type="text" class="search-input" />
        </div>
      </div>
      <div class="search-btn" v-on:click="searchCancel()">取消</div>
    </div>
    <div class="searched-list-wrap" v-if="hasBusinessman">
      <ul>
        <li>
          <div class="businessman-img">
            <img v-bind:src="businessmanInfo.userLogin.headimgurl" />
          </div>
          <div class="businessman-info">
            <p>{{ businessmanInfo.shopName }}</p>
            <p>ID：{{ businessmanInfo.userLogin.loginName }}</p>
          </div>
          <router-link :to="{ name: 'ShowBusinessman', params: { businessmanInfo: businessmanInfo }}" class="add-businessman-btn">添为我的商家</router-link>
        </li>
      </ul>
    </div>
    <router-link :to="{ name: 'MyInviteCode'}" class="invite-code">我的邀请码</router-link>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  export default {
    name: 'invite-businessman',
    data() {
      return {
        businessmanId: "",
        isPopup: false,
        isSearch: true,
        isCancel: false,
        hasBusinessman: false,
        businessmanInfo: {}
      }
    },
    created(){

    },
    mounted(){

    },
    methods: {
      searchBusinessman () {
        var that = this;
        var businessmanId = that.businessmanId;
        if(businessmanId == ""){
            $("#popup").html("商家ID不能为空");
            that.isPopup = true;
            setTimeout(function () {
              that.isPopup = false;
            },2000);
            return;
        }
        $.ajax({
          type: "get",
          dataType: "json",
          url: ApiUrl.findCustomerInfo,
          data: {
            loginName: businessmanId
          },
          success: function (data) {
            var resData = data;
            console.log(resData);
            if(resData.flag == 0){
                that.hasBusinessman = true;
                that.isSearch = false;
                that.isCancel = true;
                that.businessmanInfo = resData.customerInfo;
            }else if(resData.flag == 1){
              $("#popup").html("输入ID不存在，请重新输入");
              that.isPopup = true;
              setTimeout(function () {
                that.isPopup = false;
              },2000);
              return;
            }else if(resData.flag == 2){
              $("#popup").html("请商家完善个人信息后再添加");
              that.isPopup = true;
              setTimeout(function () {
                that.isPopup = false;
              },2000);
              return;
            }else if(resData.flag == 3){
              $("#popup").html("该商家已被关联，赶快去添加其它商家吧");
              that.isPopup = true;
              setTimeout(function () {
                that.isPopup = false;
              },2000);
              return;
            }
          },
          error: function (err) {
            console.log("error");
          }
        });
      },
      searchCancel () {
          var that = this;
          that.isSearch = true;
          that.isCancel = false;
          that.hasBusinessman = false;
      }
    },
    beforeRouteLeave (to, from, next) {
      var that = this;
      if(to.name == "ShowBusinessman"){
          var technicianId = JSON.parse(localStorage.getItem("technicianInfo")).technicianId;
        $.ajax({
          type: "get",
          dataType: "json",
          url: ApiUrl.addCorrelationTechnician,
          data: {
            customerId: that.businessmanInfo.customerId,
            technicianId: technicianId
          },
          success: function (data) {
            if(data){
              next();
            }else{
              $("#popup").html("添加商家失败");
              that.isPopup = true;
              setTimeout(function(){
                that.isPopup = false;
              },2000);
              return;
            }
          },
          error: function (err) {
            console.log("error");
          }
        });
      }else{
        next();
      }
    }
  }
</script>

<style scoped>
.invite-businessman{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.search-wrap{
  padding: 10px 0 10px 12px;
  background-color: #FFFFFF;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  border-bottom: 1px solid #eeeeee;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.search-input-wrap{
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  padding: 12px;
  background-color: #f1f6fa;
  border-radius: 8px;
}
.search-input-inner{
  border-left: 1px solid #e5e5e5;
  padding-left: 5px;
  height: 20px;
  position: relative;
}
.searched-input-inner{
  padding-left: 5px;
  height: 20px;
  position: relative;
}
.search-input{
  border: none;
  background-color: #f1f6fa;
  outline: none;
  width: 100%;
  height: 20px;
  line-height: 20px;
  position: absolute;
  left: 5px;
  top:0;
  right: 0;
  bottom:0;
}
input.search-input::-webkit-input-placeholder{
  font-size: 14px;
  color: #b3b3b3;
}
.search-btn{
  width: 60px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 16px;
  color: #666666;
}
.searched-list-wrap{
  margin-top: 65px;
  background-color: #FFFFFF;
}
.searched-list-wrap ul li{
  padding: 12px;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
}
.businessman-img{
  width: 68px;
  height: 68px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
}
.businessman-img img{
  width: 100%;
}
.businessman-info{
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 10px;
}
.businessman-info p{
  height: 25px;
  line-height: 25px;
  font-size: 16px;
  color: #666666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.add-businessman-btn{
  width: 100px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background-color: #0c94ed;
  color: #FFFFFF;
  font-size: 12px;
  margin:19px 0 0 5px;
  border-radius: 5px;
}
  .invite-code{
    position: absolute;
    border: 1px solid #14a5e0;
    border-radius: 8px;
    left: 10px;
    right: 10px;
    bottom:15px;
    height: 42px;
    line-height: 42px;
    color: #14a5e0;
    font-size: 16px;
    text-align: center;
  }
</style>
