<template>
  <div class="bulletinMsg">
    <div class="loading" v-if="loading">
      Loading...
    </div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div class="bulletinDetail" v-if="getMsg">{{ post.bulletinDetail }}</div>
  </div>
</template>

<script>
  import ApiUrl from '../api/apiUrl';
  export default {
    name: 'bulletinMsg',
    data() {
      return {
        loading: false,
        post: null,
        error: null,
        getMsg: false,
        msgId: this.$route.params.msgId
      }
    },
    created () {
      this.fetchData();
    },
    methods: {
      fetchData () {
        let that = this;
        that.error = that.post = null;
        that.loading = true;
        $.ajax({
          type: "get",
          dataType: "json",
          url: ApiUrl.getBulletinDetail,
          data: {
            orderNo: that.msgId
          },
          success: function (data) {
            that.loading = false;
            if(data){
              that.getMsg = true;
              that.post = data;
            }else{
              that.error = err.toString()
            }
          },
          error: function (err) {
            that.error = err.toString();
          }
        });
      }
    }
  }
</script>
