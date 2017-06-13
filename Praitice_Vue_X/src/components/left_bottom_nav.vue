<template>
  <div>
    <div class="left_bottom_div_style">
      <mu-paper class="demo-menu">
        <mu-icon-button class="left_menu_item_style" icon="music_video" v-on:click="showTypeSonglist(1)"/>
        <br>
        <mu-icon-button class="left_menu_item_style" icon="favorite_border" v-on:click="showTypeSonglist(2)"/>
        <br>
        <mu-icon-button class="left_menu_item_style" icon="file_download" v-on:click="showTypeSonglist(3)"/>
      </mu-paper>
    </div>
  </div>
</template>


<script>
  import ListHeader from '../components/my_songlist_card.vue'
  export default {
    data () {
      return {
        choosedShowList: 'localAll'
      }
    },
    components: {
      'my-ListHeader': ListHeader
    },
    methods: {
      handleChange (val) {
        this.bottomNav = val
      },
      showTypeSonglist: function (n) {
        this.$store.dispatch('changeShowTypeSonglist', n)
      }
    }
  }
</script>
<style scoped>
  .left_bottom_nav_style {
    float: left;
    -webkit-transform: rotate(90deg); /* for Chrome || Safari */
    -moz-transform: rotate(90deg); /* for Firefox */
    -ms-transform: rotate(90deg); /* for IE */
    -o-transform: rotate(90deg); /* for Opera */
  }

  .left_bottom_div_style {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    min-width: 48px;
  }

  .demo-menu {
    display: inline-block;
    margin: 0px 0px 0px 0;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .left_menu_item_style {
    /*-webkit-transform: rotate(90deg);*/
    /* for Chrome || Safari */
    height: 33%;

  }

  .left_bottom_div_style_2 {
    position: absolute;
    left: 60px;
    top: 95px;
    width: 400px;
    height: 740px;
  }
</style>
