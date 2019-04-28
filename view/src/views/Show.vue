<template>
<div class="content">
  <div v-if="!full" class="title">发布时间：{{article._utime}} &nbsp;&nbsp;&nbsp;热度：{{article._watch}} ℃</div>
  <div class="e">
    <mavon-editor @fullScreen="fullScreen" id="show" :class="['show', full?'show_full':'']" :toolbars="toolbars" :shortCut="false" :boxShadow="false" :editable="false" :subfield="false" defaultOpen="preview" v-model="article._content"/>
  </div>
  <div class="r" :style="{top:w?0:top+'px',height:w?'auto':'100%'}">
    <div style="padding:25px">
        <h4>Tags</h4>
        <div class="tag_box" id="ss">
          <Button @click="$router.push({name:'tags',params:{tagName:t._text}})" v-for="t in tags" :text="t._text" :count="t._count"/>
        </div>
      <div>
        <h4>Related</h4>
        <ul>
          <li @click="show(z)" v-for="z in articleWatch"><a>{{ z._stime.split(',')[0] }} &raquo; {{ z._title }}</a></li>
        </ul>
      </div>
      <div>
        <h4>Lately</h4>
        <ul>
          <li @click="show(z)" v-for="z in articleTime"><a>{{ z._stime.split(',')[0] }} &raquo; {{ z._title }}</a></li>
        </ul>
      </div>
      
    </div>
  </div>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Button from '@/components/Button'
export default {
  components: { Button },
  data () {
    return {
      article: {},
      toolbars: {
        fullscreen: true,
        navigation: true,
      },
      full: false,
      top: 0,
      height: 0,
      s_width: 0,
    }
  },
  watch:{
    $route(to,from){
      if(to.name == 'article') {
        this.article = {}
        this.loadData()}
      }
  },
  activated () {
    this.height = window.innerHeight
    this.s_height(this)
    if(!this.tags) this.setTags()
    if(!this.articleTime) this.setArticleTime(8)
    if(!this.articleWatch) this.setArticleWatch(8)
    if(!this.$route.query.id) return this.$router.replace({path:'error',query:{status_code: '405'}})
    this.loadData()
  },
  mounted () {
    const self = this
    window.onresize =()  =>{
      return (()=>{
        self.s_height(self)
      })()
    }
  },
  computed:{
    ...mapState(['tags','articleTime', 'articleWatch']),
    w () {
      return this.s_width < 1040
    },
    stags () {
      return this.tags?this.tags.slice(0, 6):''
    }
  },
  methods: {
    ...mapActions(['setTags','setArticleTime', 'setArticleWatch']),
    loadData () {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.Util.request.doPost('api/article', {m:1,id:this.$route.query.id}, (res)=>{
        if(res.msg == 0) return this.$router.replace({path: 'error', query: {status_code:404}})
        document.title = res._title
        this.article = res
      }, err => {this.$router.replace({path: 'error', query: {status_code: err.response.status==500?404:err.response.status}})})
    },
    show (d) {
      d._watch += 1
      this.$router.push({path: 'article', query: {id: d._id}})
    },
    fullScreen (e) {
      this.full = e
    },
    s_height (self) {
      var h = window.innerHeight
      var w = window.innerWidth
      self.s_width = w
      self.top = h - (w<1410?(w<850?h-104:h-157):h)
    }
  }
}
</script>
<style scoped>
#ss a{color:#141414;border: 1px solid #448844;}
.tag_box{
  margin-bottom:1.625em
}
.r {
  width: 359px;
  position: absolute;
  right: 0;
  background-color: #e2e2de;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  box-shadow: inset #ffffff 1px 0px 2px;
  -webkit-box-shadow: inset #ffffff 1px 0px 2px;
  -moz-box-shadow: inset #ffffff 1px 0px 2px;
  -o-box-shadow: inset #ffffff 1px 0px 2px;
  color: #2d2d2d;
  overflow: auto;
}
.r h4 {
  font-size: 30px;
  line-height: 52px;
  margin-top: 0;
  margin-bottom: 26px;
}
.r address {
  font-style: normal;
}
.r a{
  color: #c26164;
  border: 0;
}
.r a:hover {
  color: #d08688;
}
.r .misc ul{
  padding-left: 1em
}
@media only screen and (min-width: 1040px) {
  .e{
    margin-right: 360px;
  }
}
@media only screen and (max-width: 1040px) {
  .r {
    position: relative;
    width: 100%;
    background-color: rgba(21, 25, 25, 0.8);
    color: rgba(250, 250, 250, 0.8);
    border: none;
    box-shadow: none;
  }
  #ss {
    background-color: rgba(21, 25, 25, 0.6);
  }
}
</style>
<style lang="scss">
.title {
  height: 40px;
  position: absolute;
  padding-left: 10px;
  line-height: 40px;
  z-index: 1600;
  overflow: hidden;
}
@media only screen and (max-width: 520px) {
  .title {
    width: 240px;
  }
}
.show {
  a {
    border: none !important;
  }
  ul {
    list-style-type: disc !important;
  }
  ul ul{
    list-style-type: circle !important;
  }
  background: #fafafa !important;
  height: 100vh !important;
  .v-note-panel, .v-note-panel .v-note-show .v-show-content {
    border: none !important;
    transition: padding .4s ease-in-out !important;
  }
  .v-note-op {
    background: transparent !important;
    border: none !important;
  }
  @media only screen and (max-width: 420px) {
    .v-note-panel .v-note-show .v-show-content {
      padding: 0 4% !important;
    }
  }
  @media only screen and (min-width: 420px) {
    .v-note-panel .v-note-show .v-show-content {
      padding: 0 6% !important;
    }
  }
}
.show_full {
  @media only screen and (min-width: 1040px) {
    .v-note-panel .v-note-show .v-show-content {
      padding: 0 10% !important;
    }
  }
  @media only screen and (min-width: 1400px) {
    .v-note-panel .v-note-show .v-show-content {
      padding: 0 16% !important;
    }
  }
}
</style>
