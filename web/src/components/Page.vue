<template>
  <div class="jy-page">
    <p>共{{page_len}}页</p>
    <span @click="page!=1?page--:''" :class="page==1?'':'link'"><</span>
    <span @click="page==i?'':page=i" :class="page==i?'':'link'" v-for="i in pages">{{i}}</span>
    <span @click="page!=page_len?page++:''" :class="page==page_len?'':'link'">></span>
    <p><input type="text" v-model="cpage"/>页</p>
  </div>
</template>
<script>
import "../assets/themes/Page.scss"
export default {
  props: {
    count: { type: Number, default: 10, required: false },
    len: { type: Number, default: 10, required: false },
    size: { type: Number, default: 5, required: false },
    order: { type: String, default: '', required: false },
  },
  data () {
    return {
      page: 1,
      cpage: 1,
      isize: Math.floor(this.size / 2),
      tuning: this.size % 2 == 0 ? 1 : 0
    }
  },
  computed: {
    page_len () {
      console.log(0)
      return this.count%this.len==0?(this.count/this.len):(Math.floor(this.count/this.len)+1)
    },
    pages () {
      if(this.size >= this.page_len) return this.page_len
      var t = new Array(this.size)
      var a = this.page - this.isize
      var b = this.page_len - this.page - this.isize
      if(a <= 0) {
        for (let i = 1; i <= this.size, this.page_len; i++) {
          t.push(i)
        }
      }else if(b <= 0){
        for (let i = this.page_len - this.size + (this.tuning?0:1); i <= this.page_len; i++) {
          t.push(i)
        }
      }else{
        for (let i = this.page - this.isize + this.tuning; i <=  this.page + this.isize; i++) {
          t.push(i)
        }
      }
      return t
    },
  },
  watch: {
    page () {
      this.$emit('pageChange', this.page)
    },
    order () {
      this.$emit('pageChange', 1)
    },
    cpage (val) {
      if(!val) return
      if(isNaN(val)) this.cpage = this.page
      if(this.page != this.cpage)
      this.cpage = this.page = Math.max(Math.min(this.cpage, this.page_len), 1)
    }
  }
}
</script>