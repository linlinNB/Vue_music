// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Vuex from 'vuex'
import Layout from './components/layout'

Vue.config.productionTip = false
Vue.use(Vuex)

const myStore = new Vuex.Store({
  state: {
    songlist: [
      {
        src: '../../static/music/1.mp3',
        songname: '此处未定',
        songer: '押尾'
      },
      {
        src: '../../static/music/2.mp3',
        songname: '此处未定',
        songer: '松井佑贵'
      }
    ],
    LoginInfo: false
  },
  mutations: {
    showsonglistNum (state) {
      alert(state.songlist.length)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: myStore,
  template: '<Layout/>',
  components: { Layout },
  methods: {
    slow_down_voice: function () {
      console.log('全局按键-下')
    },
    add_to_voice: function () {
      console.log('全局按键-上')
    }
  }
})
