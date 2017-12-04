<!-- The ref attr used to find the swiper instance -->
<template>
  <div class="feedback">
    <p>您的宝贵建议，是让我们追求极致服务的强大动力</p>
    <p>请输入您的建议：</p>
    <div class="weui-textarea-wrap">
      <textarea class="weui-textarea"></textarea>
    </div>
    <a href="javascript:;" class="weui-btn weui-btn_primary" @click="">提交</a>
  </div>

</template>

<script>
  export default {
    name: 'feedback',
    data() {
      return {

      }
    },
    created(){
      console.log("created");
      setTimeout(function () {
        console.log("asyn created");
      },0);
    },
    mounted(){
      console.log("mounted");
      setTimeout(function () {
        console.log("asyn mounted");
      },0);
    }
  }
</script>

<style scoped>
.feedback{
  padding: 15px 10px;
  font-size: 14px;
  color: #333333;
}
.feedback p{
  padding-bottom: 5px;
}
.weui-textarea-wrap{
  border: 1px solid #b3b3b3;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin: 10px 0 20px 0;
  background-color: #ffffff;
}
.weui-textarea{
  height: 195px;
}
</style>
