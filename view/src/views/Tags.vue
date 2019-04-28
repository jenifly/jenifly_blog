<template>
<div class="content">

  <header>
    <div class="unit-head">
      <div class="unit-inner unit-head-inner">
        <h1 class="h2 entry-title">标签{{ only?' - '+only:'' }}</h1>
      </div>
    </div>
  </header>

  <div class="bd">
    <div v-if="!only" class="entry-content">
      <div class="tag_box" style="margin-bottom:1em">
       <Button @click="onlyHandler(t._text)" v-for="t in tags" :text="t._text" :count="t._count"/>
      </div>
      <div v-for="(v, k) in tagsArticle">
        <h3>{{k}}</h3>
        <ul>
          <li @click="show(i)" v-for="i in v"><a>{{i._title}}</a><span style="float:right;font-size:14px">watch:{{i._watch}}</span></li>
        </ul>
      </div>
    </div><!-- entry-content -->
    <div v-if="only" class="entry-content">
      <div style="margin-bottom:10px;">
        <span class="all" @click="only=''">Back</span>
        <span class="all" @click="onlyData={};order=='watch'?order='utime':order='watch'" style="float:right">Order by {{order.replace('u','')}}</span>
      </div>
      <div v-if="order=='watch'" v-for="(v, k) in onlyData">
        <h2>{{k.replace('-','')}}</h2>
        <div v-for="(y, x) in v">
          <h3>{{x}}</h3>
          <ul>
            <li v-for="z in y" @click="show(z)">
              <span>{{z._stime }}</span> &raquo; 
              <a>{{ z._title }}</a>
            </li>
          </ul>
        </div>
      </div>
      <ul v-if="order=='utime'">
        <li @click="show(i)" v-for="i in onlyData"><a>{{i._title}}</a><span style="float:right;font-size:14px">watch:{{i._watch}}</span></li>
      </ul>
      <Page :count="count" :len="len" :order="order" @pageChange="pageChange"/>
    </div><!-- entry-content -->
  </div><!-- bd -->

  <footer class="unit-foot">
    <div class="unit-inner unit-foot-inner">
      <p class="gotop">
        <a href="#page">Back to Top</a>
      </p>
    </div>
  </footer>

</div><!-- content -->
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Page from '@/components/Page'
import Button from '@/components/Button'
export default {
  components: { Page, Button },
  data () {
    return {
      only: '',
      onlyData: [],
      count: 0,
      len: 10,
      limit: '',
      order: 'watch'
    }
  },
  created () {
    this.limit = `0,${this.len}`
    if(!this.tags) this.setTags()
  },
  activated () {
    this.only = this.$route.params.tagName
    if(this.only) this.loadData()
  },
  computed:{
    ...mapState(['tags','tagsArticle']),
  },
  methods: {
    ...mapActions(['setTags']),
    pageChange (e) {
      this.limit = `${(e-1)*this.len},${this.len}`
      this.loadData()
    },
    onlyHandler (t) {
      this.only = t
      this.loadData()
    },
    loadData () {
      this.Util.request.doPost('api/tags', {m:2,tag:this.only,order:this.order=='watch'?'utime':'watch',limit:this.limit},(res)=>{
        this.onlyData = this.order=='watch'?this.Util.commons.formatArticles(res.a):res.a
        this.count = res.count.c
      },err=>console.logerr)
    },
    show (d) {
      d._watch += 1
      this.$router.push({path: 'article', query: {id: d._id, title: encodeURIComponent(d._title)}})
    }
  }
}
</script>

<style scoped>
.unit-article header {
  margin-bottom: 10px;
}
li {
  margin-bottom: .6em;
  line-height: 2.4em;
  cursor: pointer;
  transition: background-color .2s ease-in-out;
}
li:hover{
  background-color: rgba(31, 31, 3, 0.1);
}
ul {
  margin-bottom: 1em;
}
.bd a{
  padding-bottom: 2px;
  border-bottom: 1px dashed #c26164;
}
.bd a:hover{
  color: #575656;
  border-bottom: 1px dashed #d08688;
}
.all {
  user-select: none;
  cursor: pointer;
  font-size: 16px;
  color: #c26164;
}
.all:hover {
  color: #d08688;
}
</style>
