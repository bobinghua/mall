import BackTop from "components/content/backTop/BackTop";

// 返回顶部按钮
export const backTopMixin = {
  data() {
    return {
      backTopShow: false
    }
  },
  components: {
    BackTop
  }, methods: {
    // 返回顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0, 300);
      this.backTopShow = false;
    }
  }
}