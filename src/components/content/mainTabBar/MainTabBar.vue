<template>
  <tab-bar id="main-tab-bar">
    <tab-bar-item path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.jpg" alt="首页" />
      <img slot="item-icon-active" src="~assets/img/tabbar/active.jpg" alt="首页" />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category" activeColor="purple">
      <img slot="item-icon" src="~assets/img/tabbar/type.jpg" alt="分类" />
      <img slot="item-icon-active" src="~assets/img/tabbar/active.jpg" alt="分类" />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart" activeColor="pink">
      <img slot="item-icon" src="~assets/img/tabbar/cart.jpg" alt="购物车" />
      <img slot="item-icon-active" src="~assets/img/tabbar/active.jpg" alt="购物车" />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/profile" activeColor="blue">
      <img slot="item-icon" src="~assets/img/tabbar/me.jpg" alt="我的" />
      <img slot="item-icon-active" src="~assets/img/tabbar/active.jpg" alt="我的" />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";

export default {
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped>
#main-tab-bar {
  background-color: #fff;
  z-index: 109;
}
</style>