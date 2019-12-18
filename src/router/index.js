import Vue from 'vue'
import Router from 'vue-router'
import Home from 'views/home/Home.vue'
import Category from 'views/category/Category'
import Cart from 'views/cart/Cart'
import Profile from 'views/profile/Profile'
import Detail from 'views/detail/Detail'
// const Detail = () => import('views/detail/Detail')

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
  }, {
    path: '/detail/:iid',
    component: Detail
  }
]

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
