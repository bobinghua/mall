<template>
  <div class="cart-item">
    <div class="item-selector">
      <Check-Button @checkBtnClick="checkedChange" :checked="good.checked"></Check-Button>
    </div>
    <div class="item-left">
      <img :src="good.img" :alt="good.title" />
      <!-- <img
        src="//s11.mogucdn.com/mlcdn/55cf19/180620_7aggehi8gj7055gh77bf4hjgg390i_640x960.jpg"
        alt="2018夏装新款韩范t恤女短袖宽松百搭韩版学生半袖ins超火的上衣体侐潮"
      />-->
    </div>
    <div class="item-right">
      <h4 class="item-title">{{good.title}}</h4>
      <p class="item-desc">{{good.desc}}</p>
      <div class="item-bottom">
        <span class="item-price">￥{{good.price}}</span>
        <span class="item-count">
          <button class="cal" @click="good.count++">+</button>
          {{good.count}}
          <button class="cal" @click="sub">-</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "CartItem",
  data() {
    return {};
  },
  props: {
    good: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CheckButton
  },
  created() {},
  mounted() {},
  methods: {
    checkedChange() {
      // console.log("clickChange");
      this.good.checked = !this.good.checked;
    },
    sub() {
      this.good.count > 1 ? this.good.count-- : this.good.count;
    }
  }
};
</script>
<style scoped>
.cart-item {
  width: 100%;
  padding: 5px;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-left {
  padding: 5px;
}

.item-left img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-right {
  color: #333;
  padding: 5px;
  position: relative;
  overflow: hidden;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-title {
  font-size: 17px;
}
.item-desc {
  font-size: 14px;
  margin-top: 8px;
}
.item-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.item-price {
  color: red;
  font-weight: 650;
  float: left;
}
.item-count {
  float: right;
}
.cal {
  width: 20px;
  border-radius: 15px;
  background-color: #fff;
}
</style>
