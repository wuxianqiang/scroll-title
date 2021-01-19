<template>
  <scroll-title :list="list" :activeTitleStyle="{color: 'red'}">
  </scroll-title>
</template>

<script>
import ScrollTitle from './components/ScrollTitle.vue'

export default {
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
