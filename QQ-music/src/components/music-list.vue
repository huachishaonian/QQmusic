<template>
  <div class="music-list">
    <div class="back" @click="back">
        <i class="icon-back"><img src="../assets/返回.png"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
        <div class="play-wrapper">
            <div class="play" v-show="songs.length>0" ref="playBtn">
                <i class="icon-play"></i>
                <span class="text">随机播放全部</span>
            </div>
        </div>
        <div class="filter" ref="fliter"></div>
    </div>
    <div class="bg-layer" ref="layer">

    </div>
    <scroll :data="songs" class="list" ref="list" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
        <div class="song-list-wrapper">
            <song-list :songs="songs"></song-list>
        </div>
        <div class="loading-container" v-show="!songs.length">
            <loading></loading>
        </div>
    </scroll>    
  </div>  
</template>
<script>
import scroll from '../base/scroll'
import SongList from '../base/song-list'
import Loading from '../base/loading'
const RESERVED_HEIGHT = 60
export default {
    props:{
        bgImage:{
            type:String,
            default:''
        },
        songs:{
            type:Array,
            default:[]
        },
        title:{
            type:String,
            default:''
        }
    },
    data() {
        return{
            scrollY :0
        }
    },
    computed:{
      bgStyle() {
        return `background-image:url(${this.bgImage})`
      }
    },
    created() {
        this.probeType = 3
        this.listenScroll = true
    },
    mounted() {
        this.imageHeight = this.$refs.bgImage.clientHeight
        this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
        this.$refs.list.$el.style.top = `${this.$refs.bgImage.clientHeight}px`
    },
    methods:{
        scroll(pos) {
            this.scrollY = pos.y
        },
        back() {
            this.$router.back()
        }
    },
    watch: {
        scrollY(newY) {
            let translateY = Math.max(this.minTranslateY, newY)
            let zIndex = 0
            let scale = 1
            
            this.$refs.layer.style['transform'] = `translate3d(0,${translateY}px,0)`
            this.$refs.layer.style['webkitTransform'] = `translate3d(0,${translateY}px,0)`
            const percent = Math.abs(newY/this.imageHeight)
            if(newY > 0) {
                scale = 1 + percent
                zIndex = 10
            }

            if(newY<this.minTranslateY) {
                zIndex = 10
                this.$refs.bgImage.style.paddingTop = 0
                this.$refs.bgImage.style.height = `${RESERVED_HEIGHT}px`
                this.$refs.playBtn.style.display = 'none'
            }else{
                this.$refs.bgImage.style.paddingTop = '70%'
                this.$refs.bgImage.style.height = 0
                this.$refs.playBtn.style.display = ''
            }
            this.$refs.bgImage.style.zIndex = zIndex
            this.$refs.bgImage.style['transform'] = `scale(${scale})`
            this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})`
              
        }
    },
    components:{
        scroll,
        SongList,
        Loading
    }
}
</script>
<style>
.music-list{
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    bottom:0;
    right: 0;
    background: whitesmoke;
}
.title{
      position: absolute;
      top: 0;
      left: 10%;
      z-index: 40;
      width: 80%;
      
      text-align: center;
      line-height: 40px;
      font-size: 18px;
      color: #000;
}
.back{
      position: absolute;
      top: 0;
      left: 6px;
      z-index: 50;
}
.icon-back{
        display: block;
        padding: 10px;
        font-size: 14px;
        color: #000;
}
.bg-image{
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 70%;
      transform-origin: top;
      background-size: cover;
}
.filter{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 17, 27, 0.4); 
}
.list{
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      background: whitesmoke;
      
}
.song-list-wrapper{
        padding: 20px 30px;
}
.bg-layer{
      position: relative;
      height: 100%;
      background: whitesmoke;
}
.play-wrapper{
        position: absolute;
        bottom: 20px;
        z-index: 50;
        width: 100%;
}
.play{
          box-sizing: border-box;
          width: 135px;
          padding: 7px 0;
          margin: 0 auto;
          text-align: center;
          border: 1px solid #FFF;
          color: #FFF;
          border-radius: 100px;
          font-size: 0;
}
.icon-play{
            display: inline-block;
            vertical-align: middle;
            margin-right: 6px;
            font-size: 12PX;
}
.text{
            display: inline-block;
            vertical-align: middle;
            font-size: 12PX;
}
</style>
