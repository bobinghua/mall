<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bscroll: null
    };
  },
  components: {
    BScroll
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.bscroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.bscroll.finishPullUp();
    }
  },
  mounted() {
    this.bscroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType, // 1，2不监听滑动事件，2监听，3失去焦点仍然监听
      pullUpLoad: this.pullUpLoad, // 上拉加载
      click: true // 放在容器中的元素的点击事件必须加上这个属性才能触发
    });
    this.bscroll.on("scroll", position => {
      this.$emit("scroll", position);
      // if (this.scroll) this.scroll(position);
    });
    this.bscroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  }
};
</script>

<style>
</style>