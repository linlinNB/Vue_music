<template>
  <mu-paper :zDepth="1" class="music-footer">
    <mu-row gutter>
      <mu-col desktop="30" tablet="30" width="30">
        <!-- 此处放置图片，点击图片设置click事件获得动画效果 -->
        <div class="img-div-style">
          <img class="img-style" src="../assets/images/1.png">
        </div>
        <!-- 此处设置自定义按钮，分别有三个按钮，分别是上一首，暂停，下一首 -->
        <div class="three-btn-parent-style">
          <!-- 此处为上一首 -->
          <div class="prev-btn-style">
            <!--<button v-on:click="change_prev_song">上一首</button>-->
            <mu-icon-button icon="skip_previous" v-on:click="change_prev_song" tooltip="上一首"
                            tooltipPosition="top-center"/>
          </div>
          <!-- 此处为暂停/开始：这里的事件设置较为复杂 -->
          <div class="start-pause-btn-style">
            <!--<button v-on:click="change_stated_pause">开始</button>-->
            <mu-icon-button v-if="this.now_play_pause === false" icon="play_arrow" v-on:click="change_stated_pause"
                            tooltip="播放"
                            tooltipPosition="top-center"/>
            <mu-icon-button v-else icon="pause" v-on:click="change_stated_pause" tooltip="播放"
                            tooltipPosition="top-center"/>
          </div>
          <!-- 此处为下一首 -->
          <div class="next-btn-style">
            <!--<button v-on:click="change_next_song">下一首</button>-->
            <mu-icon-button icon="skip_next" v-on:click="change_next_song" tooltip="下一首" tooltipPosition="top-center"/>
          </div>
        </div>
      </mu-col>
      <mu-col desktop="50" tablet="50" width="50">
        <!-- 此处设置audio标签可以设置为隐藏，我们只从audio标签中获取数据 -->
        <div class="audio-div-style">
          <!-- 此处设置了audio标签，因为后期设置的原因，样式表中修改为没有样式 -->
          <audio class="audio-style" id="myaudio" autoplay="autoplay">
            <source id="mysource" v-bind:src="audioitem.src" v-for="(audioitem, index) in this.songlist"/>
            你的浏览器GG了，就是不支持audio标签
          </audio>
          <div>
            <!-- 这里需要传递一个数值 -->
            <span class="songer-style">歌唱者:{{ this.now_song_songer }}</span>
            <span class="">歌曲名称：{{ this.now_song_songname }}</span>
            <span class="title-time-style">{{ this.now_song_currenttime }} / {{ this.now_song_totaltime }}</span>
          </div>
          <!-- 此处设置了一个自定义的滑动滚动条 -->
          <!--
          <progress class="progress-style" v-bind:value="this.myaudio.currentTime"
                    v-bind:max="this.myaudio.duration"></progress>
          -->
          <input type="range" id="myrange" v-bind:min="0" v-bind:max="this.myaudio.duration"
                 v-bind:value="this.myaudio.currentTime"
                 class="slider_range" v-on:change="change_range_position">
        </div>
      </mu-col>
      <mu-col desktop="20" tablet="50" width="50">
        <!-- 此处设置了“喜欢”按钮，我们可以设计为一个button：点击之后有不同的事件处理 -->
        <div class="three-btn-parent-right-style">
      <span class="love-btn-style">
        <mu-icon-button icon="favorite_border" tooltip="喜爱" tooltipPosition="top-center"/>
      </span>
          <span class="loop-btn-style">
            <mu-icon-button v-if="this.now_song_play_style === 1" icon="playlist_play"
                            v-on:click="change_song_play_style" v-bind:tooltip="this.now_song_play_style_name"
                            tooltipPosition="top-center"/>
            <mu-icon-button v-else-if="this.now_song_play_style === 2" icon="swap_calls"
                            v-on:click="change_song_play_style" v-bind:tooltip="this.now_song_play_style_name"
                            tooltipPosition="top-center"/>
            <mu-icon-button v-else icon="repeat_one" v-on:click="change_song_play_style"
                            v-bind:tooltip="this.now_song_play_style_name" tooltipPosition="top-center"/>
          </span>
          <span class="voice-btn-style">
            <!-- 弹出的音量控制，左右的音量图标可以自己设置 -->
            <transition name="control-voice">
          <div v-if="this.show_control_voice === true" class="voice_control_center">
            <mu-slider v-model="voice_value" :step="1" class="test_style"/>
          </div>
            </transition>
            <mu-icon v-if="this.show_control_voice === true" value="volume_down" color="" class="voice_slow_down"/>
            <mu-icon v-if="this.show_control_voice === true" value="volume_up" color="" class="voice_add_up"/>
        <mu-icon-button icon="settings_voice" v-on:click="show_song_voice" v-on:keyup.down="slow_down_voice"
                        v-on:keyup.up="add_to_voice" tooltip="声音" tooltipPosition="top-center"/>
        </span>
        </div>
      </mu-col>
    </mu-row>

  </mu-paper>
