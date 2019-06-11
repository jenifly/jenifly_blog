<template>
<div class="content">
  <header>
    <div class="unit-head">
      <div class="unit-inner unit-head-inner">
        <h1 class="h2 entry-title">其他工具</h1>
      </div>
    </div>
  </header>

  <div>
    <ImageBox v-for="item in tools" :text="item._text" :src="item._src" :url="item._url" :title="item._title"/>
  </div>

  <footer class="unit-foot">
    <div class="unit-inner unit-foot-inner">
      <p class="gotop">
        <a href="#page">Back to Top</a>
      </p>
    </div>
  </footer>
</div>
</template>
<script>
import ImageBox from '@/components/ImageBox'
import { mapState, mapActions } from 'vuex'
export default {
  components: { ImageBox },
  computed:{
    ...mapState(['tools'])
  },
  methods: {
    ...mapActions(['setTools'])
  },
  created () {
    if(!this.tools) this.setTools()
  }
}
</script>
