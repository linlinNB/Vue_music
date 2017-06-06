import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../Pages/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: IndexPage
    }
  ]
})
