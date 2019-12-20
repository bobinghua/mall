<template>
  <scroll class="cart-scroll">
    <cart-item v-for="item in goods" :good="item" :key="item.iid"></cart-item>
  </scroll>
</template>

<script>
import CartItem from "./CartItem";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "CartList",
  data() {
    return {};
  },
  props: {
    goods: {
      type: Array
    }
  },
  components: {
    CartItem,
    Scroll
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.cart-scroll {
  overflow: hidden;
}
</style>
