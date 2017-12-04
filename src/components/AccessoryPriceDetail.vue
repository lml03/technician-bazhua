<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="accessory-price-detail">
    <div class="accessory-img-wrap">
      <swiper :options="swiperOption" class="swiper-box">
        <swiper-slide class="swiper-item" v-for="item in partsDetail.carouselImage">
          <img v-bind:src="item" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="accessory-info-wrap">
      <div class="accessory-info-list">
        <div class="accessory-info">
          <h1>{{partsDetail.partsName}}</h1>
          <p class="brand-name">{{partsDetail.partsbrandNameEn}}</p>
          <p class="accessory-price">￥<i>{{partsDetail.nonVipPrice}}</i></p>
        </div>
      </div>
      <div class="accessory-info-list">
        <h2>规格型号</h2>
        <div class="accessory-info" v-if="partsDetail.specifications" v-html="partsDetail.specifications"></div>
        <div class="accessory-info" v-else>无</div>
      </div>
      <div class="accessory-info-list">
        <h2>所属设备</h2>
        <div class="accessory-info">
          <p v-if="partsDetail.deviceType">设备类型：{{partsDetail.deviceType}}</p>
          <p v-else>设备类型：无</p>
          <p v-if="partsDetail.deviceName">设备名称：{{partsDetail.deviceName}}</p>
          <p v-else>设备名称：无</p>
          <p v-if="partsDetail.devicebrandNameEn">设备品牌：{{partsDetail.devicebrandNameEn}}</p>
          <p v-else>设备品牌：无</p>
          <p v-if="partsDetail.deviceModelNum">设备型号：{{partsDetail.deviceModelNum}}</p>
          <p v-else>设备型号：无</p>
        </div>
      </div>
      <div class="accessory-info-list">
        <h2>适用设备及类型</h2>
        <div class="accessory-info">
          <p v-if="partsDetail.deviceFit">{{partsDetail.deviceFit}}</p>
          <p v-else>无</p>
        </div>
      </div>
      <div class="accessory-info-list">
        <h2>其他</h2>
        <div class="accessory-info">
          <p v-if="partsDetail.erpNo">配件编码：{{partsDetail.erpNo}}</p>
          <p v-else>配件编码：无</p>
          <p v-if="partsDetail.region == 1">产地：国产</p>
          <p v-else-if="partsDetail.region == 2">产地：进口</p>
          <p v-else>产地：无</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: 'accessory-price-detail',
    data() {
      return {
        partsDetail: {},
        partsId: -1,
        swiperOption: {
          pagination: '.swiper-pagination',
          direction: 'horizontal',
          slidesPerView: 1,
          //spaceBetween: 30,
          autoplay: 1000,
          loop : true,
          //notNextTick: true,
          //effect : 'fade',
          //mousewheelControl: true
        }
      }
    },
    created(){
      let partsId = this.$route.params.partsId;
      this.partsId = partsId;
    },
    mounted(){
      this.getPartsDetail();
    },
    methods: {
      getPartsDetail: function () {
        let that = this;
        $.ajax({
          type: "GET",
          dataType: "json",
          url: ApiUrl.findPartsDetails,
          data: {
            partsId: that.partsId
          },
          success: function (res) {
            let carouselImage = res.carouselImage;
            let carouselImageArr = [];
            if(carouselImage){
              carouselImageArr = carouselImage.split(";");
              carouselImageArr.length = carouselImageArr.length - 1;
            }
            if(res.coverImage){
              carouselImageArr.unshift(res.coverImage);
            }
            res.carouselImage = carouselImageArr;
            that.partsDetail = res;
            if(res.brandBasics){
              that.partsDetail.partsbrandNameEn = res.brandBasics.brandNameEn;
            }else{
              that.partsDetail.partsbrandNameEn = "无";
            }
            if(res.deviceInfo && res.deviceInfo.deviceTypeBasics){
              that.partsDetail.deviceType = res.deviceInfo.deviceTypeBasics.deviceType;
            }else{
              that.partsDetail.deviceType = "无";
            }
            if(res.deviceInfo.brandBasics){
              that.partsDetail.devicebrandNameEn = res.deviceInfo.brandBasics.brandNameEn;
            }else{
              that.partsDetail.devicebrandNameEn = "无";
            }
            if(res.deviceInfo){
              that.partsDetail.deviceModelNum = res.deviceInfo.deviceModelNum;
              that.partsDetail.deviceName = res.deviceInfo.deviceName;
            }else{
              that.partsDetail.deviceModelNum = "无";
              that.partsDetail.deviceName = "无";
            }
          },
          error: function () {
            console.log("error");
          }
        });
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped>
  .accessory-img-wrap{
  }
.accessory-info-list h2{
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  background-color: #f7f8f8;
  font-size: 16px;
  color: #333333;
}
.accessory-info{
  background-color: #FFFFFF;
  font-size: 13px;
  color: #333333;
  padding: 8px 10px;
}
.accessory-info p{
  line-height: 20px;
}
  .accessory-info h1{
    font-size: 16px;
    color: #333333;
  }
  .brand-name{
    color: #b3b3b3;
    font-size: 13px;
  }
  .accessory-price{
    color: #ff0000;
    font-size: 12px;
    padding-top: 5px;
  }
  .accessory-price i{
    font-size: 16px;
  }
  .accessory-img-wrap{
    font-size: 0;
  }
  .accessory-img-wrap img{
    width: 100%;
  }

  .swiper-box {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .swiper-item {
    height: 100%;
    text-align: center;
    font-size: 18px ;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .swiper-pagination{
    text-align: right;
  }

</style>
