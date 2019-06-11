<template>
<div id="page" class="hentry">
  <Header/>
  <div class="body" role="main">
    <div class="unit-body" :class="$route.name=='editor'?'unit-editor':''" :id="$route.name=='article'?'show':''">
      <div class="unit-inner unit-body-inner">
        <div class="entry-content">
          <article class="unit-article layout-page">
            <div class="unit-inner unit-article-inner">
              <keep-alive>
                <router-view/>
              </keep-alive>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
  <Footer v-if="$route.name!='editor'&$route.name!='article'"/>
</div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { mapState, mapActions } from 'vuex'
export default {
  components: {Header, Footer},
  created () {
    if(!this.index) this.setIndex()
  },
  computed:{
    ...mapState(['index'])
  },
  methods: {
    ...mapActions(['setIndex'])
  }
}
</script>

<style>
</style>