</template>

<script>
  /* 此时组件的data部分需要从右侧菜单传递过来参数，现在我们可以用虚假的数据进行模拟 */

  /*  此处有问题,这个问题就是我们需要左侧导航栏和底部音乐播放器进行组件之间的互动，组件之间是同级关系，是否采用VueX，需要慎重考虑 */
  export default{
    props: [],
    data: function () {
      return {
        songlist: [],
        now_song_position: -1,
        now_song_totaltime: '00:00:00',
        now_song_currenttime: '00:00:00',
        now_song_songname: '初始化歌曲',
        now_song_songer: '初始化歌手',
        now_song_play_style: 1,
        now_song_play_style_name: '顺序播放',
        show_control_voice: false,
        now_play_pause: true,
        myaudio: '',
        voice_value: 0
      }
    },
    watch: {
      voice_value: function () {
        console.log('放生了音量的改变 , 改变的数值大小 = ' + this.voice_value)
        this.change_song_voice()
      }
    },
    computed: {
      change_songlist: function () {
        if (this.$store.state.isShow_TypeSonglist === 1) {
          this.songlist = this.$store.state.songlist
        } else if (this.$store.state.isShow_TypeSonglist === 2) {
          this.songlist = this.$store.state.lovesonglist
        }
        return this.songlist
      }
    },
    methods: {
      change_stated_pause: function () {
        if (this.now_song_position === -1) {
          console.log('初始化my_music组件的时候没有歌曲，nowsongposition = -1')
        } else {
          if (this.$store.state.Change_Pause_Play === true) {
            this.now_play_pause = false
            this.myaudio.pause()
          } else {
            this.now_play_pause = true
            this.myaudio.play()
          }
          this.$store.dispatch('changePausePlay')
        }
      },
      change_next_song: function () {
        if (this.$store.state.songlist.length === -1) {
          console.log('my_music 组件 songlist为空')
        } else {
          if (this.$store.state.now_song_position === this.$store.state.songlist.length - 1) {
            this.$store.dispatch('changeNowSongPos', 0)
          } else {
            this.$store.dispatch('changeNextSongPos')
          }
          this.get_songlist_src()
          this.now_song_position = this.$store.state.now_song_position
          /* 设置当前播放的界面图标 */
          this.now_play_pause = true
          this.myaudio.play()
        }
      },
      change_prev_song: function () {
        if (this.songlist.length === -1) {
          console.log('my_music 组件 songlist为空')
        } else {
          if (this.$store.state.now_song_position === 0) {
            this.$store.dispatch('changeNowSongPos', this.songlist.length - 1)
          } else {
            this.$store.dispatch('changeProvSongPos')
          }
          console.log('此时组件的定位 = ' + this.$store.state.now_song_position)
          this.get_songlist_src()
          this.now_song_position = this.$store.state.now_song_position
          /* 设置当前并播放的界面图标 */
          this.now_play_pause = true
          this.myaudio.play()
        }
      },
      transformTime: function (seconds) {
        let m, s
        m = Math.floor(seconds / 60)
        m = m.toString().length === 1 ? ('0' + m) : m
        s = Math.floor(seconds - 60 * m)
        s = s.toString().length === 1 ? ('0' + s) : s
        return m + ':' + s
      },
      get_songlist_songname: function () {
        console.log('获取歌曲的名称')
        if (this.songlist[this.$store.state.now_song_position].songname === '' || this.songlist[this.$store.state.now_song_position].songname === undefined) {
          this.now_song_songname = '未知歌曲'
        } else {
          this.now_song_songname = this.songlist[this.$store.state.now_song_position].songname
        }
        console.log('获取歌曲的名称，获取完毕')
      },
      get_songlist_songer: function () {
        console.log('获取歌手的名称')
        if (this.songlist[this.$store.state.now_song_position].songer === '' || this.songlist[this.$store.state.now_song_position].songer === undefined) {
          this.now_song_songer = '未知歌手'
        } else {
          this.now_song_songer = this.songlist[this.$store.state.now_song_position].songer
        }
        console.log('获取歌手的名称，获取完毕')
      },
      get_songlist_src: function () {
        this.myaudio.src = this.songlist[this.$store.state.now_song_position].src
        console.log('获取歌曲的src地址，并且获取完毕')
      },
      change_range_position: function () {
        this.myaudio.currentTime = document.getElementById('myrange').value
      },
      change_song_play_style: function () {
        console.log('切换音乐风格')
        if (this.now_song_play_style === 3) {
          this.now_song_play_style = 1
          this.now_song_play_style_name = '顺序播放'
        } else {
          this.now_song_play_style++
          if (this.now_song_play_style === 2) {
            this.now_song_play_style_name = '随机播放'
          } else {
            this.now_song_play_style_name = '单曲播放'
          }
        }
      },
      show_song_voice: function () {
        this.show_control_voice === true ? this.show_control_voice = false : this.show_control_voice = true
        console.log('切换了show_control_voice' + this.show_control_voice)
      },
      change_song_voice: function () {
        console.log('出发了 改变声音的事件 ， 当前的数值 = ' + this.voice_value)
        /* this.myaudio.volume = parseInt(this.voice_value / 100) */
        this.myaudio.volume = parseFloat(this.voice_value / 100)
        console.log('改变的声音 = ' + parseFloat(this.voice_value / 100))
      },
      slow_down_voice: function () {
        if (this.myaudio.volume > 0) {
          this.myaudio.volume = (this.myaudio.volume * 10 - 1) / 10
        } else {
          this.myaudio.volume = 0
        }
      },
      add_to_voice: function () {
        if (this.myaudio.volume < 1) {
          this.myaudio.volume = (this.myaudio.volume * 10 + 1) / 10
        } else {
          this.myaudio.volume = 1
        }
      },
      ready_to_play: function () {
        this.get_songlist_songname()
        this.get_songlist_songer()
        this.now_song_totaltime = this.transformTime(this.myaudio.duration)
        this.now_song_currenttime = this.transformTime(this.myaudio.currentTime)
      }
    },
    created: function () {
      this.songlist = this.$store.state.songlist
      if (this.songlist.length >= 0) {
        this.$store.dispatch('changeNextSongPos')
      }
      this.now_song_position = this.$store.state.now_song_position
    },
    mounted: function () {
      this.myaudio = document.getElementById('myaudio')
      this.myaudio.volume = 0
      this.myaudio.addEventListener('play', () => {
        this.ready_to_play()
        setInterval(() => {
          /* 判断子组件是否切换了歌曲 */
          if (this.$store.state.isChange_Player_Music === true) {
            this.songlist = this.change_songlist
            this.get_songlist_src()
            this.$store.dispatch('changePlayerMusic', this.$store.state.now_song_position)
            this.now_play_pause = true
            this.myaudio.play()
          }
          /* 对于当前歌曲进行监听，比如总时间和进度时间 */
          this.now_song_totaltime = this.transformTime(this.myaudio.duration)
          this.now_song_currenttime = this.transformTime(this.myaudio.currentTime)
          /* 当歌曲播放完毕之后，设置了根据播放模式的选择进行下一首歌曲的自动播放 */
          if (this.myaudio.ended === true) {
            if (this.now_song_play_style === 2) {
              this.$store.dispatch('changeNowSongPos', parseInt(Math.floor(Math.random() * this.$store.state.songlist.length)) - 1)
            } else if (this.now_song_play_style === 3) {
              this.$store.dispatch('changeProvSongPos')
            }
            this.change_next_song()
            /* 设置当前界面播放的图标 */
            this.now_play_pause = true
            this.myaudio.play()
          }
        }, 100)
      })
    }
  }
