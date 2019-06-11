<template>
  <div class="jy-imagebox" @click="click">
    <img :src="src" :title="title">
    <span>{{text}}</span>
  </div>
</template>
<script>
import "../assets/themes/ImageBox.scss"
export default {
  props: {
    src: { type: String, default: '', required: false },
    text: { type: String, default: '', required: false },
    title: { type: String, default: '', required: false },
    url: { type: String, default: '', required: false }
  },
  methods: {
    click () {
      window.open(this.url)
    }
  }
}
</script>
