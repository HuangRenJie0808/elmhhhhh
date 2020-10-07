import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/login',
    name: 'Login',
    component:()=> import ("../views/Login.vue") // 登录页面
  },
  {
    path:'/about',
    name: 'About',
    component:()=> import ("../views/About.vue") // 成功页
  },
  {
    path:'/detail',
    name: 'Detail',
    component:()=> import ("../views/Detail.vue") // 详情页
  },
  {
    path: '/:id',
    name: 'Home',
    component: Home
  },
]
const router = new VueRouter({
  routes
})

export default router
