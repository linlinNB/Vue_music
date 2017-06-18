<template>
  <div>
    <div class="girdlist_container">
      <!-- 此处需要进行专门的设置，要设置专门的样式 -->
      <mu-grid-list cols="4" class="gird_style">
        <mu-grid-tile v-for="(item, index) in this.Right_Card_songlist" v-bind:key="item.id">
          <!-- 此处进行过设置： 展示图片 -->
          <img v-bind:src="Right_Card_Icon[index].src"/>
          <!--<span>{{ Right_Card_Icon[index].title }}</span>-->
          <!-- 此处进行浮动层设置： 图片简介 -->
          <span slot="title">{{ item.songname }}</span>
          <!-- 此处进行浮动层设置： 歌手 -->
          <span slot="subTitle">by <b>{{item.songer}}</b></span>
          <!-- 此处进行浮动层设置; 图片的浮动按钮 -->
          <span slot="action">
          <mu-icon-button icon="add_circle" v-on:click="Add_To_Songlist(index)"/>
        </span>
        </mu-grid-tile>
      </mu-grid-list>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        Right_Card_songlist: [
          {
            src: '../../static/right_card_list/丁香花.mp3',
            songname: '丁香花',
            songer: '唐磊'
          },
          {
            src: '../../static/right_card_list/爱的勇气.mp3',
            songname: '爱的勇气',
            songer: '曲婉婷'
          },
          {
            src: '../../static/right_card_list/我是真的爱你.mp3',
            songname: '我是真的爱你',
            songer: '王杰'
          },
          {
            src: '../../static/right_card_list/时间都去哪儿了.mp3',
            songname: '时间都去哪了',
            songer: '王铮亮'
          },
          {
            src: '../../static/right_card_list/新不了情.mp3',
            songname: '新不了情',
            songer: '萧敬腾'
          },
          {
            src: '../../static/right_card_list/记事本.mp3',
            songname: '记事本',
            songer: '陈慧琳'
          },
          {
            src: '../../static/right_card_list/家.mp3',
            songname: '家',
            songer: '许巍'
          },
          {
            src: '../../static/right_card_list/Beautiful Love.mp3',
            songname: 'Beautiful Love',
            songer: '蔡健雅'
          },
          {
            src: '../../static/right_card_list/丁香花.mp3',
            songname: '丁香花',
            songer: '唐磊'
          },
          {
            src: '../../static/right_card_list/爱的勇气.mp3',
            songname: '爱的勇气',
            songer: '曲婉婷'
          },
          {
            src: '../../static/right_card_list/我是真的爱你.mp3',
            songname: '我是真的爱你',
            songer: '王杰'
          },
          {
            src: '../../static/right_card_list/时间都去哪儿了.mp3',
            songname: '时间都去哪了',
            songer: '王铮亮'
          }
        ],
        Right_Card_Icon: [
          {
            title: '第一张',
            src: require('../assets/images/1.png')
          },
          {
            title: '第二张',
            src: require('../assets/images/2.png')
          },
          {
            title: '第三张',
            src: require('../assets/images/3.png')
          },
          {
            title: '第四张',
            src: require('../assets/images/4.png')
          },
          {
            title: '第五张',
            src: require('../assets/images/1.png')
          },
          {
            title: '第六张',
            src: require('../assets/images/2.png')
          },
          {
            title: '第七张',
            src: require('../assets/images/3.png')
          },
          {
            title: '第八张',
            src: require('../assets/images/4.png')
          },
          {
            title: '第九张',
            src: require('../assets/images/1.png')
          },
          {
            title: '第十张',
            src: require('../assets/images/2.png')
          },
          {
            title: '第十一张',
            src: require('../assets/images/3.png')
          },
          {
            title: '第十二张',
            src: require('../assets/images/4.png')
          }
        ]
      }
    },
    methods: {
      Add_To_Songlist: function (index) {
        let needPushSong = [
          {
            type: 1
          },
          {
            songname: this.Right_Card_songlist[index].songname,
            songer: this.Right_Card_songlist[index].songer,
            src: this.Right_Card_songlist[index].src
          }
        ]
        console.log('获取主页的信息 ， index = ' + index)
        this.$store.dispatch('addSong', needPushSong)
      }
    }
  }
</script>

<style>
  .girdlist_container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .gird_style {
    overflow-y: auto;
  }
</style>
