webpackJsonp([29],{166:function(e,t,n){"use strict";var i={orderMessage:"/technician/front/orderMessage.htm",findOrderList:"/technician/front/findOrderList.htm",findOrderBasicInfo:"/order/front/findOrderBasicInfo.htm",updateOrderStatus:"/technician/front/updateOrderStatus.htm",mobileCheck:"/technician/front/mobileCheck.htm",getVerifyCode:"/technician/front/getVerifyCode.htm",checkCenter:"/technician/front/checkCenter.htm",postCheck:"/technician/front/postCheck.htm",findOrderRecordDetail:"/order/front/findOrderRecordDetail.htm",signTechnician:"/technician/front/signTechnician.htm",personalCenter:"/technician/front/personalCenter.htm",updateTechnicianCoord:"/technician/front/updateCoord.htm",actionState:"/technician/front/actionState.htm",updateCoord:"/technician/front/updateCoord.htm",updateSkillType:"/technician/front/updateSkillType.htm",getJsapiTicket:"/other/front/getJsapiTicket.htm",updateOrderPrice:"/order/front/updateOrderPrice.htm",findCustomerInfoId:"/customer/front/findCustomerInfoId.htm",findCustomerInfo:"/technician/front/findCustomerInfo.htm",addCorrelationTechnician:"/customer/front/addCorrelationTechnician.htm",findPayBilldetails:"/technician/front/findPayBilldetails.htm",findPayBillInfo:"/pay/front/findPayBillInfo.htm",addUserLoginInfo:"/userLogin/front/addUserLoginInfo.htm",getOpenid:"/wxPay/front/getOpenid.htm",myInfo:"/technician/front/myInfo.htm",technicianInfo:"/technician/front/myInfo.htm",customerInfo:"/customer/front/myInfo.htm",findServeInfo:"/quoteServe/front/findServeInfo.htm",findServeDetails:"/quoteServe/front/findServeDetails.htm",findDeviceTypeBasics:"/quoteServe/front/findDeviceTypeBasics.htm",findBrandBasics:"/quoteServe/front/findBrandBasics.htm",findPartsInfo:"/quoteParts/front/findPartsInfo.htm",findPartsDetails:"/quoteParts/front/findPartsDetails.htm",inviteCodeCreate:"/technician/front/inviteCodeCreate.htm",saveTechnicianAddress:"/technician/front/saveTechnicianAddress.htm",findWorkOrders:"/technician/front/findWorkOrders.htm",findWorkOrderDetails:"/technician/front/findWorkOrderDetails.htm",addWorkOrder:"/technician/front/addWorkOrder.htm",updateWorkOrder:"/technician/front/updateWorkOrder.htm",findIndentureCust:"/technician/front/findIndentureCust.htm",uploadFile:"/other/front/uploadFile.htm"};t.a=i},249:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(166);t.default={name:"authenticate",data:function(){return{isPopup:!1,mobilePhone:"",verifyCode:""}},methods:{goHomePage:function(){var e=this,t=e.mobilePhone,n=e.verifyCode,o=/^1\d{10}$/;return""==t?(e.isPopup=!0,$("#popup").html("手机号不能为空"),void setTimeout(function(){e.isPopup=!1},2e3)):o.test(t)?""==n?(e.isPopup=!0,$("#popup").html("验证码不能为空"),void setTimeout(function(){e.isPopup=!1},2e3)):void $.ajax({type:"get",dataType:"json",url:i.a.mobileCheck,data:{mobile:t,verifyCode:n,onLineStatus:1},success:function(n){n?(localStorage.setItem("stopOrder","true"),localStorage.setItem("technicianPhone",t),e.$router.push({path:"MyHome"})):(e.isPopup=!0,$("#popup").html("提交失败"),setTimeout(function(){e.isPopup=!1},2e3))},error:function(t){e.isPopup=!0,$("#popup").html("提交失败"),setTimeout(function(){e.isPopup=!1},2e3)}}):(e.isPopup=!0,$("#popup").html("手机号格式错误"),void setTimeout(function(){e.isPopup=!1},2e3))},getVerifyCode:function(){var e=this,t=e.mobilePhone,n=/^1\d{10}$/;if(""==t)return e.isPopup=!0,$("#popup").html("手机号不能为空"),void setTimeout(function(){e.isPopup=!1},2e3);if(!n.test(t))return e.isPopup=!0,$("#popup").html("手机号格式错误"),void setTimeout(function(){e.isPopup=!1},2e3);var o=$.fn.cookie("openid");$.ajax({type:"get",dataType:"json",url:i.a.getVerifyCode,data:{mobile:e.mobilePhone,openid:o},success:function(t){if(t){var n=$("#weui-vcode-btn"),i=59;n.attr("disabled","disabled"),n.html(i+"s");var o=setInterval(function(){i>0?(i--,n.html(i+"s")):(n.html("获取验证码"),n.removeAttr("disabled"),clearInterval(o))},1e3)}else e.isPopup=!0,$("#popup").html("获取验证码失败"),setTimeout(function(){e.isPopup=!1},2e3)},error:function(t){e.isPopup=!0,$("#popup").html("获取验证码失败"),setTimeout(function(){e.isPopup=!1},2e3)}})},changeBtn:function(){""!=$.trim($("#mobilePhone").val())&&($("#submit-btn").removeAttr("disabled"),$("#submit-btn").css({"background-color":"#06a0de",color:"#ffffff"}))}}}},285:function(e,t,n){t=e.exports=n(164)(!0),t.push([e.i,".authenticate[data-v-0af73910]{position:absolute;left:0;top:0;right:0;bottom:0}.vertify-msg[data-v-0af73910]{padding:20px 0;color:#333;text-align:center}.agreement-msg[data-v-0af73910]{position:absolute;bottom:25px;left:10px;right:10px;font-size:12px;text-align:center;z-index:100}.bottom-btn[data-v-0af73910]{position:absolute;left:10px;right:10px;bottom:27px}.agreement-link[data-v-0af73910]{text-decoration:underline;padding:10px 0}.agreement-link a[data-v-0af73910],.weui-vcode-btn[data-v-0af73910]{color:#06a0de}.weui-cells[data-v-0af73910]{margin-top:0}.weui-input[data-v-0af73910],.weui-vcode-btn[data-v-0af73910]{font-size:13px}.weui-btn[data-v-0af73910]{height:44px}","",{version:3,sources:["E:/technician-bazhua/src/components/Authenticate.vue"],names:[],mappings:"AACA,+BACE,kBAAmB,AACnB,OAAQ,AACR,MAAO,AACP,QAAS,AACT,QAAU,CACX,AACD,8BACE,eAAgB,AAChB,WAAe,AACf,iBAAmB,CACpB,AACD,gCACE,kBAAmB,AACnB,YAAa,AACb,UAAW,AACX,WAAY,AACZ,eAAgB,AAChB,kBAAmB,AACnB,WAAa,CACd,AACD,6BACE,kBAAmB,AACnB,UAAW,AACX,WAAY,AACZ,WAAa,CACd,AACD,iCACE,0BAA2B,AAC3B,cAAgB,CACjB,AACD,oEACE,aAAe,CAChB,AACD,6BACE,YAAc,CACf,AACD,8DACE,cAAgB,CACjB,AACD,2BACE,WAAa,CACd",file:"Authenticate.vue",sourcesContent:["\n.authenticate[data-v-0af73910]{\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\n.vertify-msg[data-v-0af73910]{\n  padding: 20px 0;\n  color: #333333;\n  text-align: center;\n}\n.agreement-msg[data-v-0af73910]{\n  position: absolute;\n  bottom: 25px;\n  left: 10px;\n  right: 10px;\n  font-size: 12px;\n  text-align: center;\n  z-index: 100;\n}\n.bottom-btn[data-v-0af73910]{\n  position: absolute;\n  left: 10px;\n  right: 10px;\n  bottom: 27px;\n}\n.agreement-link[data-v-0af73910]{\n  text-decoration: underline;\n  padding: 10px 0;\n}\n.agreement-link a[data-v-0af73910],.weui-vcode-btn[data-v-0af73910]{\n  color: #06a0de;\n}\n.weui-cells[data-v-0af73910]{\n  margin-top: 0;\n}\n.weui-input[data-v-0af73910],.weui-vcode-btn[data-v-0af73910]{\n  font-size: 13px;\n}\n.weui-btn[data-v-0af73910]{\n  height: 44px;\n}\n"],sourceRoot:""}])},325:function(e,t,n){var i=n(285);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(165)("1f11ba8a",i,!0)},379:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"authenticate"},[n("div",{directives:[{name:"show",rawName:"v-show",value:e.isPopup,expression:"isPopup"}],staticClass:"popup",attrs:{id:"popup"}}),e._v(" "),n("p",{staticClass:"vertify-msg"},[e._v("请输入您的手机号，点击获取验证码")]),e._v(" "),n("div",{staticClass:"weui-cells weui-cells_form"},[n("div",{staticClass:"weui-cell"},[e._m(0),e._v(" "),n("div",{staticClass:"weui-cell__bd"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.mobilePhone,expression:"mobilePhone"}],staticClass:"weui-input",attrs:{type:"tel",id:"mobilePhone",placeholder:"请填写您的手机号"},domProps:{value:e.mobilePhone},on:{keyup:e.changeBtn,input:function(t){t.target.composing||(e.mobilePhone=t.target.value)}}})])]),e._v(" "),n("div",{staticClass:"weui-cell weui-cell_vcode"},[e._m(1),e._v(" "),n("div",{staticClass:"weui-cell__bd"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.verifyCode,expression:"verifyCode"}],staticClass:"weui-input",attrs:{id:"verifyCode",type:"number",placeholder:"请输入验证码"},domProps:{value:e.verifyCode},on:{input:function(t){t.target.composing||(e.verifyCode=t.target.value)},blur:function(t){e.$forceUpdate()}}})]),e._v(" "),n("div",{staticClass:"weui-cell__ft"},[n("button",{staticClass:"weui-vcode-btn",attrs:{id:"weui-vcode-btn"},on:{click:function(t){t.stopPropagation(),t.preventDefault(),e.getVerifyCode(t)}}},[e._v("获取验证码")])])])]),e._v(" "),n("div",{staticClass:"weui-btn-area"},[n("button",{staticClass:"weui-btn weui-btn-disabled",attrs:{disabled:"disabled",id:"submit-btn",href:"javascript:"},on:{click:function(t){e.goHomePage()}}},[e._v("提交")])]),e._v(" "),n("div",{staticClass:"agreement-msg"},[n("p",[e._v("轻触上面的“提交”按钮，即表示您同意")]),e._v(" "),n("p",{staticClass:"theme-color agreement-link"},[n("router-link",{attrs:{to:"Agreement"}},[e._v("《八爪-技师端用户协议》")])],1)])])},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"weui-cell__hd"},[n("label",{staticClass:"weui-label"},[e._v("手机号")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"weui-cell__hd"},[n("label",{staticClass:"weui-label"},[e._v("验证码")])])}]}},76:function(e,t,n){n(325);var i=n(64)(n(249),n(379),"data-v-0af73910",null);e.exports=i.exports}});
//# sourceMappingURL=29.f88044fa73b922892274.js.map