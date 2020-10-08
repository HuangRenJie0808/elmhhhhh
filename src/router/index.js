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
    path:'/index',
    name: 'Index',
    component:()=> import ("../views/index/Index.vue"), // 详情首页
      children: [
          {
            path:'shouye',
            name: 'Shouye',
            component:()=> import ("../views/index/Shouye.vue") // 详情首页的首页
          },
          {
            path:'my',
            name: 'My',
            component:()=> import ("../views/index/My.vue") // 详情首页的我的
          },
      ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]
const router = new VueRouter({
  routes
})

export default router
