<template>
  <div id="app">
    <div id="nav">
      <main-tab-bar></main-tab-bar>
    </div>
    <router-view />
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar.vue";

export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import "assets/css/base.css";
</style>
