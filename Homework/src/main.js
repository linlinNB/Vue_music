// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import Layout from './components/layout'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
/* 此处重新设置了根节点，用作专门的渲染 */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})
