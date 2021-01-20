<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <scroll-title :list="list" :activeTitleStyle="{color: 'red'}">
    </scroll-title>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import ScrollTitle from './components/ScrollTitle.vue'

export default {
  name: 'App',
  components: {
    ScrollTitle
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    setTimeout(() => {
      this.list = [
        '标题1',
        '标题1',
        '标题1',
        '标题1',
        '标题1',
        '标题1',
        '标题1',
        '标题1',
        '标题1',
        '标题1',
        '标题1',
        '标题1',
        '标题1',
        '标题1',
        '标题1',
        '标题1',
      ]
    }, 2000)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
