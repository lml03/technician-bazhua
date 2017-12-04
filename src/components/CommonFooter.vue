<template>
    <ul class="weui-tabbar bg-white commonFooter">
        <li class="weui-tabbar__item" v-for="(item, index) in items">
          <router-link v-if="item.itemName != '商城'" v-bind:to="item.toPage">
            <i class="weui-tabbar__icon iconfont" v-bind:class="item.itemClass"></i>
            <p class="weui-tabbar__label">{{ item.itemName }}</p>
          </router-link>
          <a v-else href="/commodity/front/shopMallHomepage.htm#/">
            <i class="weui-tabbar__icon iconfont" v-bind:class="item.itemClass"></i>
            <p class="weui-tabbar__label">{{ item.itemName }}</p>
          </a>
        </li>
      </ul>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: 'Footer',
  data: function () {
    return {
      items: [
        { itemClass: 'icon-home_default', itemName: '首页', toPage: 'MyHome'},
        { itemClass: 'icon-mall', itemName: '商城', toPage: 'MyMall'},
        { itemClass: 'icon-wodedingdan1', itemName: '订单', toPage: 'MyOrder'},
        { itemClass: 'icon-me', itemName: '我的', toPage: 'MyCenter'}
      ]
    }
  },
  mounted: function () {
//    let curIndex = sessionStorage.getItem("curIndex");
//    $(".app").find("ul.commonFooter li").eq(curIndex).addClass("active").siblings().removeClass("active");
  },
  methods: {
//    toggleStyle (index) {
//      this.activeIndex = index;
//    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app ul.commonFooter li.active a i,.app ul.commonFooter li.active a p{
    color: #06a0de;
  }
  .weui-tabbar__icon {
    width: 24px;
    height: 24px;
    line-height: 24px;
    font-size: 22px !important;
  }
  .icon-mall{
    background: url("../assets/images/mall.png") no-repeat center center;
    background-size: cover;
  }
  i.weui-tabbar__icon, .weui-tabbar__icon > i{
    color: #cdcdcd;
  }
</style>
