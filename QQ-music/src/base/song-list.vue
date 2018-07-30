<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs">
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      }

    },
    methods: {
      selectItem(item,index) {
        this.$emit('select',item,index)
      },
      getDesc(song) {
        return `${song.singer}·${song.album}`
      }

    }
  }
</script>

<style>



    .item{
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 64px;
      font-size: 12px;
    }
    .content{
        flex: 1;
        line-height: 20px;
        overflow: hidden;
    }
    .name{
          
          color: #000;
    }
    .desc{
          
          margin-top: 4px;
          color:#000;
    }
</style>