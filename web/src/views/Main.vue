<template>
<div class="content">
  <header>
    <div class="unit-head">
      <div class="unit-inner unit-head-inner">
        <h1 class="h2 entry-title">主页<span class="switched" @click="$store.commit('article/SET_ORDER', order=='watch'?'utime':'watch')">Order by {{order=='watch'?'time':'watch'}}</span></h1>
      </div>
    </div>
  </header>

  <div class="bd">
    <div class="entry-content">
      <div v-if="order=='utime'" v-for="(v, k) in alist">
        <h2>{{k.replace('-','')}}</h2>
        <div v-for="(y, x) in v">
          <h3>{{x}}</h3>
          <ul >
            <li v-for="z in y" @click="show(z)">
              <span>{{ z.stime }}</span> &raquo;
              <a>{{ z.title }}</a>
            </li>
          </ul>
        </div>
      </div>
      <ul v-if="order=='watch'">
        <li @click="show(i)" v-for="i in alist"><a>{{i.title}}</a><span style="float:right;font-size:14px">watch:{{i.watch}}</span></li>
      </ul>
      <Page :count="$store.getters.total" :len="limit" :order="order" @pageChange="pageChange"/>
    </div>
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
import Page from '@/components/Page'
import { mapGetters } from 'vuex'
export default {
  components: { Page },
  computed: {
    ...mapGetters(['alist', 'order'])
  },
  data () {
    return {
      limit: 10,
      start: 0,
    }
  },
  methods: {
    pageChange (e) {
      this.start = (e-1) * this.limit
      this.loadData()
    },
    show (d) {
      d.watch += 1
      this.$store.commit('article/SET_CUR_ARTICLE', d)
      this.$router.push({path: 'article', query: {id: d.id}})
    },
    loadData() {
      this.$store.dispatch('article/list', {s: this.start, l: this.limit, o: this.order})
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
