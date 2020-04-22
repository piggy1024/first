<template>
  <span>
    <img
      class="tc--img"
      :class="imgClass"
      style="max-width:40px; max-height: 30px;"
      v-for="$img in imgList"
      :key="$img"
      :src="$global.generateImgPath($img)"
      @click.stop="previewImage($img)" />
  </span>
</template>

<script>
export default {
  computed: {
    imgList() {
      return this.sources.filter(s => !!s)
    },
    imgClass() {
      return this.canPreview ? ['tc--img__canPreview'] : []
    }
  },
  props: {
    sources: {
      type: Array,
      default() {
        return []
      }
    },
    canPreview: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    previewImage(src) {
      if (!this.canPreview) return
      console.log('canPreview: ', this.$global.generateImgPath(src))
    }
  }
}
</script>

<style lang="scss" scoped>
.tc--img {
  border: 1px dashed transparent;
  &.tc--img__canPreview {
    &:hover {
      border-color: #409eff;
    }
  }
}
</style>
