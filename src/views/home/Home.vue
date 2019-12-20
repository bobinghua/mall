<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物首页</div>
    </nav-bar>
    <tab-control
      @tabClick="tabClick"
      class="tab-control"
      :titles="titles"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="scroll-content"
      ref="scroll"
      :probe-type="3"
      :pullUpLoad="true"
      @scroll="scroll"
      @pullingUp="pullingUp"
    >
      <home-swiper :banners="banners" @imgLoad="swiperImgLoad"></home-swiper>
      <home-recommends :recommends="recommends"></home-recommends>
      <home-feature></home-feature>
      <tab-control @tabClick="tabClick" class="tab-control" :titles="titles" ref="tabControl2"></tab-control>
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

import { getHomeMultidata, getHomeGoods } from "network/home.js";
import { backTopMixin } from "@/common/mixins.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommends,
    HomeFeature,
    TabControl,
    Goods,
    Scroll
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
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },
  mixins: [backTopMixin],
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 滚动监听
    scroll(position) {
      // console.log(position);
      // console.log(position.y);
      // console.log(this.backTopShow);
      // 返回顶部按钮
      this.backTopShow = -position.y > 1000;

      // 滚动时tabcontrol吸顶监听
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    pullingUp() {
      console.log("pullingUp");
      // 加载数据
      console.log(this.currentType);
      this.getHomeGoodsData(this.currentType);
    },

    // 轮播图图片加载监听
    swiperImgLoad() {
      // 给tabcontrol的tabOffsetTop赋值
      // 组件.$el，获取组件的元素对象，dom
      console.log(this.$refs.tabControl2.$el.offsetTop);
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  updated() {},
  mounted() {
    // 最好在组件创建完毕就开始监听图片列表加载的事件，在created中有可能组件还没挂载完毕
    // 所以在mounted中写监听
    this.$bus.$on("itemImgLoad", () => {
      // 重新计算高度
      this.$refs.scroll.refresh();
    });
  },
  activated() {
    // 组件重新活跃之后定位当前浏览位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 定位完刷新
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 组件不处于活跃状态保存当前位置
    this.saveY = this.$refs.scroll.getScrollY();
  },
  destroyed() {
    console.log("d");
  }
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
  position: relative;
  z-index: 9;
}

.scroll-content {
  /* margin-top: 44px; */
  height: calc(100% - 93px); /* -93px */
  overflow: hidden;
}
</style>