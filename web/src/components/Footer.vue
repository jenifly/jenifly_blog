<template>
<footer class="the-footer" :id="$route.name=='editor'?'the-editor-footer':''">
  <div class="unit-foot">
    <div class="unit-inner unit-foot-inner">
      <div class="misc vcard">
        <h4>about</h4>
        <ul>
          <li class="contact"><address><span class="author fn n">浮杨刻</span> - <span class="fn email">1439916120@qq.com</span></address></li>
          <li class="contact"><address><span class="author fn n">Jenifly</span> - <span class="fn email">jenifly0926@gmail.com</span></address></li>
          <li class="github"><a href="http://github.com/jenifly/" rel="me" target="_Blank">github.com/jenifly</a></li>
        </ul>
      </div><!-- misc -->
      <p class="licence">
        {{ $store.getters.homepage.b }}
      </p>
    </div><!-- unit-foot-inner -->
  </div><!-- unit-foot -->
</footer>
</template>
<script>
</script>
<style scoped>
.licence {
  margin-bottom: 0;
}
@media only screen and (max-width: 400px) {
  .licence {
    text-align: center;
  }
}
</style>
