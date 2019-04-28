import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/index'
    },
    {
      path: '/index',
      name: '写在前面',
      meta: { title: '写在前面' },
      component: () => import('@/views/Index')
    },
    {
      path: '/main',
      name: '主页',
      meta: { title: '主页' },
      component: () => import('@/views/Main')
    },
    {
      path: '/tags',
      name: 'tags',
      meta: { title: '标签' },
      component: () => import('@/views/Tags')
    },
    {
      path: '/other',
      name: '其他',
      meta: { title: '其他' },
      component: () => import('@/views/Other')
    },
    {
      path: '/editor',
      name: 'editor',
      meta: { title: 'Markdown编辑器' },
      component: () => import('@/views/Editor')
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('@/views/Show')
    },
    {
      path: '/_token',
      name: 'token',
      meta: { title: 'Token' },
      component: () => import('@/views/Token')
    },
    {
      path: '/error',
      name: 'error',
      meta: { title: '错误' },
      component: () => import('@/views/Error')
    }
  ]
})
