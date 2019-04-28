<template>
<div class="content">
  <header>
    <div class="unit-head">
      <div class="unit-inner unit-head-inner">
        <h1 class="h2 entry-title">主页<span class="switched" @click="articles={};order=='watch'?order='utime':order='watch'">Order by {{order.replace('u','')}}</span></h1>
      </div><!-- unit-inner -->
    </div><!-- unit-head -->
  </header>

  <div class="bd">
    <div class="entry-content">
      <div v-if="order=='watch'" v-for="(v, k) in articles">
        <h2>{{k.replace('-','')}}</h2>
        <div v-for="(y, x) in v">
          <h3>{{x}}</h3>
          <ul >
            <li v-for="z in y" @click="show(z)">
              <span>{{z._stime }}</span> &raquo;
              <a>{{ z._title }}</a>
            </li>
          </ul>
        </div>
      </div>
      <ul v-if="order=='utime'">
        <li @click="show(i)" v-for="i in articles"><a>{{i._title}}</a><span style="float:right;font-size:14px">watch:{{i._watch}}</span></li>
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
</div>
</template>
<script>
import Page from '@/components/Page'
export default {
  components: { Page },
  data () {
    return {
      articles: {},
      count: 0,
      len: 10,
      limit: '',
      order: '',
    }
  },
  created () {
    this.limit = `0,${this.len}`
    this.order = 'watch'
    this.loadData()
  },
  methods: {
    pageChange (e) {
      this.limit = `${(e-1)*this.len},${this.len}`
      this.loadData()
    },
    loadData() {
      this.Util.request.doPost('api/article', {m:0, t:this.order=='watch'?'utime':'watch',l:this.limit},(res)=>{
        this.articles = this.order=='watch'?this.Util.commons.formatArticles(res.a):res.a
        this.count = res.c.c
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
.switched{
  display: block;
  float: right;
  cursor: pointer;
  font-size: 16px;
  color: #c26164;
  user-select: none;
}
li {
  margin-bottom: .6em;
  line-height: 2.4em;
  cursor: pointer;
  transition: background-color .2s ease-in-out;
}
@media only screen and (min-width: 520px) {
  li div{
    display: inline;
  }
}
ul {
  margin-bottom: 0;
}
li:hover{
  background-color: rgba(31, 31, 3, 0.1);
}
.switched:hover{
  color: #d08688;
}
.bd a{
  padding-bottom: 2px;
  border-bottom: 1px dashed #c26164;
}
.bd a:hover{
  color: #575656;
  border-bottom: 1px dashed #d08688;
}
</style>
