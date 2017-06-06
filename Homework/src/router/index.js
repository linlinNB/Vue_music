import Vue from 'vue'
import Router from 'vue-router'

import IndexPage from '../Pages/index.vue'
import regFormRou from '../components/regForm.vue'
import logFormRou from '../components/logForm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/regFormRou',
      name: 'regFormRou',
      component: regFormRou
    },
    {
      path: '/logFormRou',
      name: 'logFormRou',
      component: logFormRou
    }
  ]
})
