<template>
  <div class="cart">
    <cart-nav-bar :count="cartsCount" />
    <cart-list class="cart-list" :goods="carts"></cart-list>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import CartNavBar from "./childComps/CartNavBar";
import CartList from "./childComps/CartList";
import BottomBar from "./childComps/BottomBar";

export default {
  name: "Cart",
  data() {
    return {
      goods: []
    };
  },
  components: {
    CartNavBar,
    CartList,
    BottomBar
  },
  computed: {
    cartsCount() {
      let count = this.$store.getters.getCarts.length;
      return count;
    },
    carts() {
      return this.$store.getters.getCarts;
    }
  },
  created() {
    this.goods = this.$store.state.carts;
  },
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.cart {
  height: 100vh;
}
.cart-list {
  position: absolute;
  top: 44px;
  bottom: 49px;
  width: 100%;
}
</style>
