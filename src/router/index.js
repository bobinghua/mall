import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home/Home.vue'
import Category from 'views/category/Category'
import Cart from 'views/cart/Cart'
import Profile from 'views/profile/Profile'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/cart',
    component: Cart
  }, {
    path: '/category',
    component: Category
  }, {
    path: '/profile',
    component: Profile
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
