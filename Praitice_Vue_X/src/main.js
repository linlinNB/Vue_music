// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Vuex from 'vuex'
import Layout from './components/layout'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(MuseUI)

const myStore = new Vuex.Store({
  state: {
    songlist: [
      {
        src: '../../static/music/1.mp3',
        songname: '卡农',
        songer: '押尾'
      },
      {
        src: '../../static/music/2.mp3',
        songname: '花水木',
        songer: '松井佑贵'
      },
      {
        src: '../../static/music/3.mp3',
        songname: '不知名歌曲：3',
        songer: '押尾光太郎'
      },
      {
        src: '../../static/music/4.mp3',
        songname: '不知名歌曲： 4',
        songer: '你猜不猜'
      },
      {
        src: '../../static/music/5.mp3',
        songname: 'Friend',
        songer: '松井佑贵'
      },
      {
        src: '../../static/music/6.mp3',
        songname: '不知名歌曲： 5',
        songer: '押尾光太郎'
      }
    ],
    lovesonglist: [
      {
        src: '../../static/music/一个人.mp3',
        songname: '一个人',
        songer: '韩红'
      },
      {
        src: '../../static/music/那片海.mp3',
        songername: '那片海',
        songer: '韩红'
      }
    ],
    local_songlist: [],
    LoginInfo: false,
    now_song_position: -1,
    isShow_TypeSonglist: 1,
    Change_Player_Music: false,
    Change_Pause_Play: true,
    isChange_Player_Music: false,
    userInfo: {
      username: ''
    }
  },
  mutations: {
    showsonglistNum (state) {
      alert(state.songlist.length)
    },
    changeNowSongPos (state, n) {
      state.now_song_position = n
      console.log('修改了现在歌曲的位置 = ' + state.now_song_position)
    },
    changeNextSongPos (state) {
      state.now_song_position++
    },
    changeProvSongPos (state) {
      state.now_song_position--
    },
    changeShowTypeSonglist (state, n) {
      state.isShow_TypeSonglist = n
      console.log('现实歌单视图，进行了事件分发，展示的歌单 = ' + n)
    },
    change_player_music (state, n) {
      if (state.now_song_position === n) {
        console.log('此时，切换了相同的歌曲')
        /* state.Change_Pause_Play = true */
        state.isChange_Player_Music = false
      } else {
        console.log('此时，切换了不同的歌曲')
        state.isChange_Player_Music = true
        /* state.Change_Pause_Play = false */
        state.now_song_position = n
        console.log('修改了现在歌曲的位置 = ' + state.now_song_position)
      }
    },
    changePausePlay (state) {
      state.Change_Pause_Play === true ? state.Change_Pause_Play = false : state.Change_Pause_Play = true
    },
    addSong (state, needPushSong) {
      /* 进行添加歌曲的操作 */
      if (needPushSong[0].type === 1) {
        state.songlist.push(needPushSong[1])
      } else if (needPushSong[0].type === 2) {
        /* 这里需要添加 "我喜爱" 的歌单 */
        console.log('响应了"我喜爱"的歌单事件，即将的进行的装在数据 = ' + needPushSong[1].songname)
        state.lovesonglist.push(needPushSong[1])
      }
    },
    addSong_Name (state, type, pushSongname, pushSonger, pushSongsrc) {
      if (type === 1) {
        console.log('我们没有响应第一个事件，所以不做任何处理')
      } else if (type === 2) {
        console.log('获取真正处理的数据  = ' + pushSongname)
        state.lovesonglist.push({pushSongname, pushSonger, pushSongsrc})
      }
    },
    deleteSong (state, type, position) {
      if (type === 1) {
        state.songlist.splice(position, 1)
      } else if (type === 2) {
        state.lovesonglist.splice(position, 1)
      }
    }
  },
  actions: {
    changeNowSongPos ({commit}, n) {
      commit('changeNowSongPos', n)
    },
    changeNextSongPos ({commit}) {
      commit('changeNextSongPos')
    },
    changeProvSongPos ({commit}) {
      commit('changeProvSongPos')
    },
    changeShowTypeSonglist ({commit}, n) {
      commit('changeShowTypeSonglist', n)
    },
    changePlayerMusic ({commit}, n) {
      commit('change_player_music', n)
    },
    changePausePlay ({commit}) {
      commit('changePausePlay')
    },
    addSong ({commit}, needPushSong) {
      commit('addSong', needPushSong)
    },
    deleteSong ({commit}, type, position) {
      commit('deleteSong', type, position)
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: myStore,
  template: '<Layout/>',
  components: {Layout}
})
