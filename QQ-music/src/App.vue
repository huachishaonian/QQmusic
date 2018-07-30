<template>
  <div id="app">
    <myheader></myheader>
    <tab></tab>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import myheader from './components/myheader'
import tab from './components/tab'
import Player from './components/player'
export default {
  name: 'App',
  components: {
    myheader,
    tab,
    Player
  }
}
</script>

<style>

</style>
