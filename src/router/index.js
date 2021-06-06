/* import { createRouter, createWebHashHistory } from 'vue-router'
import App from '../App.vue'
import Detail from '../components/Details.vue'

const routes = [
  {
    path: '/',
    name: 'App',
    component: App
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail
  }, {
    path: '/detail',
    name: 'Detail',
    component: Detail
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router */

import App from '../App.vue'
import Detail from '../components/Details.vue'
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [
      //Download page
      {
        path: '/',
        name: 'App',
        component: App
      },
      {
        path: '/detail/:photoId',
        name: 'Detail',
        component: Detail
      }
    ]
  })