<template>
  <div class="identityLegalize">
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div class="popup" id="popup" v-show="isPopup"></div>
    <!--已认证-->
    <div v-show="idCardStatus === 0">
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>实名认证<span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="verify-name">
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">姓名：</label></div>
            <div class="weui-cell__bd">
              <input class="weui-input" placeholder="请填写真实姓名" v-model="name" type="text">
            </div>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">身份证：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入身份证号" v-model="IDCardNumber" type="number">
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access" style="border: none">
          <div class="weui-cell__bd authenticate-tit">
            <div class="fix-experience-wrap">
              <div class="fix-experience-title">维修经验：</div>
              <div class="select-fix-experience">
                <div v-on:click="selectExperienceYears">
                  <span>{{selectedYears}}</span>
                  <i>></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>资格证书<span style="font-size: 12px;color: rgb(179, 179, 179);">(最多可上传9张)</span><span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="authenticate-portrait-wrap" style="overflow: hidden;">
          <ul class="weui-uploader__files qualificationImg">
            <li class="upload-img" v-for="(qualifImg, imgIndex) in qualificationImg">
              <img v-bind:src="qualifImg" />
              <span class="delete-btn" v-on:click.stop.prevent="deleteQualificationImg(imgIndex)"></span>
            </li>
          </ul>
          <div class="authenticate-portrait-inner certificate">
            <span>点击上传图片</span>
            <div class="ID-card-item-inner-center"></div>
            <vue-core-image-upload
              class="btn btn-primary"
              :crop="false"
              :max-file-size="5242880"
              :text = "setUploadProp.txt"
              compress = "50"
              url="/other/front/uploadFile.htm"
              @imageuploaded="qualificationUploaded"
              @imagechanged="qualificationChanged"
              @imageuploading="qualificationUploading"
              @errorhandle="qualificationErrorhandle" >
            </vue-core-image-upload>
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>健康证<span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="authenticate-portrait-wrap health-certificate">
          <div class="authenticate-portrait-inner certificate" v-show="!healthCertificateImg">
            <span>点击上传图片</span>
            <div class="ID-card-item-inner-center"></div>
            <vue-core-image-upload
              class="btn btn-primary"
              :crop="false"
              :max-file-size="5242880"
              :text = "setUploadProp.txt"
              compress = "50"
              url="/other/front/uploadFile.htm"
              @imageuploaded="healthCertificateUploaded"
              @imagechanged="healthCertificateChanged"
              @imageuploading="healthCertificateUploading"
              @errorhandle="healthCertificateErrorhandle" >
            </vue-core-image-upload>
          </div>
          <div v-show="healthCertificateImg" class="authenticate-portrait-inner certificate">
            <img v-bind:src="healthCertificateImg" />
            <span class="delete-btn" v-on:click.stop.prevent="deleteHealthCertificateImg()"></span>
          </div>
          <div class="health-certificate-note">
            <p>注意：</p>
            <p>1.照片清晰可见</p>
            <p>2.请上传近期三个月内有效健康证</p>
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>服务技能<span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <ul class="service-skill-wrap">
          <li v-for="(skillDeviceType, index) in deviceTypeList" v-bind:class="{ on: skillDeviceType.selected }" v-on:click="selectSkillDevice(skillDeviceType)">
            <span>{{skillDeviceType.deviceType}}</span>
          </li>
        </ul>
      </div>
      <p class="check-note">正常审核需要1-2个工作日，如遇节假日顺延！</p>
      <div class="submit-btn-wrap" v-on:click="submitCerti()">编辑提交</div>
    </div>
    <!--认证中-->
    <div v-show="idCardStatus === 2">
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>实名认证<span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="verify-name">
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">姓名：</label></div>
            <div class="weui-cell__bd">
              <input class="weui-input" readonly="readonly" v-model="name" type="text">
            </div>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">身份证：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" readonly="readonly" v-model="IDCardNumber" type="number">
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>身份证信息<span style="font-size: 12px;color: rgb(179, 179, 179);">(必填)</span><span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="authenticate-portrait-wrap">
          <p>以下身份认证信息通过审核后不可修改。请上传真实信息，系统对没有实名认证的技工不予派单。</p>
          <ul class="ID-card-inner">
            <li class="ID-card-item-wrap ID-card-front-wrap">
              <div class="ID-card-item-inner">
                <img v-bind:src="IDFrontImg" />
              </div>
              <p>身份证正面</p>
            </li>
            <li class="ID-card-item-wrap ID-card-back-wrap">
              <div class="ID-card-item-inner">
                <img v-bind:src="IDBackImg" />
              </div>
              <p>身份证反面</p>
            </li>
            <li class="ID-card-item-wrap ID-card-front-wrap">
              <div class="ID-card-item-inner">
                <img v-bind:src="personCardImg" />
              </div>
              <p>请上传手持身份证照片</p>
            </li>
            <li class="ID-card-item-wrap ID-card-front-wrap upload-note">
              <p>注意:</p>
              <p>1.头部与身份证无重叠</p>
              <p>2.本人头像清晰</p>
              <p>3.身份证信息清晰</p>
              <p>4.请别人协助拍摄</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access" style="border: none">
          <div class="weui-cell__bd authenticate-tit">
            <div class="fix-experience-wrap">
              <div class="fix-experience-title">维修经验：</div>
              <div class="select-fix-experience">
                <div>
                  <span>{{selectedYears}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="authenticate-wrap" v-show="qualificationImg.length > 0">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>资格证书<span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="authenticate-portrait-wrap" style="overflow: hidden;">
          <ul class="weui-uploader__files qualificationImg">
            <li class="upload-img" v-for="(qualifImg, imgIndex) in qualificationImg">
              <img v-bind:src="qualifImg" />
            </li>
          </ul>
        </div>
      </div>
      <div class="authenticate-wrap" v-show="healthCertificateImg">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>健康证<span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="authenticate-portrait-wrap health-certificate">
          <div class="authenticate-portrait-inner certificate">
            <img v-bind:src="healthCertificateImg" />
          </div>
          <div class="health-certificate-note">
            <p>注意：</p>
            <p>1.照片清晰可见</p>
            <p>2.请上传近期三个月内有效健康证</p>
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>服务技能<span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <ul class="service-skill-wrap">
          <li v-for="(skillDeviceType, index) in deviceTypeList" class="on" v-if="skillDeviceType.selected">
            <span>{{skillDeviceType.deviceType}}</span>
          </li>
        </ul>
      </div>
      <p class="check-note">正常审核需要1-2个工作日，如遇节假日顺延！</p>
      <div class="submit-btn-wrap" style="background-color: #b3b3b3">认证中</div>
    </div>
    <!--未认证-->
    <div v-show="idCardStatus === 1">
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>实名认证<span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="verify-name">
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">姓名：</label></div>
            <div class="weui-cell__bd">
              <input class="weui-input" placeholder="请填写真实姓名" v-model="name" type="text">
            </div>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">身份证：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入身份证号" v-model="IDCardNumber" type="number">
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>身份证信息<span style="font-size: 12px;color: rgb(179, 179, 179);">(必填)</span><span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="authenticate-portrait-wrap">
          <p>以下身份认证信息通过审核后不可修改。请上传真实信息，系统对没有实名认证的技工不予派单。</p>
          <ul class="ID-card-inner">
            <li class="ID-card-item-wrap ID-card-front-wrap">
              <div v-show="!IDFrontImg" class="ID-card-item-inner ID-card-front">
                <div class="ID-card-item-inner-center"></div>
                <vue-core-image-upload
                  class="btn btn-primary"
                  :crop="false"
                  :max-file-size="5242880"
                  :text = "setUploadProp.txt"
                  compress = "50"
                  url="/other/front/uploadFile.htm"
                  @imageuploaded="IDFrontUploaded"
                  @imagechanged="IDFrontChanged"
                  @imageuploading="IDFrontUploading"
                  @errorhandle="IDFrontErrorhandle" >
                </vue-core-image-upload>
              </div>
              <div v-show="IDFrontImg" class="ID-card-item-inner">
                <img v-bind:src="IDFrontImg" />
                <span class="delete-btn" v-on:click.stop.prevent="deleteIDFrontImg()"></span>
              </div>
              <p>身份证正面</p>
            </li>
            <li class="ID-card-item-wrap ID-card-back-wrap">
              <div v-show="!IDBackImg" class="ID-card-item-inner ID-card-back" id="IDBack">
                <div class="ID-card-item-inner-center"></div>
                <vue-core-image-upload
                  class="btn btn-primary"
                  :crop="false"
                  :max-file-size="5242880"
                  :text = "setUploadProp.txt"
                  compress = "50"
                  url="/other/front/uploadFile.htm"
                  @imageuploaded="IDBackUploaded"
                  @imagechanged="IDBackChanged"
                  @imageuploading="IDBackUploading"
                  @errorhandle="IDBackErrorhandle" >
                </vue-core-image-upload>
              </div>
              <div v-show="IDBackImg" class="ID-card-item-inner">
                <img v-bind:src="IDBackImg" />
                <span class="delete-btn" v-on:click.stop.prevent="deleteIDBackImg()"></span>
              </div>
              <p>身份证反面</p>
            </li>
            <li class="ID-card-item-wrap ID-card-front-wrap">
              <div v-show="!personCardImg" class="ID-card-item-inner ID-card-front" id="personCard">
                <div class="ID-card-item-inner-center"></div>
                <vue-core-image-upload
                  class="btn btn-primary"
                  :crop="false"
                  :max-file-size="5242880"
                  :text = "setUploadProp.txt"
                  compress = "50"
                  url="/other/front/uploadFile.htm"
                  @imageuploaded="personCardUploaded"
                  @imagechanged="personCardChanged"
                  @imageuploading="personCardUploading"
                  @errorhandle="personCardErrorhandle" >
                </vue-core-image-upload>
              </div>
              <div v-show="personCardImg" class="ID-card-item-inner">
                <img v-bind:src="personCardImg" />
                <span class="delete-btn" v-on:click.stop.prevent="deletePersonCardImg()"></span>
              </div>
              <p>请上传手持身份证照片</p>
            </li>
            <li class="ID-card-item-wrap ID-card-front-wrap upload-note">
              <p>注意:</p>
              <p>1.头部与身份证无重叠</p>
              <p>2.本人头像清晰</p>
              <p>3.身份证信息清晰</p>
              <p>4.请别人协助拍摄</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access" style="border: none">
          <div class="weui-cell__bd authenticate-tit">
            <div class="fix-experience-wrap">
              <div class="fix-experience-title">维修经验：</div>
              <div class="select-fix-experience">
                <div v-on:click="selectExperienceYears">
                  <span>{{selectedYears}}</span>
                  <i>></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>资格证书<span style="font-size: 12px;color: rgb(179, 179, 179);">(最多可上传9张)</span><span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="authenticate-portrait-wrap" style="overflow: hidden;">
          <ul class="weui-uploader__files qualificationImg">
            <li class="upload-img" v-for="(qualifImg, imgIndex) in qualificationImg">
              <img v-bind:src="qualifImg" />
              <span class="delete-btn" v-on:click.stop.prevent="deleteQualificationImg(imgIndex)"></span>
            </li>
          </ul>
          <div class="authenticate-portrait-inner certificate">
            <span>点击上传图片</span>
            <div class="ID-card-item-inner-center"></div>
            <vue-core-image-upload
              class="btn btn-primary"
              :crop="false"
              :max-file-size="5242880"
              :text = "setUploadProp.txt"
              compress = "50"
              url="/other/front/uploadFile.htm"
              @imageuploaded="qualificationUploaded"
              @imagechanged="qualificationChanged"
              @imageuploading="qualificationUploading"
              @errorhandle="qualificationErrorhandle" >
            </vue-core-image-upload>
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>健康证<span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="authenticate-portrait-wrap health-certificate">
          <div class="authenticate-portrait-inner certificate" v-show="!healthCertificateImg">
            <span>点击上传图片</span>
            <div class="ID-card-item-inner-center"></div>
            <vue-core-image-upload
              class="btn btn-primary"
              :crop="false"
              :max-file-size="5242880"
              :text = "setUploadProp.txt"
              compress = "50"
              url="/other/front/uploadFile.htm"
              @imageuploaded="healthCertificateUploaded"
              @imagechanged="healthCertificateChanged"
              @imageuploading="healthCertificateUploading"
              @errorhandle="healthCertificateErrorhandle" >
            </vue-core-image-upload>
          </div>
          <div v-show="healthCertificateImg" class="authenticate-portrait-inner certificate">
            <img v-bind:src="healthCertificateImg" />
            <span class="delete-btn" v-on:click.stop.prevent="deleteHealthCertificateImg()"></span>
          </div>
          <div class="health-certificate-note">
            <p>注意：</p>
            <p>1.照片清晰可见</p>
            <p>2.请上传近期三个月内有效健康证</p>
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>服务技能<span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <ul class="service-skill-wrap">
          <li v-for="(skillDeviceType, index) in deviceTypeList" v-bind:class="{ on: skillDeviceType.selected }" v-on:click="selectSkillDevice(skillDeviceType)">
            <span>{{skillDeviceType.deviceType}}</span>
          </li>
        </ul>
      </div>
      <p class="check-note">正常审核需要1-2个工作日，如遇节假日顺延！</p>
      <div class="submit-btn-wrap" v-on:click="submitCerti()">提交审核</div>
    </div>
    <!--认证失败-->
    <div v-show="idCardStatus === 3">
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>实名认证<span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="verify-name">
          <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">姓名：</label></div>
            <div class="weui-cell__bd">
              <input class="weui-input" placeholder="请填写真实姓名" v-model="name" type="text">
            </div>
          </div>
        </div>
        <div class="weui-cell">
          <div class="weui-cell__hd"><label class="weui-label">身份证：</label></div>
          <div class="weui-cell__bd">
            <input class="weui-input" placeholder="请输入身份证号" v-model="IDCardNumber" type="number">
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>身份证信息<span style="font-size: 12px;color: rgb(179, 179, 179);">(必填)</span><span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="authenticate-portrait-wrap">
          <p>以下身份认证信息通过审核后不可修改。请上传真实信息，系统对没有实名认证的技工不予派单。</p>
          <ul class="ID-card-inner">
            <li class="ID-card-item-wrap ID-card-front-wrap">
              <div v-show="!IDFrontImg" class="ID-card-item-inner ID-card-front">
                <div class="ID-card-item-inner-center"></div>
                <vue-core-image-upload
                  class="btn btn-primary"
                  :crop="false"
                  :max-file-size="5242880"
                  :text = "setUploadProp.txt"
                  compress = "50"
                  url="/other/front/uploadFile.htm"
                  @imageuploaded="IDFrontUploaded"
                  @imagechanged="IDFrontChanged"
                  @imageuploading="IDFrontUploading"
                  @errorhandle="IDFrontErrorhandle" >
                </vue-core-image-upload>
              </div>
              <div v-show="IDFrontImg" class="ID-card-item-inner">
                <img v-bind:src="IDFrontImg" />
                <span class="delete-btn" v-on:click.stop.prevent="deleteIDFrontImg()"></span>
              </div>
              <p>身份证正面</p>
            </li>
            <li class="ID-card-item-wrap ID-card-back-wrap">
              <div v-show="!IDBackImg" class="ID-card-item-inner ID-card-back">
                <div class="ID-card-item-inner-center"></div>
                <vue-core-image-upload
                  class="btn btn-primary"
                  :crop="false"
                  :max-file-size="5242880"
                  :text = "setUploadProp.txt"
                  compress = "50"
                  url="/other/front/uploadFile.htm"
                  @imageuploaded="IDBackUploaded"
                  @imagechanged="IDBackChanged"
                  @imageuploading="IDBackUploading"
                  @errorhandle="IDBackErrorhandle" >
                </vue-core-image-upload>
              </div>
              <div v-show="IDBackImg" class="ID-card-item-inner">
                <img v-bind:src="IDBackImg" />
                <span class="delete-btn" v-on:click.stop.prevent="deleteIDBackImg()"></span>
              </div>
              <p>身份证反面</p>
            </li>
            <li class="ID-card-item-wrap ID-card-front-wrap">
              <div v-show="!personCardImg" class="ID-card-item-inner ID-card-front">
                <div class="ID-card-item-inner-center"></div>
                <vue-core-image-upload
                  class="btn btn-primary"
                  :crop="false"
                  :max-file-size="5242880"
                  :text = "setUploadProp.txt"
                  compress = "50"
                  url="/other/front/uploadFile.htm"
                  @imageuploaded="personCardUploaded"
                  @imagechanged="personCardChanged"
                  @imageuploading="personCardUploading"
                  @errorhandle="personCardErrorhandle" >
                </vue-core-image-upload>
              </div>
              <div v-show="personCardImg" class="ID-card-item-inner">
                <img v-bind:src="personCardImg" />
                <span class="delete-btn" v-on:click.stop.prevent="deletePersonCardImg()"></span>
              </div>
              <p>请上传手持身份证照片</p>
            </li>
            <li class="ID-card-item-wrap ID-card-front-wrap upload-note">
              <p>注意:</p>
              <p>1.头部与身份证无重叠</p>
              <p>2.本人头像清晰</p>
              <p>3.身份证信息清晰</p>
              <p>4.请别人协助拍摄</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access" style="border: none">
          <div class="weui-cell__bd authenticate-tit">
            <div class="fix-experience-wrap">
              <div class="fix-experience-title">维修经验：</div>
              <div class="select-fix-experience">
                <div v-on:click="selectExperienceYears">
                  <span>{{selectedYears}}</span>
                  <i>></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>资格证书<span style="font-size: 12px;color: rgb(179, 179, 179);">(最多可上传9张)</span><span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="authenticate-portrait-wrap" style="overflow: hidden">
          <ul class="weui-uploader__files qualificationImg">
            <li class="upload-img" v-for="(qualifImg, imgIndex) in qualificationImg">
              <img v-bind:src="qualifImg" />
              <span class="delete-btn" v-on:click.stop.prevent="deleteQualificationImg(imgIndex)"></span>
            </li>
          </ul>
          <div class="authenticate-portrait-inner certificate">
            <span>点击上传图片</span>
            <div class="ID-card-item-inner-center"></div>
            <vue-core-image-upload
              class="btn btn-primary"
              :crop="false"
              :max-file-size="5242880"
              :text = "setUploadProp.txt"
              compress = "50"
              url="/other/front/uploadFile.htm"
              @imageuploaded="qualificationUploaded"
              @imagechanged="qualificationChanged"
              @imageuploading="qualificationUploading"
              @errorhandle="qualificationErrorhandle" >
            </vue-core-image-upload>
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>健康证<span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <div class="authenticate-portrait-wrap health-certificate">
          <div class="authenticate-portrait-inner certificate" v-show="!healthCertificateImg">
            <span>点击上传图片</span>
            <div class="ID-card-item-inner-center"></div>
            <vue-core-image-upload
              class="btn btn-primary"
              :crop="false"
              :max-file-size="5242880"
              :text = "setUploadProp.txt"
              compress = "50"
              url="/other/front/uploadFile.htm"
              @imageuploaded="healthCertificateUploaded"
              @imagechanged="healthCertificateChanged"
              @imageuploading="healthCertificateUploading"
              @errorhandle="healthCertificateErrorhandle" >
            </vue-core-image-upload>
          </div>
          <div v-show="healthCertificateImg" class="authenticate-portrait-inner certificate">
            <img v-bind:src="healthCertificateImg" />
            <span class="delete-btn" v-on:click.stop.prevent="deleteHealthCertificateImg()"></span>
          </div>
          <div class="health-certificate-note">
            <p>注意：</p>
            <p>1.照片清晰可见</p>
            <p>2.请上传近期三个月内有效健康证</p>
          </div>
        </div>
      </div>
      <div class="authenticate-wrap">
        <div class="weui-cell weui-cell_access">
          <div class="weui-cell__bd authenticate-tit">
            <p>服务技能<span class="unauthenticate-tag">未认证</span></p>
          </div>
        </div>
        <ul class="service-skill-wrap">
          <li v-for="(skillDeviceType, index) in deviceTypeList" v-bind:class="{ on: skillDeviceType.selected }" v-on:click="selectSkillDevice(skillDeviceType)">
            <span>{{skillDeviceType.deviceType}}</span>
          </li>
        </ul>
      </div>
      <p class="check-note">正常审核需要1-2个工作日，如遇节假日顺延！</p>
      <div class="submit-btn-wrap" v-on:click="submitCerti()">重新提交审核</div>
    </div>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  import AppConfig from '../api/appConfig';
  import VueCoreImageUpload from 'vue-core-image-upload';
  export default {
    name: 'identityLegalize',
    data () {
      return {
        isPopup: false,
        loading: false,
        error: null,
        //v2.0
        idCardStatus: 1,//认证状态：0、已认证，1、未认证，2、认证中，3、认证失败
        technicianInfo: {},//认证信息
        deviceTypeList: [],
        setUploadProp: {
          txt: ""
        },
        selectedYears: "未选择",
        name: "",
        IDCardNumber: "",
        IDFrontImg: "",
        IDFrontImgArr: [],
        IDBackImg: "",
        IDBackImgArr: [],
        personCardImg: "",
        personCardImgArr: [],
        healthCertificateImg: "",
        healthCertificateImgArr: [],
        qualificationImg: [],
        qualificationImgArr: []
      }
    },
    created: function () {
      this.fetchData();
    },
    components: {
      'vue-core-image-upload': VueCoreImageUpload
    },
    methods: {
      fetchData () {
        let that = this;
        that.error = null;
        that.loading = true;
        $.ajax({
          type: "get",
          dataType: "json",
          url: ApiUrl.checkCenter,
          data: {
            mobile: localStorage.getItem("technicianPhone")
          },
          success: function (data) {
            that.loading = false;
            that.technicianInfo = data.technician;
            that.deviceTypeList = data.deviceTypeList;
            that.idCardStatus = that.technicianInfo.technicianCheck.idCardStatus;
            if(that.idCardStatus === 1){
              that.deviceTypeList.map(function (item, index) {
                item.selected = false;
                return item;
              });
            }else if(that.idCardStatus === 2 || that.idCardStatus === 0 || that.idCardStatus === 3){
              that.name = that.technicianInfo.name;
              that.IDCardNumber = that.technicianInfo.technicianCheck.idCardNo;
              if(that.technicianInfo.technicianCheck && that.technicianInfo.technicianCheck.healthCards){
                that.healthCertificateImg = that.technicianInfo.technicianCheck.healthCards.split(";")[0];
                that.healthCertificateImgArr.push(that.healthCertificateImg);
              }
              if(that.technicianInfo.technicianCheck && that.technicianInfo.technicianCheck.skillCertificate){
                let qualificationImg = that.technicianInfo.technicianCheck.skillCertificate.split(";");
                qualificationImg.length = qualificationImg.length - 1;
                that.qualificationImg = qualificationImg;
                that.qualificationImgArr = qualificationImg;
              }

              if(that.technicianInfo.technicianCheck && that.technicianInfo.technicianCheck.idCardFrontPhoto){
                that.IDFrontImg = that.technicianInfo.technicianCheck.idCardFrontPhoto.split(";")[0];
                that.IDFrontImgArr.push(that.IDFrontImg);
              }
              if(that.technicianInfo.technicianCheck && that.technicianInfo.technicianCheck.idCardBackPhoto){
                that.IDBackImg = that.technicianInfo.technicianCheck.idCardBackPhoto.split(";")[0];
                that.IDBackImgArr.push(that.IDBackImg);
              }
              if(that.technicianInfo.photo){
                that.personCardImg = that.technicianInfo.photo.split(";")[0];
                that.personCardImgArr.push(that.personCardImg);
              }

              if(that.technicianInfo.technicianCheck && that.technicianInfo.technicianCheck.skillDeviceType) {
                let skillDeviceTypeArr = that.technicianInfo.technicianCheck.skillDeviceType.split(",");
                that.deviceTypeList.map(function (item, index) {
                  if(skillDeviceTypeArr.indexOf(item.deviceCode) > -1){
                    item.selected = true;
                  }
                  return item;
                });
              }
              that.selectedYears = that.technicianInfo.experience + "年";
            }

          },
          error: function (err) {
            that.error = err.toString();
          }
        });
      },
      //v2.0
      selectSkillDevice (skillDeviceType) {
        this.deviceTypeList = this.deviceTypeList.map(function (item, index) {
          if (item.id == skillDeviceType.id) {
            item.selected = !item.selected;
          }
          return item;
        });
      },
      selectExperienceYears () {
          let that = this,
          experienceYearsArr = [];
        for(let i = 0; i < 20; i++){
            let obj = {
              label: i + 1 + "年",
              value: i + 1
            };
            experienceYearsArr.push(obj);
        }
        experienceYearsArr.push({
          label: "20年以上",
          value: 21
        });
        weui.picker(experienceYearsArr, {
          defaultValue: [0],
          onConfirm: function onConfirm(data) {
              let selectYearsLabel = experienceYearsArr[data[0] - 1].label;
              that.selectedYears = selectYearsLabel;
          }
        });
      },
      //身份证正面
      IDFrontUploaded(res){
        let resImgArr = res.imgPath.split(";");
        resImgArr.length = resImgArr.length - 1;
        this.IDFrontImgArr = resImgArr;
      },
      IDFrontChanged(res) {
        let URL = window.URL || window.webkitURL,
          IDFrontImg = URL.createObjectURL(res);
        this.IDFrontImg = IDFrontImg;
      },
      IDFrontUploading(res) {

      },
      IDFrontErrorhandle() {
        let that = this;
        that.isPopup = true;
        $("#popup").html("上传失败");
        setTimeout(function () {
          that.isPopup = false;
        },2000);
        return;
      },
      deleteIDFrontImg() {
        this.IDFrontImg = "";
        this.IDFrontImgArr = [];
      },
      //身份证反面
      IDBackUploaded(res){
        console.log(res);
        let resImgArr = res.imgPath.split(";");
        resImgArr.length = resImgArr.length - 1;
        this.IDBackImgArr = resImgArr;
      },
      IDBackChanged(res) {
        let URL = window.URL || window.webkitURL,
          IDBackImg = URL.createObjectURL(res);
        this.IDBackImg = IDBackImg;
      },
      IDBackUploading() {

      },
      IDBackErrorhandle: function () {
        let that = this;
        that.isPopup = true;
        $("#popup").html("上传失败");
        setTimeout(function () {
          that.isPopup = false;
        },2000);
        return;
      },
      deleteIDBackImg() {
        this.IDBackImg = "";
        this.IDBackImgArr = [];
      },
      //手持身份证
      personCardUploaded(res){
        console.log(res);
        let resImgArr = res.imgPath.split(";");
        resImgArr.length = resImgArr.length - 1;
        this.personCardImgArr = resImgArr;
      },
      personCardChanged(res) {
        let URL = window.URL || window.webkitURL,
        personCardImg = URL.createObjectURL(res);
        console.log(personCardImg);
        this.personCardImg = personCardImg;
      },
      personCardUploading() {

      },
      personCardErrorhandle() {
        let that = this;
        that.isPopup = true;
        $("#popup").html("上传失败");
        setTimeout(function () {
          that.isPopup = false;
        },2000);
        return;
      },
      deletePersonCardImg() {
        this.personCardImg = "";
        this.personCardImgArr = [];
      },
      //健康证
      healthCertificateUploaded(res){
        let resImgArr = res.imgPath.split(";");
        resImgArr.length = resImgArr.length - 1;
        this.healthCertificateImgArr = resImgArr;
      },
      healthCertificateChanged(res) {
        let URL = window.URL || window.webkitURL,
          healthCertificateImg = URL.createObjectURL(res);
        console.log(healthCertificateImg);
        this.healthCertificateImg = healthCertificateImg;
      },
      healthCertificateUploading() {

      },
      healthCertificateErrorhandle() {
        let that = this;
        that.isPopup = true;
        $("#popup").html("上传失败");
        setTimeout(function () {
          that.isPopup = false;
        },2000);
        return;
      },
      deleteHealthCertificateImg() {
        this.healthCertificateImg = "";
        this.healthCertificateImgArr = [];
      },
      //资格证书
      qualificationUploaded(res){
        let resImgArr = res.imgPath.split(";");
        resImgArr.length = resImgArr.length - 1;
        let qualificationImgLen = resImgArr.length + this.qualificationImgArr.length;
        if(qualificationImgLen < 10){
          this.qualificationImgArr = this.qualificationImgArr.concat(resImgArr);
        }
      },
      qualificationChanged(res) {
        let imgLenth = res.length;
        if(imgLenth === undefined){
          imgLenth = 1;
        }
        let URL = window.URL || window.webkitURL;
        let totalLen = this.qualificationImg.length + imgLenth;
        if(imgLenth > 1 && imgLenth < 10 && totalLen < 10){
          for(let i = 0; i < imgLenth; i++ ){
            this.qualificationImg.push(URL.createObjectURL(res[i]));
          }
        }else if(totalLen > 9){
          this.isPopup = true;
          $("#popup").html("上传图片不能超过9张");
          setTimeout(function () {
            that.isPopup = false;
          },2000);
          return;
        }else if(imgLenth == 1){
          this.qualificationImg.push(URL.createObjectURL(res));
        }
      },
      qualificationUploading() {

      },
      qualificationErrorhandle() {
        let that = this;
        that.isPopup = true;
        $("#popup").html("上传失败");
        setTimeout(function () {
          that.isPopup = false;
        },2000);
        return;
      },
      deleteQualificationImg(imgIndex) {
        this.qualificationImg.splice(imgIndex, 1);
        this.qualificationImgArr.splice(imgIndex, 1);
      },
      submitCerti() {
        let that = this;
        let name = that.name,
          IDCardNumber = that.IDCardNumber,
          IDFrontImgArr = that.IDFrontImgArr,
          IDBackImgArr = that.IDBackImgArr,
          personCardImgArr = that.personCardImgArr,
          healthCertificateImgArr = that.healthCertificateImgArr,
          qualificationImgArr = that.qualificationImgArr,
          selectedYears = that.selectedYears,
          skillDeviceTypeArr = [],
          postQualificationImgArr = [];

        //过滤掉资格证书中本地图片url
        postQualificationImgArr = qualificationImgArr.filter(function (item, index) {
          return !/blob:/.test(item);
        });

        that.deviceTypeList.forEach(function (item, index) {
          if(item.selected){
            skillDeviceTypeArr.push(item.deviceCode);
          }
        });

        //验证必填项
        if(name == ""){
          that.isPopup = true;
          $("#popup").html("姓名不能为空");
          setTimeout(function () {
            that.isPopup = false;
          },2000);
          return;
        }
        if(IDCardNumber == ""){
          that.isPopup = true;
          $("#popup").html("身份证不能为空");
          setTimeout(function () {
            that.isPopup = false;
          },2000);
          return;
        }

        //身份证号码规则
        let IDCardPattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(!IDCardPattern.test(IDCardNumber)){
          that.isPopup = true;
          $("#popup").html("身份证号码格式错误");
          setTimeout(function () {
            that.isPopup = false;
          },2000);
          return;
        }



        if(IDFrontImgArr.length == 0){
          that.isPopup = true;
          $("#popup").html("请上传身份证正面照");
          setTimeout(function () {
            that.isPopup = false;
          },2000);
          return;
        }
        if(IDBackImgArr.length == 0){
          that.isPopup = true;
          $("#popup").html("请上传背面身份证");
          setTimeout(function () {
            that.isPopup = false;
          },2000);
          return;
        }
        if(personCardImgArr.length == 0){
          that.isPopup = true;
          $("#popup").html("请上传手持照");
          setTimeout(function () {
            that.isPopup = false;
          },2000);
          return;
        }

        //封装传递的数据对象
        let authInfo = {
          mobile: localStorage.getItem("technicianPhone"),
          name: name,
          idCardNo: IDCardNumber,
          idCardFrontPhoto: IDFrontImgArr.length > 0 ? IDFrontImgArr.join(";") : "",
          idCardBackPhoto: IDBackImgArr.length > 0 ? IDBackImgArr.join(";") : "",
          photo: personCardImgArr.length > 0 ? personCardImgArr.join(";") : "",
          experience: selectedYears !== "未选择" ? selectedYears.split("年")[0] : "",
          skillCertificate: postQualificationImgArr.length > 0 ? postQualificationImgArr.join(";") + ";" : "",//多图上传
          healthCards: healthCertificateImgArr.length > 0 ? healthCertificateImgArr.join(";") : "",
          skillDeviceType: skillDeviceTypeArr.length > 0 ? skillDeviceTypeArr.join(",") : ""
        };

        //提交数据
        $.ajax({
          type : 'GET',
          dataType: "json",
          url : ApiUrl.postCheck,
          data : authInfo,
          success : function(data) {
            if (data) {
              that.isPopup = true;
              $("#popup").html("上传成功");
              setTimeout(function () {
                that.isPopup = false;
                that.$router.push('MyCenter');
              }, 2000);
            }else{
              that.isPopup = true;
              $("#popup").html("上传出错");
              setTimeout(function () {
                that.isPopup = false;
              }, 2000);
            }
          },
          error : function() {
            console.log("err");
          }
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .weui-btn_primary{
    background-color: #06a0de;
  }
  .authenticate-wrap{
    background-color: #ffffff;
    margin-bottom: 10px;
  }
  .authenticate-tit{
    font-size: 14px;
  }

  .unauthenticate-tag{
    display: inline-block;
    height: 20px;
    line-height: 20px;
    border-radius: 10px;
    border: 1px solid #e6e6e6;
    color: #cccccc;
    padding: 0 10px;
    margin-left: 5px;
    display: none;
  }

  .authenticate-wrap .weui-cell:before{
    border-top: none;
  }
  .authenticate-wrap .weui-cell{
    border-bottom: 1px solid #e5e5e5;
    padding:11px 10px;
  }
  .authenticate-portrait-wrap{
    padding: 10px;
  }
  .authenticate-portrait{
    background: #f0eff4 url("../assets/images/head_portrait.png") no-repeat center center;
  }
  .authenticate-portrait-inner{
    display: inline-block;
    width: 160px;
    height: 100px;
    border: 1px solid #b3b3b3;
    background-color: #ffffff;
    /*border-radius: 5px;*/
  }
  .authenticate-portrait-inner{
    color: #666666;
    text-align: center;
    font-size: 13px;
  }
  .authenticate-portrait-inner img{
    width: 160px;
    height: 100px;
  }
  .authenticate-portrait-inner span{
    padding-top: 60px;
    display: inline-block;
  }
  .ID-card-inner{
    overflow: hidden;
  }
  .ID-card-item-wrap{
    flex: 1;
    -webkit-flex: 1;
    -webkit-box-flex: 1;
  }
  .ID-card-item-wrap>p{
    color:#333333;
    font-size: 12px;
    padding: 8px 0;
  }
  .ID-card-front-wrap{
    padding-right: 10px;
  }
  .ID-card-back-wrap{
    padding-left: 10px;
  }
  .ID-card-item-inner,.ID-card-item-inner img{
    width: 120px;
    height: 75px;
    position: relative;
  }
  .ID-card-item-inner-center{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    /*background-color: #ffffff;*/
    /*border: 1px solid #e6e6e6;*/
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
  }
  .ID-card-item-inner-center::before,.ID-card-item-inner-center::after{
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #318af8;
  }
  .ID-card-item-inner-center::before{
    width: 1px;
    height: 20px;
  }
  .ID-card-item-inner-center::after{
    width: 20px;
    height: 1px;
  }
  .ID-card-inner li{
    float: left;
    width:50%;
    box-sizing: border-box;
    margin: 10px 0;
  }
  .ID-card-front{
    background: url("../assets/images/ID_card_front.png") no-repeat center center;
    background-size: contain;
  }
  .ID-card-back{
    background: url("../assets/images/ID_card_back.png") no-repeat center center;
    background-size: contain;
  }
  .certificate{
    background-color: #ffffff;
    position: relative;
  }
  .identityLegalize{
    padding: 10px 0;
  }
  .weui-label{
    font-size: 14px;
    color:#666666;
  }
  .weui-cell__bd,.weui-input{
    height: 22px;
    line-height: 22px;
  }
  .submit-btn-wrap{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
    height: 44px;
    line-height: 44px;
    color: #FFFFFF;
    background-color: #06a0de;
    z-index: 999;
  }
  .certificate .ID-card-item-inner-center{
    margin-top: -10px;
  }

  /*v2.0*/
  .authenticate-tit{
    padding-left: 10px;
  }
  .authenticate-tit::before {
    width: 4px;
    height: 16px;
    border-radius: 2px;
    background-color: #06a0de;
    display: inline-block;
    content: "";
    position: absolute;
    left: 7px;
    top: 15px;
  }

  .weui-input{
    font-size: 14px;
  }
  .authenticate-portrait-wrap>p{
    font-size: 12px;
    color: #333333;
    line-height: 18px;
    padding-bottom: 15px;
  }

  .upload-note>p{
    font-size: 13px;
    color: #333333;
    padding: 3px 0;
  }

  .fix-experience-wrap{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .fix-experience-title{
    width: 100px;
  }
  .select-fix-experience{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    font-size: 14px;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .select-fix-experience>div{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    border: 1px solid #e5e5e5;
    margin-right: 8px;
    color: #b8b8b8;
    padding: 0 20px 0 5px;
    font-size: 14px;
    position: relative;
  }
  .select-fix-experience>div>span{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    display:block;

  }
  .select-fix-experience>div>i{
    position: absolute;
    right: 5px;
    top: 0;
    transform: rotateZ(90deg);
  }

  .health-certificate{
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
  }
  .health-certificate-note{
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    padding-left: 20px;
  }
  .health-certificate-note p{
    font-size: 13px;
    color: #333333;
    line-height: 18px;
  }
  .service-skill-wrap{
    padding: 10px 5px;
    font-size: 0;
  }
  .service-skill-wrap li{
    width: 33.33%;
    display: inline-block;
    padding: 5px;
    box-sizing: border-box;
  }
  .service-skill-wrap li span{
    display: block;
    height: 32px;
    border: 1px solid #dcdcdc;
    border-radius: 5px;
    line-height: 30px;
    text-align: center;
    color: #666666;
    font-size: 13px;
  }
  .service-skill-wrap li.on span{
    border: 1px solid #318af8;
    color: #318af8;
  }
  .check-note{
    padding: 0 10px 60px 10px;
    font-size: 13px;
    color: #b3b3b3;
  }
  .g-core-image-upload-btn{
    width:120px !important;
    height:75px !important;
  }
  .g-core-image-upload-form{
    width:120px !important;
    height:75px !important;
  }
  .delete-btn{
    width: 22px !important;
    height: 22px !important;
    display: inline-block;
    position: absolute;
    right: -11px;
    top: -11px;
    background:#FFFFFF url("../assets/images/delete.png") no-repeat center center;
    border-radius: 50%;
    background-size: 52% 52%;
    z-index: 99;
    box-shadow: 0 5px 20px 0 rgba(0,0,0,.15);
    padding-top: 0 !important;
  }

  .certificate .g-core-image-upload-btn .g-core-image-upload-form,.certificate .g-core-image-upload-btn{
    width:160px !important;
    height:100px !important;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 100;
  }
  .qualificationImg li{
    border: 1px solid #e6e6e6;
    width: 160px;
    height: 100px;
    margin-right: 15px;
    margin-bottom: 15px;
    float: left;
    position: relative;
  }
  .qualificationImg li img{
    width: 160px;
    height: 100px;
  }






</style>
