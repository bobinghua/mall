<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in titles"
          class="title-item"
          :class="{active:currentType === index}"
          @click="itemClick(index)"
          :key="item"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentType: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentType = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      console.log("back");
      this.$router.back();
    },
    changeTitle(index) {
      this.currentType = index;
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title .title-item {
  flex: 1;
}
.active {
  color: pink;
}
.back img {
  height: 15px;
  margin-top: 12px;
}
</style>