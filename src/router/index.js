import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'

import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/event-list',
    name: 'event-list',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/EventList.vue'),
    props: true
  },
  {
    path: '/event/:id',
    name: 'event-show',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/EventShow.vue'),
    beforeEnter(to, from, next) {
      store.dispatch('event/fetchEvent', to.params.id).then(event => {
        to.params.event = event
        next()
      })
    }
  },
  {
    path: '/event/create',
    name: 'event-create',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/EventCreate.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
