<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="search-price">
    <div class="search-wrap">
      <div class="search-input-wrap">
        <i class="search-icon"></i>
        <div class="search-input-inner">
          <input v-model="basics" placeholder="请输入搜索关键字" type="text" class="search-input" />
        </div>
      </div>
      <div class="search-btn" v-on:click="searchKeyWords()">搜索</div>
    </div>
    <div class="sort-item-wrap">
      <div class="sort-item" v-bind:class="{ current: isActive, defaultUpIcon: deviceUpDIcon, currentUpIcon: deviceUpCIcon }" v-on:click="toggleEquipment()">{{selectDevice}}<i></i></div>
      <div class="sort-item" v-bind:class="{ current: !isActive, defaultUpIcon: brandUpDIcon, currentUpIcon: brandUpCIcon }" v-on:click="toggleBrand()">{{selectBrand}}<i></i></div>
    </div>
    <div class="sort-sub-item-wrap" v-on:click="showSubEquipment = false" v-if="showSubEquipment">
      <div class="sort-sub-item">
        <p v-bind:class="{current: currentDevice == index}" v-for="(deviceType, index) in deviceTypes" v-on:click="selectDeviceFn(deviceType.id, deviceType.deviceType, index)">
          <span>{{deviceType.deviceType}}</span>
          <i></i>
        </p>
      </div>
    </div>
    <div class="sort-sub-item-wrap" v-on:click="showSubBrand = false" v-if="showSubBrand">
      <div class="sort-sub-item">
        <p v-bind:class="{current: currentBrand == index}" v-for="(brandType, index) in brandTypes" v-on:click="selectBrandFn(brandType.id, brandType.brandNameEn, index)">
          <span>{{brandType.brandNameEn}}</span>
          <i></i>
        </p>
      </div>
    </div>
    <div class="order-list-wrap">
      <div class="order-list-inner">
        <router-link v-for="(item,index) in serviceInfo" class="order-list" :to="{ name: 'ServicePriceDetail', params: { serveId: item.id }}">
          <div class="order-head">
            <div class="order-head-list">
              <span v-if="item.deviceName">{{item.deviceName}}</span>
              <span v-else>无</span>
            </div>
            <div class="order-status" v-if="item.typeBasics && item.typeBasics.deviceType">{{item.typeBasics.deviceType}}</div>
            <div class="order-status" v-else>无</div>
          </div>
          <div class="order-main">
            <p>现象：{{item.faultPhenomenon}}</p>
            <p>故障：{{item.faultPoint}}</p>
            <p v-if="item.brandBasics && item.brandBasics.brandNameEn">品牌：{{item.brandBasics.brandNameEn}}</p>
            <p v-else>品牌：无</p>
          </div>
          <div class="order-foot">
            合计：<span class="order-price">{{item.totalPrice}}</span>
          </div>
        </router-link>
        <div class="more-data" v-if="showLoadMore" v-on:click="loadMoreData()">点击加载更多</div>
        <div class="no-data" v-if="showNoData">暂无更多数据</div>
      </div>
    </div>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  export default {
    name: 'search-price',
    data() {
      return {
        showLoadMore: false,
        showNoData: false,
        deviceTypes: [],
        brandTypes: [],
        deviceTypeId: "",
        brandId: "",
        basics: "",
        counts: 10,
        currentPage: 1,
        selectDevice: "",
        selectBrand: "",
        serviceInfo: [],
        currentDevice: 0,
        currentBrand: -1,
        showSubEquipment: false,
        showSubBrand: false,
        isActive: true,
        deviceUpCIcon: false,
        deviceUpDIcon: false,
        brandUpCIcon: false,
        brandUpDIcon: false
      }
    },
    created(){
      this.getDeviceType();
      this.getBrandType();
    },
    mounted(){

    },
    watch: {
    },
    methods: {
      loadMoreData: function(){
        this.currentPage ++;
        this.findServeInfo();
      },
      searchKeyWords: function () {
        this.currentPage = 1;
        this.serviceInfo = [];
        this.findServeInfo();
        this.brandUpCIcon = false;
        this.brandUpDIcon = false;
        this.deviceUpCIcon = false;
        this.deviceUpDIcon = false;
        this.showSubEquipment = false;
        this.showSubBrand = false;
      },
      toggleEquipment: function () {
        this.showSubBrand = false;
        this.showSubEquipment = !this.showSubEquipment;
        if(this.isActive){
          this.deviceUpCIcon = !this.deviceUpCIcon;
        }else{
          this.deviceUpDIcon = !this.deviceUpDIcon;
        }
        this.brandUpDIcon = false;
        this.brandUpCIcon = false;
      },
      toggleBrand: function () {
        this.showSubEquipment = false;
        this.showSubBrand = !this.showSubBrand;
        if(!this.isActive){
          this.brandUpCIcon = !this.brandUpCIcon;
        }else{
          this.brandUpDIcon = !this.brandUpDIcon;
        }
        this.deviceUpCIcon = false;
        this.deviceUpDIcon = false;
      },
      selectBrandFn: function (brandId, brandType, index) {
        console.log(index);
        this.currentBrand = index;
        this.brandId = brandId;
        this.selectBrand = brandType;
        this.serviceInfo = [];
        this.deviceTypeId = "";
        this.basics = "";
        this.currentPage = 1;
        this.findServeInfo();
        this.showSubBrand = false;
        this.currentDevice = -1;
        this.isActive = false;
        this.brandUpCIcon = false;
        this.brandUpDIcon = false;
        this.deviceUpCIcon = false;
        this.deviceUpDIcon = false;
      },
      selectDeviceFn: function (deviceId, deviceType, index) {
        this.currentDevice = index;
        this.deviceTypeId = deviceId;
        this.selectDevice = deviceType;
        this.serviceInfo = [];
        this.brandId = "";
        this.basics = "";
        this.currentPage = 1;
        this.findServeInfo();
        this.showSubEquipment = false;
        this.currentBrand = -1;
        this.isActive = true;
        this.brandUpCIcon = false;
        this.brandUpDIcon = false;
        this.deviceUpCIcon = false;
        this.deviceUpDIcon = false;
      },
      getDeviceType: function () {
          let that = this;
        $.ajax({
          type: "GET",
          dataType: "json",
          url: ApiUrl.findDeviceTypeBasics,
          success: function (res) {
            let allDevice = {
              id: "",
              deviceType: "全部设备"
            };
            res.unshift(allDevice);
            that.deviceTypes = res;
            that.deviceTypeId = that.deviceTypes[0].id;
            that.selectDevice = that.deviceTypes[0].deviceType;
            that.findServeInfo();
          },
          error: function () {
            console.log("error");
          }
        });
      },
      getBrandType: function () {
        let that = this;
        $.ajax({
          type: "GET",
          dataType: "json",
          url: ApiUrl.findBrandBasics,
          success: function (res) {
            let allBrand = {
              brandNameEn: "全部品牌",
              id: ""
            };
            res.unshift(allBrand);
            that.brandTypes = res;
            that.selectBrand = that.brandTypes[0].brandNameEn;
          },
          error: function () {
            console.log("error");
          }
        });
      },
      findServeInfo: function () {
        let that = this;
        that.showLoadMore = false;
        that.showNoData = false;
        $.ajax({
          type: "GET",
          dataType: "json",
          url: ApiUrl.findServeInfo,
          data: {
            deviceTypeId: that.deviceTypeId,
            brandId: that.brandId,
            basicsInfo: that.basics,
            currentPage: that.currentPage,
            counts: that.counts
          },
          success: function (res) {
            if(res.length > 0){
              that.serviceInfo = that.serviceInfo.concat(res);
              that.showLoadMore = true;
            }else{
              that.showNoData = true;
            }
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
  .more-data,.no-data{
    height:40px;
    text-align:center;
    line-height:40px;
    color:#333333;
    font-size:14px;
  }
  .search-wrap{
    padding: 10px 0 10px 12px;
    background-color: #FFFFFF;
    position: fixed;
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
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .search-input-inner{
    border-left: 1px solid #e5e5e5;
    padding-left: 10px;
    height: 20px;
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .search-icon{
    width: 32px;
    height: 20px;
    background: url("../assets/images/bazhua-icon.png") no-repeat -6px -684px;
    background-size: 110%;
  }

  .search-input{
    border: none;
    background-color: #f1f6fa;
    outline: none;
    width: 100%;
    height: 20px;
    line-height: 20px;
    position: absolute;
    left: 10px;
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
  .sort-item-wrap{
    padding: 10px 0;
    background-color: #FFFFFF;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    position: fixed;
    left: 0;
    top:65px;
    right: 0;
    border-bottom: 1px solid #eeeeee;
  }
  .sort-item-wrap>div:first-child{
    border-right: 1px solid #e5e5e5;
  }
  .sort-item{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    height: 20px;
    line-height: 20px;
    color: #333333;
    font-size:16px;
    text-align: center;
  }
  .sort-item i{
    margin-left: 6px;
    width: 10px;
    height: 20px;
    display: inline-block;
    vertical-align: top;
    background: url("../assets/images/bazhua-icon.png") no-repeat center -841px;
    background-size: 400%;
  }
  .sort-item.current{
    color:#0d94ee;
  }
  .sort-item.current>i{
    background-position:center -812px;
  }
  .sort-item.defaultUpIcon>i{
    background-position:center -931px;
  }
  .sort-item.currentUpIcon>i{
    background-position:center -870px;
  }
  .sort-sub-item-wrap{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 105px;
    background-color: rgba(0,0,0,0.5);
  }
  .sort-sub-item{
    background-color: #FFFFFF;
  }
  .sort-sub-item p{
    border-top: 1px solid #eeeeee;
    height: 40px;
    line-height: 40px;
    padding: 0 12px;
    font-size: 14px;
    color: #333333;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .sort-sub-item p span{
    padding-left: 10px;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .sort-sub-item p.current span{
    color: #0c94ed;
  }
  .sort-sub-item p.current i{
    width: 14px;
    height: 40px;
    background: url("../assets/images/bazhua-icon.png") no-repeat center -1258px;
    background-size: 400%;
  }
  .order-list-wrap{
    padding: 105px 0 20px 0;
  }
  .order-list{
    background-color: #ffffff;
    margin-bottom: 10px;
    border-top: 1px solid #eeeeee;
    display: block;
  }
  .order-head{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding: 7px 10px;
  }
  .order-head-list{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .order-head-list span{
    font-size: 14px;
  }
  .order-status{
    text-align: right;
    color: #666666;
    width: 70px;
    padding-left: 10px;
    font-size: 12px;
    line-height: 25px;
  }
  .order-main{
    background-color: #f7f8f8;
    padding: 10px;
    border-bottom: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
  }
  .order-main h4{
    font-size: 14px;
    color: #333333;
  }
  .order-main p{
    font-size: 13px;
    color: #666666;
  }
  .order-foot{
    padding: 7px 10px;
    font-size: 14px;
  }
  .order-price{
    color: #ff0000;
  }
  .order-list-inner a{
    color: #333333;
  }
  .order-list-inner{
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }

</style>
