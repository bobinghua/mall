<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物首页</div>
    </nav-bar>
    <scroll
      class="scroll-content"
      ref="scroll"
      :probe-type="3"
      :pullUpLoad="true"
      @scroll="scroll"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners"></home-swiper>
      <home-recommends :recommends="recommends"></home-recommends>
      <home-feature></home-feature>
      <tab-control @tabClick="tabClick" class="tab-control" :titles="titles"></tab-control>
      <goods :goodsList="showGoods"></goods>
    </scroll>
    <back-top v-show="backTopShow" @click.native="backTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommends from "./childComps/HomeRecommends";
import HomeFeature from "./childComps/HomeFeature";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl";
import Goods from "components/content/goods/Goods";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommends,
    HomeFeature,
    TabControl,
    Goods,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners: [],
      recommends: [],
      titles: ["流行", "新品", "精选"],
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentType: "pop",
      backTopShow: false
    };
  },
  created() {
    // 请求多个数据
    getHomeMultidata()
      .then(res => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
      .catch(err => {
        console.log("getHomeMultidata err!");
      });

    // 获取首页下方商品列表的方法
    Object.keys(this.goods).forEach(key => {
      this.getHomeGoodsData(key);
    });
  },
  methods: {
    // 获取首页下方商品列表的方法
    getHomeGoodsData(type) {
      const page = this.goods[type].page + 1;
      console.log(type, page);
      getHomeGoods(type, page)
        .then(res => {
          this.goods[type].list.push(...res.data.data.list);
          this.goods[type].page += 1;
          console.log(res);
          // 清除上拉加载
          this.$refs.scroll.finishPullUp();
        })
        .catch(err => {
          console.log("getHomeGoods err type:" + type + ", page:" + page);
        });
    },

    // 事件监听方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    // 返回顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
      this.backTopShow = false;
    },
    scroll(position) {
      // console.log(position);
      // console.log(position.y);
      // console.log(this.backTopShow);
      this.backTopShow = -position.y > 1000;
    },
    pullingUp() {
      console.log("pullingUp");
      // 加载数据
      console.log(this.currentType);
      this.getHomeGoodsData(this.currentType);
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  updated() {}
};
</script>

<style>
#home {
  /* margin-top: 44px; */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  z-index: 19;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
.scroll-content {
  /* margin-top: 44px; */
  height: calc(100% - 93px); /* -93px */
  overflow: hidden;
}
</style>