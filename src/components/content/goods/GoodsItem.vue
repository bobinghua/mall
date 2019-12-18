<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImg" alt="goods" @load="imgLoad" />
    <div class="goods-info">
      <p>{{good.title}}</p>
      <span class="price">{{good.price}}</span>
      <span class="cfav">{{good.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  props: {
    good: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imgLoad() {
      // 向全局事件总线发送一个事件
      // 这里发送事件主要是告诉Home组件有一个图片完成了加载，需要刷新Scroll组件的高度
      this.$bus.$emit("itemImgLoad");
    },
    itemClick() {
      console.log("条抓");
      // 跳转到详情页
      this.$router.push("/detail/" + this.getId);
    }
  },
  computed: {
    showImg() {
      return this.good.image || this.good.show.img;
    },
    getId() {
      return this.good.iid || this.good.shop_id;
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 46%;
  margin-bottom: 10px;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  text-align: center;
  font-size: 12px;
  position: absolute;
  overflow: hidden;
  bottom: 5px;
  left: 0;
  right: 0;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .cfav {
  position: relative;
}
.goods-info .cfav::before {
  content: "";
  position: absolute;
  left: -15px;
  top: 0;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>