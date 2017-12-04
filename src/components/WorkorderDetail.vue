<template>
  <div class="workorder-detail">
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
    <div class="popup" v-if="submitWait">正在保存中...</div>
    <div class="popup" id="popup" v-show="isPopup">{{popupMsg}}</div>
    <div class="weui-cells">
      <div class="weui-cell">
        <div class="weui-cell__bd">
          <p>订单号：{{orderInfo.orderNo}}</p>
        </div>
        <div class="weui-cell__ft color-ff0" v-if="orderInfo.orderStatus == 4">检修中</div>
        <div class="weui-cell__ft color-ff0" v-if="orderInfo.orderStatus == 5">检修中</div>
        <div class="weui-cell__ft color-ff0" v-if="orderInfo.orderStatus == 7">检修完成</div>
        <div class="weui-cell__ft color-ff0" v-if="orderInfo.orderStatus == 14">已取消</div>
        <div class="weui-cell__ft color-ff0" v-if="orderInfo.orderStatus == 16">已完成</div>
      </div>
    </div>
    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">商家名称<i class="color-ff0">*</i>：</label></div>
        <div class="weui-cell__bd self-weui-cell__bd" v-on:click="getCustomer()">{{orderInfo.shopName}}</div>
        <div class="weui-cell__ft self-weui-cell__ft"></div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">联系人：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" v-model="orderInfo.contactName" placeholder="请输入联系人" />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">联系方式：</label></div>
        <div class="weui-cell__bd">
          <input v-if="orderInfo.mobile" class="weui-input" type="text"  v-model="orderInfo.mobile" placeholder="请输入联系方式" />
          <input v-else class="weui-input" type="text"  v-model="orderInfo.phone" />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">联系地址：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text" v-model="orderInfo.address" placeholder="请输入联系地址">
        </div>
      </div>
    </div>

    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">开始检修：</label></div>
        <div class="weui-cell__bd" v-on:click="getStartTime()" v-if="orderInfo.electronOrder.startRecondition != '获取当前时间'">{{orderInfo.electronOrder.startRecondition}}</div>
        <div class="weui-cell__bd color-14a" v-on:click="getStartTime()" v-else>{{orderInfo.electronOrder.startRecondition}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">检修完成：</label></div>
        <div class="weui-cell__bd" v-if="orderInfo.electronOrder.endRecondition != '获取当前时间'" v-on:click="getEndTime()">{{orderInfo.electronOrder.endRecondition}}</div>
        <div class="weui-cell__bd color-14a" v-on:click="getEndTime()" v-else>{{orderInfo.electronOrder.endRecondition}}</div>
      </div>
    </div>

    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">服务项目：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"  v-model="orderInfo.electronOrder.serviceProject" />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">服务费用：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="number"  v-model="orderInfo.electronOrder.servicePrice" />
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
                <li class="upload-img" v-for="(deviceImageUrl, imageIndex) in orderInfo.electronOrder.deviceImageUrlArr" v-if="deviceImageUrl" >
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
                  :compress = "50"
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
          <input class="weui-input" type="text" v-model="orderInfo.electronOrder.deviceName"  />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">品牌：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"  v-model="orderInfo.electronOrder.deviceBrand" />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">型号：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"  v-model="orderInfo.electronOrder.modelNumber" />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">区域：</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" type="text"  v-model="orderInfo.electronOrder.region" />
        </div>
      </div>
      <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd">故障描述：<span style="font-size: 12px;color:#b3b3b3;">(最多可上传九张)</span></div>
        <div class="weui-panel__bd breakdown-info">
          <textarea class="weui-textarea"  rows="3" v-model="orderInfo.faultContent"></textarea>
        </div>
        <div class="weui-uploader__bd breakdown-info">
          <ul class="weui-uploader__files" id="uploaderBreakdownImg">
            <li class="upload-img" v-for="(faultImageUrl, imageIndex) in orderInfo.faultImageUrlArr" >
              <img v-bind:src="faultImageUrl"/>
              <span class="delete-btn" v-on:click.stop.prevent="deleteImg('faultImage', imageIndex)"></span>
            </li>
          </ul>
          <div class="weui-uploader__input-box">
            <vue-core-image-upload
              class="btn btn-primary"
              :crop="false"
              :max-file-size="5242880"
              :text = "setUploadProp.txt"
              :compress = "50"
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
          <textarea class="weui-textarea"  rows="3" v-model="orderInfo.electronOrder.handlingResult"></textarea>
        </div>
      </div>
    </div>

    <div class="weui-cells accessory-info-list weui-cells_form" v-for="(parts, index) in partslist">
      <div class="weui-cell accessory-name-wrap">
        <div class="weui-cell__bd">
          <p>配件{{index+1}}</p>
        </div>
        <div class="weui-cell__ft color-14a operate-info" v-bind:class="{ active: parts.isFold }" v-on:click="showDetail(parts)">{{parts.toggleMsg}}<i></i></div>
        <div class="accessory-name">{{parts.partsName}}</div>
      </div>
      <div class="accessory-info" v-if="parts.isFold">
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">配件{{index+1}}<i class="color-ff0">*</i>：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="parts.partsName" >
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">原厂代码：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="parts.manufacturerNo" >
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">物料编号：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="parts.erpNo"   />
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">配件型号：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="parts.modelNumber"  />
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">配件规格：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="parts.specification"  />
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">配件单位：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" v-model="parts.unit"  />
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">配件数量：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" type="number" v-model="parts.number" v-on:keyup="calculateTotalCost()" />
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
            <input class="weui-input" type="number" v-model="parts.partsPrice" v-on:keyup="calculateTotalCost()" />
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
                    :compress = "50"
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
      <div class="weui-cell__ft">￥：{{orderInfo.electronOrder.totalCost}}</div>
    </div>

    <div class="operate-workorder-btn" v-if="orderInfo.orderStatus == 4 || orderInfo.orderStatus == 5">
      <div>
        <span v-on:click="cancelWorkorder()" v-if="canCancelWorkorder">取消工单</span>
        <span v-else>取消工单</span>
      </div>
      <div>
        <span v-on:click="completeRepair()" v-if="canCompleteRepair">完成检修</span>
        <span v-else>完成检修</span>
      </div>
      <div>
        <span v-on:click="saveWorkorder()" v-if="canSaveWorkorder">保存工单</span>
        <span v-else>保存工单</span>
      </div>
    </div>

  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  import AppConfig from '../api/appConfig';
  import axios from 'axios';
  import VueCoreImageUpload from 'vue-core-image-upload';
  export default {
    name: 'WorkorderDetail',
    data () {
      return {
        setUploadProp: {
          txt: ""
        },
        currentPartsIndex: 0,
        showCustomer: false,
        customerList: [],
        isPopup: false,
        canSaveWorkorder: true,
        canCompleteRepair: true,
        canCancelWorkorder: true,
        submitWait: false,
        popupMsg: "",
        orderInfo: {},
        partslist: [],
        orderNo: ""
      }
    },
    created () {
      let orderNo = this.$route.params.orderNo;
      this.orderNo = orderNo;
      this.fetchData();
    },
    mounted: function () {


    },
    components: {
      'vue-core-image-upload': VueCoreImageUpload
    },
    methods: {
      deviceImageuploaded(res) {
        let resImgArr = res.imgPath.split(";");
        resImgArr.length = resImgArr.length - 1;
        this.orderInfo.electronOrder.deviceImage = this.orderInfo.electronOrder.deviceImage.filter(function(item){
          if(!/blob:/.test(item)){
            return item;
          }
        });
        let deviceImageLen = resImgArr.length + this.orderInfo.electronOrder.deviceImage.length;
        if(deviceImageLen < 10){
          this.orderInfo.electronOrder.deviceImage = this.orderInfo.electronOrder.deviceImage.concat(resImgArr);
        }
        console.log("--this.orderInfo.electronOrder.deviceImage--");
        console.log(this.orderInfo.electronOrder.deviceImage);
      },
      deviceImagechanged(res){
        let that = this;
        let imgLenth = res.length;
        if(imgLenth == undefined){
          imgLenth = 1;
        }
        let URL = window.URL || window.webkitURL;
        let totalLen = that.orderInfo.electronOrder.deviceImageUrlArr.length + imgLenth;
        if(imgLenth > 1 && imgLenth < 10 && totalLen < 10){
          for(let i = 0; i < imgLenth; i++ ){
            that.orderInfo.electronOrder.deviceImageUrlArr.push(URL.createObjectURL(res[i]));
          }
        }else if(totalLen > 9){
          this.popupMsg = "上传图片不能超过9张";
          this.showPrompt();
        }else if(imgLenth == 1){
          that.orderInfo.electronOrder.deviceImageUrlArr.push(URL.createObjectURL(res));
        }
        console.log('--that.orderInfo.electronOrder.deviceImageUrlArr--');
        console.log(that.orderInfo.electronOrder.deviceImageUrlArr);
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
        this.orderInfo.faultImage = this.orderInfo.faultImage.filter(function(item){
          if(!/blob:/.test(item)){
            return item;
          }
        });
        let faultImageLen = resImgArr.length + this.orderInfo.faultImage.length;
        if(faultImageLen < 10){
          this.orderInfo.faultImage = this.orderInfo.faultImage.concat(resImgArr);
        }
      },
      faultImagechanged(res){
        let imgLenth = res.length;
        if(imgLenth == undefined){
          imgLenth = 1;
        }
        let URL = window.URL || window.webkitURL;
        let totalLen = this.orderInfo.faultImageUrlArr.length + imgLenth;
        if(imgLenth > 1 && imgLenth < 10 && totalLen < 10){
          for(let i = 0; i < imgLenth; i++ ){
            this.orderInfo.faultImageUrlArr.push(URL.createObjectURL(res[i]));
          }
        }else if(totalLen > 9){
          this.popupMsg = "上传图片不能超过9张";
          this.showPrompt();
        }else if(imgLenth == 1){
          this.orderInfo.faultImageUrlArr.push(URL.createObjectURL(res));
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
            item.partsImage = item.partsImage.filter(function(_this){
              if(!/blob:/.test(_this)){
                return _this;
              }
            });
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
        this.orderInfo.shopName = customer.shopName;
        this.orderInfo.contactName = customer.contactName;
        this.orderInfo.mobile = customer.mobile;
        this.orderInfo.phone = customer.phone;
        this.orderInfo.address = customer.address;
        this.showCustomer = false;
      },
      deleteImg (deleteImage, imageIndex, index) {
        console.log("confirm");
        console.log(deleteImage, imageIndex, index);
        let that = this;
        switch(deleteImage)
        {
          case "deviceImage":
            that.orderInfo.electronOrder.deviceImage.splice(imageIndex, 1);
            that.orderInfo.electronOrder.deviceImageUrlArr.splice(imageIndex, 1);
            break;
          case "faultImage":
            that.orderInfo.faultImage.splice(imageIndex, 1);
            that.orderInfo.faultImageUrlArr.splice(imageIndex, 1);
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
      saveWorkorder () {
        let that = this;

        //检测商户名称
        if(that.orderInfo.shopName == ""){
          that.popupMsg = "商户名称不能为空";
          that.showPrompt ();
          return false;
        }
        //检测设备名称
        if(that.orderInfo.deviceName == ""){
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
            partsImage: item.partsImage.length > 0 ? item.partsImage.join(";")+";" : "",//配件图
            partsPrice: item.partsPrice
          };
          postPartsList.push(postPartsObj);
        });
        let technicianId = JSON.parse(localStorage.getItem("technicianInfo")).technicianId;
        //let technicianId = 68;

        if(that.orderInfo.electronOrder.startRecondition == "获取当前时间"){
          that.orderInfo.electronOrder.startRecondition = "";
        }
        if(that.orderInfo.electronOrder.endRecondition == "获取当前时间"){
          that.orderInfo.electronOrder.endRecondition = "";
        }

        let workorderObj = {
          orderInfo: {
            orderNo: that.orderInfo.orderNo,
            electronOrderId: that.orderInfo.electronOrderId,
            technicianId: technicianId,
            shopName: that.orderInfo.shopName,
            contactName: that.orderInfo.contactName,
            mobile: that.orderInfo.mobile,
            phone: that.orderInfo.phone,
            address: that.orderInfo.address,
            faultContent: that.orderInfo.faultContent,
            faultImage: that.orderInfo.faultImage.length > 0 ? that.orderInfo.faultImage.join(";") + ";" : "",//故障图
            electronOrder: {
              startRecondition: that.orderInfo.electronOrder.startRecondition,
              endRecondition: that.orderInfo.electronOrder.endRecondition,
              serviceProject: that.orderInfo.electronOrder.serviceProject,
              servicePrice: that.orderInfo.electronOrder.servicePrice,
              deviceBrand: that.orderInfo.electronOrder.deviceBrand,
              deviceName: that.orderInfo.electronOrder.deviceName,
              modelNumber: that.orderInfo.electronOrder.modelNumber,
              region: that.orderInfo.electronOrder.region,
              handlingResult: that.orderInfo.electronOrder.handlingResult,
              totalCost: that.orderInfo.electronOrder.totalCost,
              deviceImage: that.orderInfo.electronOrder.deviceImage.length > 0 ? that.orderInfo.electronOrder.deviceImage.join(";") + ";" : "",//设备图
              partsInfoJson: postPartsList
            }
          }
        };

        //暂时禁止点击
        that.canSaveWorkorder = false;
        //提交中
        that.submitWait = true;

        axios.get(ApiUrl.updateWorkOrder , {
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
              that.canSaveWorkorder = true;
              that.showPrompt ();
            }
          }else{
            that.submitWait = false;
            that.popupMsg = "提交失败";
            that.canSaveWorkorder = true;
            that.showPrompt ();
          }
        })
        .catch(function (error) {
          that.submitWait = false;
          that.popupMsg = "提交失败";
          that.canSaveWorkorder = true;
          that.showPrompt ();
        });
      },
      cancelWorkorder () {
        let that = this;
        let mobile = localStorage.getItem("technicianPhone");

        //暂时禁止点击
        that.canCancelWorkorder = false;
        axios.get(ApiUrl.updateOrderStatus , {
          params: {
            orderStatus: 14,
            orderNo: that.orderNo,
            mobile: mobile
          }
        })
        .then(function (response) {
          if(response.status == 200){
            if(response.data){
              that.popupMsg = "提交成功";
              that.showPrompt ();
              setTimeout(function () {
                that.$router.push('OverhaulOrder');
              },2000);
            }else{
              that.popupMsg = "提交失败";
              that.canCancelWorkorder = true;
              that.showPrompt ();
            }
          }else{
            that.popupMsg = "提交失败";
            that.canCancelWorkorder = true;
            that.showPrompt ();
          }
        })
        .catch(function (error) {
          that.popupMsg = "提交失败";
          that.canCancelWorkorder = true;
          that.showPrompt ();
        });
      },
      completeRepair () {
        let that = this;
        let mobile = localStorage.getItem("technicianPhone");

        //暂时禁止点击
        that.canCompleteRepair = false;
        axios.get(ApiUrl.updateOrderStatus , {
          params: {
            orderStatus: 8,
            orderNo: that.orderNo,
            mobile: mobile
          }
        })
        .then(function (response) {
          if(response.status == 200){
            if(response.data){
              that.popupMsg = "提交成功";
              that.showPrompt ();
              setTimeout(function () {
                that.$router.push('OverhaulOrder');
              },2000);
            }else{
              that.popupMsg = "提交失败";
              that.canCompleteRepair = true;
              that.showPrompt ();
            }
          }else{
            that.popupMsg = "提交失败";
            that.canCompleteRepair = true;
            that.showPrompt ();
          }
        })
        .catch(function (error) {
          that.popupMsg = "提交失败";
          that.canCompleteRepair = true;
          that.showPrompt ();
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
      calculateTotalCost () {
          console.log("in");
        let partsCost = 0;
        let servicePrice = parseFloat(this.orderInfo.electronOrder.servicePrice);
        this.partslist.forEach(function (item) {
          if(item.number && item.partsPrice){
            partsCost += parseFloat(item.number) * parseFloat(item.partsPrice);
          }
        });
        if(!servicePrice){
          servicePrice = 0;
        }
        this.orderInfo.electronOrder.totalCost = servicePrice + partsCost;
      },
      addParts () {
        let partsInfo = {
          isFold: false,
          toggleMsg: "展开",
          installFlag: "",
          manufacturerNo: "",
          modelNumber: "",
          number: "",
          partsName: "",
          partsPrice: "",
          specification: "",
          unit: "",
          erpNo: "",
          selectedInstall: "未选择",
          partsImage: [],
          partsImageUrlArr: []
        };
        this.partslist.push(partsInfo);
      },
      deleteParts (index) {
        this.partslist.splice(index, 1);
        this.calculateTotalCost ();
      },
      fetchData () {
        let that = this;
        axios.get(ApiUrl.findWorkOrderDetails , {
          params: {
            orderNo: that.orderNo
          }
        })
        .then(function (response) {
          if(response.status == 200){
            let workOrderDetails = response.data;
            //配件列表
            if(workOrderDetails.partslist.length > 0){
              workOrderDetails.partslist = workOrderDetails.partslist.map(function(item){
                let partsImage = item.partsImage;
                let partsImageArr = [];
                if(partsImage){
                  partsImageArr = partsImage.split(";");
                  partsImageArr.length = partsImageArr.length - 1;
                }
                item.partsImage = partsImageArr;
                item.partsImageUrlArr = partsImageArr;
                item.isFold = false;
                item.toggleMsg = "展开";
                if(item.installFlag == 0){
                  item.selectedInstall = "是";
                }else if(item.installFlag == 1){
                  item.selectedInstall = "否";
                }else{
                  item.selectedInstall = "未安装";
                }
                return item;
              });
              that.partslist = workOrderDetails.partslist;
              console.log(that.partslist);
            }

            //详情
            if(!workOrderDetails.orderInfo.electronOrder.startRecondition){
              workOrderDetails.orderInfo.electronOrder.startRecondition = "获取当前时间";
            }
            if(!workOrderDetails.orderInfo.electronOrder.endRecondition){
              workOrderDetails.orderInfo.electronOrder.endRecondition = "获取当前时间";
            }

            //设备图
            let deviceImageArr = [];
            let deviceImage = workOrderDetails.orderInfo.electronOrder.deviceImage;
            if(deviceImage){
              deviceImageArr = deviceImage.split(";");
              deviceImageArr.length = deviceImageArr.length - 1;
            }
            workOrderDetails.orderInfo.electronOrder.deviceImage = deviceImageArr;
            workOrderDetails.orderInfo.electronOrder.deviceImageUrlArr = deviceImageArr;
            //故障图
            let faultImage = workOrderDetails.orderInfo.faultImage;
            let faultImageArr = [];
            if(faultImage){
              faultImageArr = faultImage.split(";");
              faultImageArr.length = faultImageArr.length - 1;
            }
            workOrderDetails.orderInfo.faultImage = faultImageArr;
            workOrderDetails.orderInfo.faultImageUrlArr = faultImageArr;
            console.log("--workOrderDetails.orderInfo.faultImage--");
            console.log(workOrderDetails.orderInfo.faultImage);
            that.orderInfo = workOrderDetails.orderInfo;
            that.calculateTotalCost ();
          }else{
            that.popupMsg = "获取数据失败";
            that.showPrompt();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
        this.orderInfo.electronOrder.startRecondition = startTime;
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
        this.orderInfo.electronOrder.endRecondition = endTime;
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
  .workorder-detail{
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    padding-bottom: 25px;
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

  .accessory-name-wrap{
    position: relative;
    border-bottom: 1px solid #eeeeee;
  }
  .accessory-name{
    position: absolute;
    left: 70px;
    top: 0;
    bottom: 0;
    right: 70px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    text-align: center;
  }

  .operate-workorder-btn{
    padding-left:15px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    background-color: #FFFFFF;
    border-top: 1px solid #eeeeee;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    padding-top: 10px;
    box-sizing: border-box;
    z-index: 9999;
  }
  .operate-workorder-btn div{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding-right: 15px;
  }
  .operate-workorder-btn div span{
    display: block;
    font-size: 14px;
    color: #333333;
    border: 1px solid #666666;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
    text-align: center;
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
