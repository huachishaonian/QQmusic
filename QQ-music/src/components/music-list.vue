<template>
  <div class="music-list">
    <div class="back">
        <i class="icon-back"><img src="../assets/返回.png"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
        <div class="filter" ref="fliter"></div>
    </div>
    <div class="bg-layer" ref="layer">

    </div>
    <scroll :data="songs" class="list" ref="list" :probe-type="probeType" :listen-scroll="listenScroll" @scroll="scroll">
        <div class="song-list-wrapper">
            <song-list :songs="songs"></song-list>
        </div>
    </scroll>    
  </div>  
</template>
<script>
import scroll from '../base/scroll'
import SongList from '../base/song-list'
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
            }else{
                this.$refs.bgImage.style.paddingTop = '70%'
                this.$refs.bgImage.style.height = 0
            }
            this.$refs.bgImage.style.zIndex = zIndex
            this.$refs.bgImage.style['transform'] = `scale(${scale})`
            this.$refs.bgImage.style['webkitTransform'] = `scale(${scale})`
              
        }
    },
    components:{
        scroll,
        SongList
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
</style>
