<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="show-businessman">
    <div class="searched-list-wrap">
      <ul>
        <li>
          <div class="businessman-img">
            <img v-bind:src="businessmanInfo.userLogin.headimgurl" />
          </div>
          <div class="businessman-info">
            <p>{{ businessmanInfo.shopName }}</p>
            <p>ID：{{ businessmanInfo.userLogin.loginName }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'show-businessman',
    data() {
      return {
        businessmanInfo: {}
      }
    },
    created(){
      let businessmanInfo = this.$route.params.businessmanInfo;
      this.businessmanInfo = businessmanInfo;
    },
    mounted(){

    },
    methods: {

    }
  }
</script>

<style scoped>
.show-businessman{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.searched-list-wrap{
  margin-top: 10px;
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

</style>
