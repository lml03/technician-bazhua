<template>
  <div class="mapPage">
    <iframe id="mapPage" width="100%" height="100%" frameborder=0></iframe>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  export default {
    name: 'OrderLocation',
    data () {
      return {
        coord: "",
        title: "",
        addr: ""
      }
    },
    created () {
      let address = this.$route.params.address;
      let orderCoord = this.$route.params.orderCoord;
      this.coord = orderCoord[0] + "," + orderCoord[1];
      this.title = address.split("(")[1].split(")")[0];
      this.addr = address.split("(")[0];
      console.log("created----");
      console.log(this.coord, this.title, this.addr);
    },
    mounted: function () {
      console.log("mounted----");
      console.log(this.coord, this.title, this.addr);
      this.locationMap();
    },
    methods: {
      locationMap: function () {
        console.log("locationMap----");
        console.log(this.coord, this.title, this.addr);
        let mapRequestUrl = "http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:"+this.coord+";title:"+this.title+";addr:"+this.addr+"&key=KKFBZ-LUR64-OALUA-XEB4Y-3ZVPV-CAB3E&referer=myapp";
        $("#mapPage").attr("src", mapRequestUrl);
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mapPage{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
  }
</style>
