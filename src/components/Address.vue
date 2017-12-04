<template>
  <div>
    <div class="popup" v-show="isPopup">{{promptMsg}}</div>
    <div class="address">
      <a class="weui-cell weui-cell_access" href="javascript:;" @click="show=true">
        <div class="weui-cell__hd">所在地区</div>
        <div v-if="showSelected" class="weui-cell__bd">{{ message.province }}{{ message.city }}{{ message.area }}</div>
        <div v-else class="weui-cell__ft"></div>
      </a>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">详细地址</label></div>
      </div>
      <div class="weui-cell">
        <textarea class="weui-textarea" placeholder="请填写详细地址，不少于5个字" rows="3" v-model="addressDetail"></textarea>
      </div>
    </div>
    <div class="padding-10">
      <a href="javascript:;" class="weui-btn weui-btn_primary" @click="saveAdress">保存</a>
    </div>
    <weui-distpicker v-if="show" @confirm="onConfirm" @cancel="onCancel"></weui-distpicker>
  </div>
</template>

<script>
  import WeuiDistpicker from 'weui-distpicker';
  import ApiUrl from '../api/apiUrl';
export default {
  name: 'address',
  data () {
    return {
      show: false,
      showSelected: false,
      isPopup: false,
      promptMsg: "",
      message: {
        province: '广东省',
        city: '深圳市',
        area: '宝安区'
      },
      addressDetail: ""
    }
  },
  components: {
    WeuiDistpicker
  },
  methods: {
    onConfirm(data) {
      console.log(data);
      this.message.province = data[0].label;
      this.message.city = data.length >= 2 ? data[1].label : '';
      this.message.area = data.length == 3 ? data[2].label : '';
      this.showSelected = true;
      this.show = false;
    },
    onCancel() {
      this.show = false
    },
    saveAdress() {
      let that = this;
      if(that.message.area == ""){
        that.promptMsg = "请选择所在地区";
        that.isPopup = true;
        setTimeout(function () {
          that.isPopup = false;
          that.promptMsg = "";
        }, 2000);
        return false;
      }
      if(that.addressDetail == ""){
        that.promptMsg = "请填写详细地址";
        that.isPopup = true;
        setTimeout(function () {
          that.isPopup = false;
          that.promptMsg = "";
        }, 2000);
        return false;
      }
      let fixAddress = that.message.province + that.message.city + that.message.area + that.addressDetail;
      let technicianId = JSON.parse(localStorage.getItem("technicianInfo")).technicianId;
      //let technicianId = 'technicianId';
      $.ajax({
        type: "get",
        dataType: 'json',
        url: ApiUrl.saveTechnicianAddress,
        data: {
          technicianId: technicianId,
          fixAddress: fixAddress
        },
        success: function (data) {
          if(data){
            that.promptMsg = "保存成功";
            that.isPopup = true;
            setTimeout(function () {
              that.isPopup = false;
              that.promptMsg = "";
              that.$router.push('AccountInfo');
            }, 2000);
          }else{
            that.promptMsg = "保存失败";
            that.isPopup = true;
            setTimeout(function () {
              that.isPopup = false;
              that.promptMsg = "";
            }, 2000);
            return false;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .address{
    background-color: #ffffff;
    margin: 10px 0 12px 0;
  }
  .weui-btn_primary{
    background-color: #06a0de;
  }
  .weui-cell_access .weui-cell__ft:after {
    transform: rotateZ(45deg);
  }
  .weui-cell__bd{
    padding-left: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    line-height: 22px;
  }
  .weui-cell__ft{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .weui-picker__action{
    color: #06a0de !important;
  }
</style>
