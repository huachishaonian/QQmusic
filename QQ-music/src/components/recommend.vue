<template>
<div class="recommend" ref="recommend">
   <scroll class="recommend-content" :data="songList" ref="scroll">
       <div>
       <div v-if="recommends.length" class="slider-wrapper" ref="sliderWrapper">
          <slider>
           <div v-for="item in recommends">
               <a :href="item.linkUrl">
                   <img class="needsclick" @load="loadImage" :src="item.picUrl"/>
               </a>
           </div>     
         </slider> 
       </div>
       <div class="song-list">
           <h1 class="song-top">-- 为你推荐歌单 --</h1>
           <ul>
               <li v-for="item in songList" class="item">
                 <div class="pic">
                   <img width="60" height="60" v-lazy="item.imgurl"/>
                 </div>
                 <div class="text">
                     <h2 class="name" v-html="item.creator.name"></h2>
                     <p class="intr" v-html="item.dissname"></p>
                 </div>
               </li>

           </ul>
       </div>
       </div>
      <div class="loading-container" v-show="!songList.length">
        <loading></loading>
      </div>
   </scroll>

   </div>
</template>
<script>
import loading from '../base/loading'
import scroll from '../base/scroll'
import slider from '../base/slider'
import {getRecommend,getSongList} from '../common/recommend'
import {ERR_OK} from '../common/config'
export default {
    name: 'recommend',
    data() {
        return {
            recommends: [],
            songList: []
        }
    },
    created() {
      this._getRecommend(),
      this._getSongList()
    },
    methods: {
      loadImage() {
        if (!this.checkloaded) {
          this.checkloaded = true
          this.$refs.scroll.refresh()
        }
      },

        _getRecommend() {
            getRecommend().then((res)=>{
              if(res.code === ERR_OK){
                  this.recommends = res.data.slider
                  
              }
            })
        },
        _getSongList() {
        getSongList().then((res) => {
          if (res.code === ERR_OK) {
            this.songList = res.data.list
            
          }
        })
      }
    },
    components: {
        slider,
        scroll,
        loading
    }
}
</script>
<style>
.recommend{
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
}
.recommend-content{
      height: 100%;
      overflow: hidden;
}
.slider-wrapper{
        position: relative;
        width: 100%;
        overflow: hidden;
        height: 150px;
}
.item{
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px 20px ;
}
.pic{
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
}
.text{
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: 14px;
}
.name{
              margin-bottom: 10px;
              color: #000;
              font-size: 18px;
}
.intr{
           color:#000;
}
.song-top{
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: 16px;
          color: #000;
          font-weight: 500;
}
.loading-container{
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
}
</style>
