<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">
        <span v-if="count === 0">购物车</span>
        <span v-else>购物车({{count}})</span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "CartNavBar",
  components: {
    NavBar
  },
  props: {
    count: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>