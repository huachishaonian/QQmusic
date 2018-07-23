<template>
  <div id="app">
    <myheader></myheader>
    <tab></tab>
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import myheader from './components/myheader'
import tab from './components/tab'
export default {
  name: 'App',
  components: {
    myheader,
    tab
  }
}
</script>

<style>

</style>
