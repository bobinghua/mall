<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper class="swiper" :banners="topImgs"></detail-swiper>
      <detail-basic-info :goods="goods" class="detail-basic-info"></detail-basic-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :paramInfo="goodsParam" />
      <detail-comment-info :commentInfo="commentInfo" />
      <goods :goodsList="recommend" />
    </scroll>
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

import Scroll from "components/common/scroll/Scroll";

import Goods from "components/content/goods/Goods";

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
    Goods
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
      recommend: []
    };
  },
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
  },
  methods: {
    imgLoad() {
      // console.log("img loaded");
      this.$refs.scroll.refresh();
    }
  }
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
}
</style>