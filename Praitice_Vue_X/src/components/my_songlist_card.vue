<template>
  <mu-paper :zDepth="1">
    <mu-card class="my_card_paper_style">
      <!--<mu-card-header title="Myron Avatar" subTitle="sub title">
      </mu-card-header>-->
      <mu-card-media v-bind:title="this.songlist_card_name[this.$store.state.isShow_TypeSonglist - 1].name"
                     v-bind:subTitle="this.songlist_card_name[this.$store.state.isShow_TypeSonglist - 1].subtitle">
        <img v-bind:src="this.srclist[this.$store.state.isShow_TypeSonglist - 1].src" class="my_card_photo_style">
      </mu-card-media>
      <mu-card-actions>
        <mu-flat-button label="历史"/>
        <mu-flat-button label="歌手"/>
        <mu-flat-button label="批量操作"/>
      </mu-card-actions>
      <!-- 此处设置表单内容 -->
      <div class="demo-infinite-container" ref="songlistscroll">
        <mu-list class="list">
          <template v-for="(item, index) in songlist">
            <mu-list-item v-bind:title="item.songname" v-bind:describeText="item.songer"
                          toggleNested disabled disableRipple>
              <mu-list-item slot="left" tooltip="播放" disabled>
                <mu-icon-button icon="play_circle_outline" v-on:click="change_song(index)"/>
              </mu-list-item>
              <mu-list-item title="添加" slot="nested" inset>
                <mu-avatar icon="add_circle_outline" slot="leftAvatar"/>
              </mu-list-item>
              <mu-list-item title="下载" slot="nested" inset>
                <mu-avatar icon="file_download" slot="leftAvatar"/>
              </mu-list-item>
              <mu-list-item title="删除" slot="nested" inset>
                <mu-avatar icon="delete_forever" slot="leftAvatar"/>
              </mu-list-item>
            </mu-list-item>
            <mu-divider/>
          </template>
          <mu-infinite-scroll v-bind:scroller="scroller" v-bind:loading="loading" v-on:load="loadMore"
                              loadingText="加载ing"/>
        </mu-list>
      </div>
    </mu-card>
  </mu-paper>
</template>

<script>
  export default{
    data: function () {
      return {
        srclist: [
          {src: require('../assets/my_card_photo/my_card_1.jpg')},
          {src: require('../assets/my_card_photo/my_card_2.jpg')},
          {src: require('../assets/my_card_photo/my_card_3.jpg')}
        ],
        num: 0,
        loading: false,
        scroller: null,
        songlist_card_name: [
          {
            name: '试听列表',
            subtitle: '不要忘记收藏哦'
          },
          {
            name: '我喜欢',
            subtitle: '分享给自己的美好时光'
          },
          {
            name: '本地歌曲',
            subtitle: '在本地留下了什么~~~~'
          }
        ],
        songlist_card_subtitle: '默认的副标题',
        songlist_card_photo: '../assets/my_card_photo/my_card_1.jpg'
      }
    },
    created () {
      this.songlist = this.$store.state.songlist
      this.num = this.songlist.length
    },
    mounted () {
      this.scroller = this.$refs.songlistscroll
    },
    methods: {
      loadMore: function () {
        console.log('出发了滑动滚动时间')
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 2000)
      },
      change_song: function (index) {
        console.log('出发了歌单中的改变歌曲')
        this.$store.dispatch('changePlayerMusic', index)
      }
    },
    computed: {
      change_ShowSonglist: function () {
        this.$store.state.isShow_TypeSonglist
      }
    }
  }
</script>

<style>
  .my_card_paper_style {
    position: absolute;
    display: inline-block;
    width: 100%;
    top: 10px;
    bottom: 10px;
  }

  .my_card_photo_style {
    width: 100%;
    height: 250px;
  }
  /*.list {*/
    /*position: absolute;*/
    /*top: 305px;*/
    /*bottom: 0px;*/
    /*overflow: auto;*/
    /*-webkit-overflow-scrolling: touch;*/
  /*}*/
  .demo-infinite-container {
    width: 100%;
    border: 1px solid #d9d9d9;
    position: absolute;
    top: 305px;
    bottom: 0px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

  }

  .my_card_style {
    width: 100%;
  }
</style>
