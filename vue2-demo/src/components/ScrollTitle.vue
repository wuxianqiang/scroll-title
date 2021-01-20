<template>
  <div class="wrapper" id="wrapper" ref="handleWrapper">
    <ul class="list" id="list" @click="handleClick">
      <li
        class="item"
        :data-index="index"
        v-for="(item, index) in list"
        :key="index"
        ref="handleLi"
        :style="[baseTitleStyle, current === index ? activeTitleStyle : {}]"
      >
        <slot :item="item">
          {{ item }}
        </slot>
      </li>
    </ul>
    <div class="line" id="line" :style="[lineStyle, activeLineStyle]" @transitionend="handleEnd">
      <span class="inner"></span>
    </div>
  </div>
</template>

<script>
let result = []
let allWidth = 0
let timer = null

export default {
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    activeTitleStyle: {
      type: Object,
      default: () => ({})
    },
    activeLineStyle: {
      type: Object,
      default: () => ({})
    },
    baseTitleStyle: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      eleList: [],
      eleWrapper: '',
      lineStyle: {},
      current: 0
    };
  },
  watch: {
    list: {
      handler (val) {
        if (val.length) {
          this.$nextTick(() => {
            console.log(this.eleList, 'eleList')
            this.calculateWidth()
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    calculateWidth () {
      for (let i = 0; i < this.$refs.handleLi.length; i++) {
        const element = this.$refs.handleLi[i]
        allWidth += element.offsetWidth
        result.push({
          width: element.offsetWidth,
          left: element.offsetLeft
        })
      }
      this.lineStyle = {
        width: `${result[0].width}px`,
        transform: `translate3d(${result[0].left}px, 0, 0)`,
        display: 'block'
      }
    },
    handleClick (e) {
      clearInterval(timer)
      const index = e.target.dataset.index
      if (index > -1) {
        const width = result[index].width
        const left = result[index].left
        this.current = Number(index)
        console.log(index, 'index')
        this.lineStyle = {
          width: `${width}px`,
          transform: `translate3d(${left}px, 0, 0)`,
          display: 'block'
        }
      }
    },
    handleEnd () {
      const elementLeft = Math.floor(this.$refs.handleLi[this.current].getBoundingClientRect().left)
      const scrollLeft = this.$refs.handleWrapper.scrollLeft
      const middle = Math.floor(window.innerWidth / 2) - Math.floor(result[this.current].width / 2)
      const minScroll = 0
      const maxScroll = allWidth - window.innerWidth
      let targetScrollLeft = scrollLeft + (elementLeft - middle)
      if (targetScrollLeft < minScroll) {
        targetScrollLeft = minScroll
      }
      if (targetScrollLeft > maxScroll) {
        targetScrollLeft = maxScroll
      }
      if (allWidth > window.innerWidth && scrollLeft !== targetScrollLeft) {
        this.animationScroll(targetScrollLeft)
        // console.log(targetScrollLeft, 'targetScrollLeft')
      }
    },
    animationScroll (distance) {
      const minScroll = 0
      const maxScroll = allWidth - window.innerWidth
      const scrollLeft = this.$refs.handleWrapper.scrollLeft
      const step = Math.floor(Math.abs((scrollLeft - distance) / 200 * 20))
      let temp = 0
      timer = setInterval(() => {
        // 手动触发的滚动需要立即停止动画
        if (temp && this.$refs.handleWrapper.scrollLeft !== temp) {
          return clearInterval(timer)
        }
        if (distance > scrollLeft) {
          const current = this.$refs.handleWrapper.scrollLeft + step
          // 左移动
          if (current > distance || current >= maxScroll) {
            clearInterval(timer)
            this.$refs.handleWrapper.scrollLeft = distance
          } else {
            this.$refs.handleWrapper.scrollLeft = current
            temp = current
          }
        } else {
          const current = this.$refs.handleWrapper.scrollLeft - step
          // 右移动
          if (current < distance || current <= minScroll) {
            clearInterval(timer)
            this.$refs.handleWrapper.scrollLeft = distance
          } else {
            this.$refs.handleWrapper.scrollLeft = current
            temp = current
          }
        }
      }, 20);
    }
  }
};
</script>

<style>
::-webkit-scrollbar {
  display: none;
  /* Chrome Safari */
}

.wrapper {
  position: relative;
  width: 100%;
  overflow-y: hidden;
  overflow-x: scroll;
}

.list {
  display: flex;
  flex-wrap: nowrap;
}

.item {
  text-align: center;
  line-height: 36px;
  padding: 0 12px;
  white-space: nowrap;
}

.line {
  position: absolute;
  text-align: center;
  left: 0;
  bottom: 0;
  width: 0;
  transform: translate3d(0, 0, 0);
  transition: transform 0.3s ease-out;
  display: none;
}

.inner {
  width: 20px;
  height: 2px;
  background: red;
  display: inline-block;
  vertical-align: bottom;
}
</style>