</script>

<style scoped>

  /* 此处设置点击动画 */
  .control-voice-enter {
    transform: translateY(50px);
    opacity: 0;
  }

  .control-voice-leave {
    transform: translateY(-50px);
    opacity: 1;
  }

  .control-voice-leave-active {
    transition: 1.2s ease;
    animation: bounce-out;
    opacity: 0;
  }

  @keyframes bounce-out {
    from {
      opacity: 1;
    }
    25% {
      opacity: 0.7;
    }
    50% {
      opacity: 0.3;
    }
    to {
      opacity: 0;
    }
  }

  .control-voice-enter-active {
    transition: 1.2s ease;
    animation: bounce-in;
  }

  @keyframes bounce-in {
    from {
      opacity: 0;
    }
    25% {
      opacity: 0;
    }
    50% {
      opacity: 0.5;
    }
    to {
      opacity: 1;
    }
  }

  .voice_slow_down {
    position: fixed;
    left: 85%;
    top: 88%;
  }

  .voice_add_up {
    position: fixed;
    left: 98%;
    top: 88%;
  }

  .voice_control_center {
    position: fixed;
    left: 87%;
    top: 88%;
  }

  .test_style {
    width: 200px;
  }

  .music-footer {
    width: 100%;
    display: inline-block;
    height: 80px;
  }

  /*开始设置音乐播放器组件的特殊样式，自己也算是学习一些真正的css
      过程步骤：
      1.去除原来的样式
      2.给滑动轨道(track)添加样式
 */
  .slider_range { /*设置滑块下面那条线的样式*/
    outline: none; /*去掉点击时出现的外边框*/
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none; /*这三个是去掉那条线原有的默认样式，划重点！！*/
    width: 100%;
    height: 10%;
    background: orange;
    margin-top: 30px;
    /*这三个是设置滑块下面那条线的样式*/
  }

  input[type="range"]::-webkit-slider-thumb {
    /*::-webkit-slider-thumb是代表给滑块的样式进行变更*/
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none; /*//这三个是去掉滑块原有的默认样式，划重点！！*/
    -webkit-box-shadow: 0 0 2px; /*设置滑块的阴影*/
    border-radius: 50%;
    width: 13px;
    height: 13px;
    background: blue;
    /*background: url("images/js2-d_03.png");*/
    background-size: cover;
  }

  .three-btn-parent-right-style {
    margin-right: 10px;
    margin-left: 10px;
    padding-top: 30px;
  }

  .love-btn-style {
    float: left;
    width: 30%;
  }

  .loop-btn-style {
    float: left;
    width: 30%;
  }

  .voice-btn-style {
    width: 30%;
  }

  .title-time-style {
    float: right;
  }

  .songer-style {
    float: left;
  }

  .three-btn-parent-style {
    display: inline-block;
    vertical-align: top;
    margin-top: 20px;
    margin-left: 10px;
  }

  .prev-btn-style {
    float: left;
    width: 30%;
  }

  .next-btn-style {
    float: left;
    width: 30%;
  }

  .start-pause-btn-style {
    float: left;
    width: 30%;
  }

  .img-div-style {
    display: inline-block;
    vertical-align: top;
    margin-top: 13px;
  }

  .img-style {
    float: left;
    height: 60px;
    width: 60px;
  }

  .audio-div-style {
    margin-top: 20px;
    height: 40px;
    width: 100%;
  }

  .audio-style {
  }
</style>
