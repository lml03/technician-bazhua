<template>
  <div class="create-workorder">
    <!--地址选择弹框-->
    <div v-if="showCustomer">
      <div class="weui-mask">
        <div class="weui-actionsheet">
          <div class="weui-actionsheet__menu">
            <div v-for="(customer, index) in customerList" class="weui-actionsheet__cell" v-on:click="selectCustomer(customer)">{{customer.shopName}}</div>
          </div>
          <div class="weui-actionsheet__action">
            <div class="weui-actionsheet__cell" v-on:click="showCustomer = false">取消</div>
          </div>
        </div>
      </div>
    </div>
    <div class="popup" v-if="submitWait">正在提交中...</div>
    <div class="popup" id="popup" v-show="isPopup">{{popupMsg}}</div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">商家名称<i class="color-ff0">*</i>：</label></div>
        <div class="weui-cell__bd self-weui-cell__bd" v-on:click="getCustomer()">{{shopName}}</div>
        <div class="weui-cell__ft self-weui-cell__ft"></div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">联系人：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" v-model="contactName" placeholder="请输入联系人">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">联系方式：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" v-model="mobilePhone" placeholder="请输入联系方式">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">联系地址：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" v-model="address" placeholder="请输入联系方式">
        </div>
      </div>
    </div>

    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">开始检修：</label></div>
        <div class="weui-cell__bd color-14a" v-on:click="getStartTime()">{{startRecondition}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">检修完成：</label></div>
        <div class="weui-cell__bd color-14a" v-on:click="getEndTime()">{{endRecondition}}</div>
      </div>
    </div>

    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">服务项目：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" v-model="serviceProject" placeholder="请输入服务项目">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">服务费用：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number" v-model="servicePrice" placeholder="请输入价格">
        </div>
      </div>
    </div>

    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <div class="weui-uploader">
            <div class="weui-uploader__hd">
              <p class="weui-uploader__title">上传设备图片<span style="font-size: 12px;color:#b3b3b3;">(最多可上传九张)</span></p>
            </div>
            <div class="weui-uploader__bd">
              <ul class="weui-uploader__files" id="uploaderDeviceImg">
                <li class="upload-img" v-for="(deviceImageUrl, imageIndex) in deviceImageUrlArr">
                  <img v-bind:src="deviceImageUrl" />
                  <span class="delete-btn" v-on:click.stop.prevent="deleteImg('deviceImage', imageIndex)"></span>
                </li>
              </ul>
              <div class="weui-uploader__input-box">
                <vue-core-image-upload
                  class="btn btn-primary"
                  :crop="false"
                  :max-file-size="5242880"
                  :text = "setUploadProp.txt"
                  compress = "50"
                  url="/other/front/uploadFile.htm"
                  @imageuploaded="deviceImageuploaded"
                  @imagechanged="deviceImagechanged"
                  @imageuploading="deviceImageuploading"
                  @errorhandle="deviceImageErrorhandle" >
                </vue-core-image-upload>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">设备名称<i class="color-ff0">*</i>：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" v-model="deviceName" placeholder="请输入设备名称">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">品牌：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" v-model="deviceBrand" placeholder="请输入设备品牌">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">型号：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" v-model="modelNumber" placeholder="请输入设备型号">
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">区域：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" v-model="region" placeholder="请输入设备位置">
        </div>
      </div>
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd">故障描述：<span style="font-size: 12px;color:#b3b3b3;">(最多上传九张)</span></div>
        <div class="weui-panel__bd breakdown-info">
          <textarea class="weui-textarea" placeholder="请输入故障内容" rows="3" v-model="faultContent"></textarea>
        </div>
        <div class="weui-uploader__bd breakdown-info">
          <ul class="weui-uploader__files" id="uploaderBreakdownImg">
            <li class="upload-img" v-for="(faultImageUrl, imageIndex) in faultImageUrlArr">
              <img v-bind:src="faultImageUrl" />
              <span class="delete-btn" v-on:click.stop.prevent="deleteImg('faultImage', imageIndex)"></span>
            </li>
          </ul>
          <div class="weui-uploader__input-box">
            <vue-core-image-upload
              class="btn btn-primary"
              :crop="false"
              :max-file-size="5242880"
              :text = "setUploadProp.txt"
              compress = "50"
              url="/other/front/uploadFile.htm"
              @imageuploaded="faultImageuploaded"
              @imagechanged="faultImagechanged"
              @imageuploading="faultImageuploading"
              @errorhandle="faultImageErrorhandle" >
            </vue-core-image-upload>
          </div>
        </div>
        <div class="deal-result">处理结果：</div>
        <div class="weui-panel__bd deal-result-info">
          <textarea class="weui-textarea" placeholder="请输入故障内容" rows="3" v-model="handlingResult"></textarea>
        </div>
      </div>
    </div>

    <div class="weui-cells weui-cells_form" v-for="(parts, index) in partslist">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>配件{{index+1}}</p>
        </div>
        <div class="weui-cell__ft color-14a operate-info" v-bind:class="{ active: parts.isFold }" v-on:click="showDetail(parts)">{{parts.toggleMsg}}<i></i></div>
      </div>
      <div class="accessory-info" v-if="parts.isFold">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">配件{{index+1}}<i class="color-ff0">*</i>：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="parts.partsName" placeholder="请输入配件名称">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">原厂代码：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="parts.manufacturerNo" placeholder="请输入原厂代码">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">物料编号：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="parts.erpNo" placeholder="请输入物料编号">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">配件型号：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="parts.modelNumber" placeholder="请输入配件型号">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">配件规格：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="parts.specification" placeholder="请输入配件规格">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">配件单位：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="parts.unit" placeholder="请输入配件单位">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">配件数量：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" v-model="parts.number" v-on:keyup="calculateTotalCost()" placeholder="请输入配件数量">
          </div>
        </div>
        <div class="weui-cell weui-cell_access" v-on:click="selectInstall(parts)">
          <div class="weui-cell__bd">
            <p>是否安装</p>
          </div>
          <div class="weui-cell__ft">{{parts.selectedInstall}}</div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">配件价格：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" v-model="parts.partsPrice" placeholder="请输入配件价格" v-on:keyup="calculateTotalCost()">
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__bd">
            <div class="weui-uploader">
              <div class="weui-uploader__hd">
                <p class="weui-uploader__title">图片：<span style="font-size: 12px;color:#b3b3b3;">(最多可上传九张)</span></p>
              </div>
              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files accessory-img-list" id="uploaderPartsImg">
                  <li class="upload-img" v-for="(partsImageUrl, imageIndex) in parts.partsImageUrlArr">
                    <img v-bind:src="partsImageUrl" />
                    <span class="delete-btn" v-on:click.stop.prevent="deleteImg('partsImage', imageIndex, index)"></span>
                  </li>
                </ul>
                <div class="weui-uploader__input-box" v-on:click="getCurrentPart(index)">
                  <vue-core-image-upload
                    class="btn btn-primary"
                    :crop="false"
                    :max-file-size="5242880"
                    :text = "setUploadProp.txt"
                    compress = "50"
                    url="/other/front/uploadFile.htm"
                    @imageuploaded="partsImageuploaded"
                    @imagechanged="partsImagechanged"
                    @imageuploading="partsImageuploading"
                    @errorhandle="partsImageErrorhandle" >
                  </vue-core-image-upload>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="delete-accessory" v-on:click="deleteParts(index)">删除配件</div>
      </div>
    </div>

    <div class="add-accessory" v-on:click="addParts()">+添加配件</div>

    <div class="weui-cell total-cost">
      <div class="weui-cell__bd">
        <p>费用合计：</p>
      </div>
      <div class="weui-cell__ft">￥：{{totalCost}}</div>
    </div>

    <div class="submit-workorder-btn">
      <span v-on:click="submitWorkorder()" v-if="canSubmitWorkorder">提交工单</span>
      <span v-else>提交工单</span>
    </div>

  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  import AppConfig from '../api/appConfig';
  import axios from 'axios';
  import VueCoreImageUpload from 'vue-core-image-upload';
  export default {
    name: 'CreateWorkorder',
    data () {
      return {
        setUploadProp: {
          txt: ""
        },
        currentPartsIndex: 0,
        showCustomer: false,
        customerList: [],
        isPopup: false,
        canSubmitWorkorder: true,
        submitWait: false,
        popupMsg: "",
        shopName: "请选择商家名称",
        contactName: "",
        mobilePhone: "",
        address: "",
        mobile: "",
        phone: "",
        startRecondition: "获取当前时间",
        endRecondition: "获取当前时间",
        serviceProject: "",
        servicePrice: "",
        deviceName: "",
        deviceBrand: "",
        modelNumber: "",
        region: "",
        faultContent: "",
        handlingResult: "",
        deviceImage: [],
        deviceImageUrlArr: [],
        faultImage: [],
        faultImageUrlArr: [],
        partslist: [],
        totalCost: 0
      }
    },
    created () {

    },
    mounted: function () {
      this.calculateTotalCost ();
    },
    components: {
      'vue-core-image-upload': VueCoreImageUpload
    },
    watch: {
      servicePrice: function () {
        this.calculateTotalCost ();
      }
    },
    methods: {
      deviceImageuploaded(res) {
          console.log(res);
        let resImgArr = res.imgPath.split(";");
        console.log(resImgArr);
        resImgArr.length = resImgArr.length - 1;
        console.log(resImgArr);
        console.log(this.deviceImage);
        let deviceImageLen = resImgArr.length + this.deviceImage.length;
        console.log(deviceImageLen);
        if(deviceImageLen < 10){
          this.deviceImage = this.deviceImage.concat(resImgArr);
        }
        console.log("--deviceImageuploaded--");
        console.log(this.deviceImage);
      },
      deviceImagechanged(res){
        let imgLenth = res.length;
        if(imgLenth == undefined){
          imgLenth = 1;
        }
        let URL = window.URL || window.webkitURL;
        let totalLen = this.deviceImageUrlArr.length + imgLenth;
        if(imgLenth > 1 && imgLenth < 10 && totalLen < 10){
          for(let i = 0; i < imgLenth; i++ ){
            this.deviceImageUrlArr.push(URL.createObjectURL(res[i]));
          }
        }else if(totalLen > 9){
          this.popupMsg = "上传图片不能超过9张";
          this.showPrompt();
        }else if(imgLenth == 1){
          this.deviceImageUrlArr.push(URL.createObjectURL(res));
        }
        console.log("--this.deviceImageUrlArr--");
        console.log(this.deviceImageUrlArr);
      },
      deviceImageuploading(res) {

      },
      deviceImageErrorhandle() {
        this.popupMsg = "上传失败";
        this.showPrompt();
      },
      faultImageuploaded(res) {
        let resImgArr = res.imgPath.split(";");
        resImgArr.length = resImgArr.length - 1;
        let faultImageLen = resImgArr.length + this.faultImage.length;
        if(faultImageLen < 10){
          this.faultImage = this.faultImage.concat(resImgArr);
        }
      },
      faultImagechanged(res){
        let imgLenth = res.length;
        if(imgLenth == undefined){
          imgLenth = 1;
        }
        let URL = window.URL || window.webkitURL;
        let totalLen = this.faultImageUrlArr.length + imgLenth;
        if(imgLenth > 1 && imgLenth < 10 && totalLen < 10){
          for(let i = 0; i < imgLenth; i++ ){
            this.faultImageUrlArr.push(URL.createObjectURL(res[i]));
          }
        }else if(totalLen > 9){
          this.popupMsg = "上传图片不能超过9张";
          this.showPrompt();
        }else if(imgLenth == 1){
          this.faultImageUrlArr.push(URL.createObjectURL(res));
        }
      },
      faultImageuploading(res) {

      },
      faultImageErrorhandle() {
        this.popupMsg = "上传失败";
        this.showPrompt();
      },
      getCurrentPart(index){
        this.currentPartsIndex = index;
        console.log("--getCurrentPart--");
        console.log(this.currentPartsIndex);
      },
      partsImageuploaded(res) {
        let index = this.currentPartsIndex;
        let resImgArr = res.imgPath.split(";");
        resImgArr.length = resImgArr.length - 1;
        this.partslist = this.partslist.map(function (item, ind) {
          if(ind == index){
            let partsImageLen = resImgArr.length + item.partsImage.length;
            if(partsImageLen < 10){
              item.partsImage = item.partsImage.concat(resImgArr);
            }
          }
          return item;
        });
      },
      partsImagechanged(res){
        let index = this.currentPartsIndex;
        //限制最多上传九张图片
        let isExceed = false;
        let partsIndex = 0;
        for(let i = 0; i < this.partslist.length; i++){
          if(i == index){
            let imgLenth = res.length;
            if(imgLenth == undefined){
              imgLenth = 1;
            }
            let URL = window.URL || window.webkitURL;
            let totalLen = this.partslist[i].partsImageUrlArr.length + imgLenth;
            if(imgLenth > 1 && imgLenth < 10 && totalLen < 10){
              for(let j = 0; j < imgLenth; j++ ){
                this.partslist[i].partsImageUrlArr.push(URL.createObjectURL(res[j]));
              }
            }else if(totalLen > 9){
              partsIndex = (i + 1);
              isExceed = true;
              break;
            }else if(imgLenth == 1){
              this.partslist[i].partsImageUrlArr.push(URL.createObjectURL(res));
            }
          }
        }
        if(isExceed){
          this.popupMsg = "配件" + (partsIndex) + "上传图片不能超过9张";
          this.showPrompt ();
          return false;
        }
      },
      partsImageuploading(res) {

      },
      partsImageErrorhandle() {
        this.popupMsg = "上传失败";
        this.showPrompt();
      },
      getCustomer () {
        let that = this;
        axios.get(ApiUrl.findIndentureCust)
        .then(function (response) {
          if(response.status == 200){
            if(response.data){
              that.customerList = response.data;
              that.showCustomer = true;
            }else{
              that.popupMsg = "获取数据失败";
              that.showPrompt ();
              return false;
            }
          }else{
            that.popupMsg = "获取数据失败";
            that.showPrompt ();
            return false;
          }
        })
        .catch(function (error) {
          that.popupMsg = "获取数据失败";
          that.showPrompt ();
          return false;
        });
      },
      selectCustomer (customer) {
        this.shopName = customer.shopName;
        this.contactName = customer.contactName;
        this.address = customer.address;
        this.mobile = customer.mobile;
        this.phone = customer.phone;
        if(this.phone){
          this.mobilePhone = this.phone;
        }
        if(this.mobile) {
          this.mobilePhone = this.mobile;
        }
        this.showCustomer = false;
      },
      deleteImg (deleteImage, imageIndex, index) {
        console.log("confirm");
        console.log(deleteImage, imageIndex, index);
        let that = this;
        switch(deleteImage)
        {
          case "deviceImage":
            that.deviceImage.splice(imageIndex, 1);
            that.deviceImageUrlArr.splice(imageIndex, 1);
            break;
          case "faultImage":
            that.faultImage.splice(imageIndex, 1);
            that.faultImageUrlArr.splice(imageIndex, 1);
            break;
          case "partsImage":
            that.partslist = that.partslist.map(function (item, ind) {
              if(ind == index){
                item.partsImage.splice(imageIndex, 1);
                item.partsImageUrlArr.splice(imageIndex, 1);
              }
              return item;
            });
            break;
        }
      },
      calculateTotalCost () {
        let partsCost = 0;
        let servicePrice = parseFloat(this.servicePrice);
        this.partslist.forEach(function (item) {
          if(item.number && item.partsPrice){
            partsCost += parseFloat(item.number) * parseFloat(item.partsPrice);
          }
        });
        if(!servicePrice){
          servicePrice = 0;
        }
        this.totalCost = servicePrice + partsCost;
      },
      submitWorkorder () {
        let that = this;
        //检测商户名称是否为空
        if(that.shopName == "请选择商家名称"){
          that.popupMsg = "请选择商家名称";
          that.showPrompt ();
          return false;
        }

        //检测设备名称是否为空
        if(that.deviceName == ""){
          that.popupMsg = "设备名称不能为空";
          that.showPrompt ();
          return false;
        }

        //检测配件名称是否为空
        let noPartsname = false;
        let partsIndex = 0;
        for(let i = 0; i < that.partslist.length; i++){
          if(that.partslist[i].partsName == ""){
            partsIndex = (i + 1);
            noPartsname = true;
            break;
          }
        }
        if(noPartsname){
          that.popupMsg = "配件" + (partsIndex) + "名称不能为空";
          that.showPrompt ();
          return false;
        }

        //检测配件数量是否为合理整数
//        let isInt = false;
//        let partsIndx = 0;
//        let intNum = /^[1-9]+[0-9]*/;//大于0的整数
//        let zero = /^[0]{1}$/;//等于0
//        for(let i = 0; i < that.partslist.length; i++){
//          if(!intNum.test(that.partslist[i].number) || !zero.test(that.partslist[i].number)){
//            partsIndex = (i + 1);
//            isInt = true;
//            break;
//          }
//        }
//        if(isInt){
//          that.popupMsg = "配件" + (partsIndex) + "数量格式错误";
//          that.showPrompt ();
//          return false;
//        }

        //检测配件价格是否为合理数字
//        let intNum = /^[1-9]+[0-9]*/;//大于0的整数
//        let zero = /^[0]{1}$/;//等于0
//        let floatNum = /^[0]{1}.{1}[0-9]+$/;//小于等于0的小数
//        let floatNum2 = /^[1-9]+.{1}[0-9]+$/;//大于1的小数
//        let isNum = false;
//        for(let i = 0; i < that.partslist.length; i++){
//          if(!intNum.test(that.partslist[i].partsPrice) || !zero.test(that.partslist[i].partsPrice) || !floatNum.test(that.partslist[i].partsPrice) || !floatNum2.test(that.partslist[i].partsPrice)){
//            partsIndex = (i + 1);
//            isNum = true;
//            break;
//          }
//        }
//        if(isNum){
//          that.popupMsg = "配件" + (partsIndex) + "数量格式错误";
//          that.showPrompt ();
//          return false;
//        }



        //检测联系方式
        let mobilePattern = /^1\d{10}$/,
          phonePattern = /^0\d{2,3}-?\d{7,8}$/,
          phonePattern2 = /^\d{7,8}$/;
//        if (!mobilePattern.test(that.mobilePhone) && !phonePattern.test(that.mobilePhone) && !phonePattern2.test(that.mobilePhone)) {
//          that.popupMsg = "联系方式格式有误";
//          that.showPrompt ();
//          return false;
//        }
        let mobileVal = "";
        if (mobilePattern.test(that.mobilePhone)) {
          mobileVal = that.mobilePhone;
        }
        let phoneVal = "";
        if (phonePattern.test(that.mobilePhone) || phonePattern2.test(that.mobilePhone)) {
          phoneVal = that.mobilePhone;
        }

        //检测服务费用是否为数字
//        let intNum = /^[1-9]+[0-9]*/;//大于0的整数
//        let zero = /^[0]{1}$/;//等于0
//        let floatNum = /^[0]{1}.{1}[0-9]+$/;//小于等于0的小数
//        let floatNum2 = /^[1-9]+.{1}[0-9]+$/;//大于1的小数
//        if(!intNum.test(that.servicePrice) || !zero.test(that.servicePrice) || !floatNum.test(that.servicePrice) || !floatNum2.test(that.servicePrice)){
//          that.popupMsg = "服务费用格式有误";
//          that.showPrompt ();
//          return false;
//        }


        let postPartsList = [];
        that.partslist.forEach(function (item) {
          let postPartsObj = {
            partsName: item.partsName,
            manufacturerNo: item.manufacturerNo,
            erpNo: item.erpNo,
            modelNumber: item.modelNumber,
            specification: item.specification,
            unit: item.unit,
            number: item.number,
            installFlag: item.installFlag,
            partsPrice: item.partsPrice,
            partsImage: item.partsImage.length > 0 ? item.partsImage.join(";")+";" : ""//配件图
          };
          postPartsList.push(postPartsObj);
        });
        let technicianId = JSON.parse(localStorage.getItem("technicianInfo")).technicianId;
        //let technicianId = 68;
        if(that.startRecondition == "获取当前时间"){
          that.startRecondition = "";
        }
        if(that.endRecondition == "获取当前时间"){
          that.endRecondition = "";
        }
        let workorderObj = {
          orderInfo: {
            technicianId: technicianId,
            shopName: that.shopName,
            contactName: that.contactName,
            address: that.address,
            mobile: mobileVal,
            phone: phoneVal,
            faultContent: that.faultContent,
            faultImage: that.faultImage.length > 0 ? that.faultImage.join(";") + ";" : "",//故障图
            electronOrder: {
              startRecondition: that.startRecondition,
              endRecondition: that.endRecondition,
              serviceProject: that.serviceProject,
              servicePrice: that.servicePrice,
              deviceName: that.deviceName,
              deviceBrand: that.deviceBrand,
              modelNumber: that.modelNumber,
              region: that.region,
              handlingResult: that.handlingResult,
              totalCost: that.totalCost,
              deviceImage: that.deviceImage.length > 0 ? that.deviceImage.join(";") + ";" : "",//设备图
              partsInfoJson: postPartsList//配件列表
            }
          }
        };

        //暂时禁止点击
        that.canSubmitWorkorder = false;
        //提交中
        that.submitWait = true;

        axios.get(ApiUrl.addWorkOrder , {
          params: workorderObj
        })
        .then(function (response) {
          if(response.status == 200){
            if(response.data){
              that.submitWait = false;
              that.popupMsg = "提交成功";
              that.showPrompt ();
              setTimeout(function () {
                that.$router.push('OverhaulOrder');
              },2000);
            }else{
              that.submitWait = false;
              that.popupMsg = "提交失败";
              that.canSubmitWorkorder = true;
              that.showPrompt ();
              return false;
            }
          }else{
            that.submitWait = false;
            that.popupMsg = "提交失败";
            that.canSubmitWorkorder = true;
            that.showPrompt ();
            return false;
          }
        })
        .catch(function (error) {
          that.submitWait = false;
          that.popupMsg = "提交失败";
          that.canSubmitWorkorder = true;
          that.showPrompt ();
          return false;
        });

      },
      showPrompt () {
        let that = this;
        that.isPopup = true;
        setTimeout(function () {
          that.isPopup = false;
        }, 2000);
        return false;
      },
      getStartTime () {
        let oDate = new Date(),
          Y = oDate.getFullYear(),
          Mo = oDate.getMonth() + 1,
          D = oDate.getDate(),
          H = oDate.getHours(),
          Mi = oDate.getMinutes(),
          S = oDate.getSeconds();
        if(Mo < 10){
          Mo = "0" + Mo;
        }
        if(D < 10){
          D = "0" + D;
        }
        if(H < 10){
          H = "0" + H;
        }
        if(Mi < 10){
          Mi = "0" + Mi;
        }
        if(S < 10){
          S = "0" + S;
        }
        let startTime = Y + "-" + Mo + "-" + D + " " + H + ":" + Mi + ":" + S;
        this.startRecondition = startTime;
      },
      getEndTime () {
        let oDate = new Date(),
          Y = oDate.getFullYear(),
          Mo = oDate.getMonth() + 1,
          D = oDate.getDate(),
          H = oDate.getHours(),
          Mi = oDate.getMinutes(),
          S = oDate.getSeconds();
        if(Mo < 10){
          Mo = "0" + Mo;
        }
        if(D < 10){
          D = "0" + D;
        }
        if(H < 10){
          H = "0" + H;
        }
        if(Mi < 10){
          Mi = "0" + Mi;
        }
        if(S < 10){
          S = "0" + S;
        }
        let endTime = Y + "-" + Mo + "-" + D + " " + H + ":" + Mi + ":" + S;
        this.endRecondition = endTime;
      },
      addParts () {
        let partsInfo = {
          isFold: false,
          toggleMsg: "展开",
          selectedInstall: "未选择",
          partsImage: [],
          partsImageUrlArr: [],
          partsName: "",
          manufacturerNo: "",
          erpNo: "",
          modelNumber: "",
          specification: "",
          unit: "",
          number: "",
          installFlag: "",
          partsPrice: ""
        };
        this.partslist.push(partsInfo);
      },
      deleteParts (index) {
        this.partslist.splice(index, 1);
        this.calculateTotalCost ();
      },
      selectInstall (parts) {
        let that = this;
        let installArr = [{
          label: '是',
          value: 0
        }, {
          label: '否',
          value: 1
        }];
        weui.picker(installArr, {
          defaultValue: [0],
          onConfirm: function onConfirm(data) {
            let selectedInstall = installArr[data[0]].label;
            parts.selectedInstall = selectedInstall;
            parts.installFlag = installArr[data[0]].value;
          }
        });
      },
      showDetail (parts) {
        parts.isFold = !parts.isFold;
        if(parts.isFold){
          parts.toggleMsg = "收起";
        }else{
          parts.toggleMsg = "展开";
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .g-core-image-upload-btn{
    height: 77px;
    background: url("../assets/images/upload-device-img.png");
    background-size: cover;
  }
  .create-workorder{
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
  }
  .weui-cells{
    margin-top: 10px;
    font-size: 14px;
  }
  .color-14a{
    color: #14a5e0;
  }
  .color-ff0{
    color: #ff0000;
  }
  .device-img-list{
    /*display: none;*/
  }
  .weui-uploader__input-box{
    border: none;
  }
  .weui-uploader__input-box img,.accessory-img-list img{
    width: 100%;
  }
  .weui-uploader__input-box:before, .weui-uploader__input-box:after{
    display: none;
  }
  .weui-panel__hd{
    color: #333333;
    font-size: 14px;
  }
  .weui-panel__hd:after{
    border: none;
  }
  .breakdown-info{
    padding: 5px 15px;
    overflow: hidden;
  }
  .deal-result-info{
    padding: 5px 15px 10px 15px;
    overflow: hidden;
  }
  .weui-textarea{
    border: 1px solid #eeeeee;
    -webkit-appearance:none;
    border-radius: 6px;
    padding:5px;
    box-sizing: border-box;
  }
  .deal-result{
    padding: 15px 15px 10px 15px;
    border-top: 1px solid #eeeeee;
  }
  .weui-cell__ft{
    font-size: 12px !important;
  }
  .delete-accessory{
    background-color: #FFFFFF;
    font-size: 16px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #ff0000;
    border-top: 1px solid #eeeeee;
  }
  .add-accessory{
    background-color: #FFFFFF;
    font-size: 16px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    color: #333333;
    margin-top: 10px;
  }
  .total-cost{
    background-color: #FFFFFF;
    margin: 10px 0 35px 0;
  }
  .total-cost .weui-cell__ft{
    color: #ff0000;
  }
  .submit-workorder-btn{
    padding: 0 10px 20px 10px;
  }
  .submit-workorder-btn span{
    height: 44px;
    line-height: 44px;
    background-color: #14a5e0;
    color: #FFFFFF;
    text-align: center;
    font-size: 16px;
    border-radius: 6px;
    display: block;
  }

  .operate-info{
    height: 22px;
    line-height: 22px !important;
    font-size: 14px;
  }
  .operate-info i{
    margin-left: 5px;
    width: 17px;
    height: 17px;
    background: url("../assets/images/bazhua-icon.png") no-repeat center -633px;
    background-size: 150%;
    display: inline-block;
    vertical-align: top;
    margin-top: 2px;
  }
  .operate-info.active i{
    background-position: center -611px;
  }
  .delete-img-wrap{
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .delete-img-operate{
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    background: #FFFFFF;
  }
  .delete-img-operate span{
    display: block;
    height: 44px;
    line-height: 44px;
    border-top: 1px solid #eeeeee;
    font-size: 16px;
    color: #333333;
    text-align: center;
  }
  .upload-img{
    border: 1px solid #e6e6e6;
    width:77px;
    height:77px;
    margin-right: 15px;
    margin-bottom: 15px;
    float: left;
    position: relative;
  }
  .upload-img img{
    width: 100%;
    height: 100%;
  }
  .self-weui-cell__ft{
    width: 10px;
    height: 20px;
  }
  .self-weui-cell__ft:after {
    content: " ";
    display: inline-block;
    height: 6px;
    width: 6px;
    border-width: 2px 2px 0 0;
    border-color: #C8C8CD;
    border-style: solid;
    -webkit-transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
    position: relative;
    top: -2px;
    position: absolute;
    top: 50%;
    margin-top: -6px;
    right: 10px;
    -webkit-transform:rotate(135deg);
  }
  .weui-actionsheet{
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  .weui-actionsheet__cell{
    font-size: 14px;
    height: 42px;
    line-height: 42px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0 10px;
  }
  .weui-actionsheet__menu{
    height: 300px;
    overflow-y: scroll;
  }
  .self-weui-cell__bd{
    height: 20px;
    line-height: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .delete-btn{
    width: 22px;
    height: 22px;
    display: inline-block;
    position: absolute;
    right: -11px;
    top: -11px;
    background:#FFFFFF url("../assets/images/delete.png") no-repeat center center;
    border-radius: 50%;
    background-size: 52% 52%;
    z-index: 99;
    box-shadow: 0 5px 20px 0 rgba(0,0,0,.15);
  }
  .weui-uploader__bd{
    padding-top: 20px;
  }
  .weui-uploader__hd{
    padding-bottom: 0;
  }
</style>
