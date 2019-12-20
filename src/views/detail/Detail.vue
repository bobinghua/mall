<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" ref="detailNav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="scroll">
      <detail-swiper class="swiper" :banners="topImgs"></detail-swiper>
      <detail-basic-info :goods="goods" class="detail-basic-info"></detail-basic-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="goodsParam" />
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <goods ref="recommend" :goodsList="recommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top v-show="backTopShow" @click.native="backTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBasicInfo from "./childComps/DetailBasicInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailbottomBar";

import Scroll from "components/common/scroll/Scroll";
import Goods from "components/content/goods/Goods";

import { debounce } from "@/common/utils";
import { backTopMixin } from "@/common/mixins.js";

import {
  getDetail,
  getRecommend,
  GoodsInfo,
  Shop,
  GoodsParam
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBasicInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Goods,
    DetailBottomBar
  },
  data() {
    return {
      iid: null,
      topImgs: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      currentIndex: 0
    };
  },
  mixins: [backTopMixin],
  created() {
    // 从路径中取出商品的id，这里叫iid
    this.iid = this.$route.params.iid;
    // 请求数据
    getDetail(this.iid)
      .then(res => {
        console.log(res);
        const data = res.data.result;
        // 轮播图
        this.topImgs = data.itemInfo.topImages;

        // 商品信息
        this.goods = new GoodsInfo(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // console.log(this.goods);

        // 商家信息
        this.shop = new Shop(data.shopInfo);

        // 商品详情数据
        this.detailInfo = data.detailInfo;

        // 商品参数
        this.goodsParam = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );

        // 评论信息, cRate为0则表示没有数据
        this.commentInfo = data.rate.cRate !== 0 ? data.rate.list[0] : {};

        // 指定上方标题定位的锚点位置, .$nextTick这个函数是在下一帧执行回调函数
        // 但是这样有可能有些图片没加载出来，导致计算高度有问题，所以不能采用
        this.$nextTick(() => {
          this.getThemeTopY();
        });
      })
      .catch(err => {
        console.log("获取详情数据失败:" + err);
      });

    // 获取推荐数据
    getRecommend()
      .then(res => {
        console.log(res);
        this.recommend = res.data.data.list;
      })
      .catch(err => {
        console.log("获取推荐数据失败:" + err);
      });

    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);
    });
  },
  methods: {
    imgLoad() {
      // console.log("img loaded");
      this.$refs.scroll.refresh();
      // 刷新标题锚点
      this.getThemeTopY();
    },
    titleClick(index) {
      console.log(index);
      console.log(this.themeTopYs[index]);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    // 滚动监听
    scroll(position) {
      // console.log(position);
      // 每次滚到获取到滚动位置，然后和各标题锚点位置进行对比，超过哪个标题的锚点就设置为哪个标题
      // 理论上应该更严谨一些判断当前位置所在两个锚点的区间
      // 但是因为数组都是有序的遍历，所以直接判断小于也是安全的操作
      this.themeTopYs.forEach((y, index, arr) => {
        if (index !== this.currentIndex && position.y <= -y)
          this.$refs.detailNav.changeTitle(index);
      });

      // 返回顶部按钮
      this.backTopShow = -position.y > 1000;
    },
    addToCart() {
      console.log("add to Cart");
      // 把商品主要信息封装成一个对象
      const pro = {};
      pro.img = this.topImgs[0];
      pro.title = this.goods.title;
      pro.desc = this.goods.desc;
      pro.price = this.goods.realPrice;
      pro.iid = this.iid;
      console.log(pro);
      // 将商品对象添加到购物车
      // 不直接对mutation进行复杂操作,通过action间接操作mutation再操作state
      // this.$store.commit("addCart", pro);
      this.$store.dispatch("addCart", pro);
    }
  },
  mounted() {},
  updated() {}
};
</script>

<style scoped>
.swiper {
  height: 300px;
  margin: 0 10px;
}
.detail-basic-info {
  margin: 10px 10px 0;
}

#detail {
  position: relative;
  z-index: 10;
  height: 100vh;
}
.detail-nav {
  position: relative;
  background-color: #fff;
  z-index: 10;
}
.content {
  height: calc(100% - 44px);
  background-color: #fff;
  overflow: hidden;
}
</style>