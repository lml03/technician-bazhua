<template>
  <div class="skills">
    <div class="popup" id="popup" v-show="isPopup"></div>
    <div class="weui-cells">
      <div v-for="category in categories" v-bind:class="{ 'cur': category.selected }">
        <a href="javascript:;" class="weui-cell weui-cell_access" v-on:click="category.selected = !category.selected">
          <div class="weui-cell__bd">
            <p>{{ category.name }}</p>
          </div>
          <div class="weui-cell__ft">
          </div>
        </a>
        <!--<div class="skills-list-wrap" v-show="curType == category.type">-->
          <!--<div class="skills-list-inner">-->
            <!--<ul>-->
              <!--<li v-for="subType in subTypies">-->
                <!--<a href="javascript:;" id="subType.id">{{ subType.name }}</a>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
    <div class="padding-10">
      <a href="javascript:;" class="weui-btn weui-btn_primary save-skill-btn" v-on:click="submitSkills()">提交</a>
    </div>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
export default {
  name: 'skills',
  data () {
    return {
      curType: "",
      isPopup: false,
      categories: [
        { "name": "电热设备类", "type": "c1", "selected": false},
        { "name": "燃气设备类", "type": "c2", "selected": false},
        { "name": "食品机械类", "type": "c3", "selected": false},
        { "name": "冷链设备类", "type": "c4", "selected": false},
        { "name": "洗涤设备类", "type": "c5", "selected": false},
        { "name": "抽排净化类", "type": "c6", "selected": false},
        { "name": "其他设备类", "type": "c7", "selected": false}
      ]
    }
  },
  methods: {
    submitSkills: function () {
      let selectedTypes = [],
          that = this;
      this.categories.forEach(function (item) {
        if(item.selected){
          selectedTypes.push(item.type);
        }
      });
      if(selectedTypes.length != 0){
        $.ajax({
          type: "get",
          dataType: "json",
          url: ApiUrl.updateSkillType,
          data: {
            mobile: localStorage.getItem("technicianPhone"),
            skills: selectedTypes.join(",")
          },
          success: function (data) {
            if(data){
              that.isPopup = true;
              $("#popup").html("提交成功");
              setTimeout(function () {
                that.isPopup = false;
              }, 2000);
            }else{
              that.isPopup = true;
              $("#popup").html("提交失败");
              setTimeout(function () {
                that.isPopup = false;
              }, 2000);
            }
          },
          error: function (err) {
            that.isPopup = true;
            $("#popup").html("提交失败");
            setTimeout(function () {
              that.isPopup = false;
            }, 2000);
          }
        });
      }else{
        that.isPopup = true;
        $("#popup").html("请选择技能");
        setTimeout(function () {
          that.isPopup = false;
        }, 2000);
        return;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .weui-cell_access .weui-cell__ft:after{
    transform: rotateZ(-45deg);
    display: none;
  }
  /*div.cur .weui-cell_access .weui-cell__ft:after{*/
    /*transform: rotateZ(135deg);*/
  /*}*/
  .weui-btn_primary:not(.weui-btn_disabled):active{
    background-color: #06a0de;
  }
  div.cur .weui-cell_access{
    color: #06a0de;
  }
  .save-skill-btn{
    background-color: #06a0de;
    margin-top: 20px;
  }
  .skills-list-wrap{
    padding: 10px 10px 0 10px;
  }
  .skills-list-inner{
    overflow: hidden;
  }
  .skills-list-inner ul{
    font-size: 0;
  }
  .skills-list-inner ul li{
    width: 33.33%;
    margin-bottom: 10px;
    display: inline-block;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .skills-list-inner ul li a{
    color: #656565;
    display: block;
    background: #FFF;
    border-radius: 3px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .weui-cells{
    background-color: #efeff4;
    margin-top: 0;
  }
  .weui-cell{
    background-color: #ffffff;
  }
</style>
