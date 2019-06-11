<template>
<div class="content">
  <div class='error'>
    <div>错误：{{$route.query.status_code}}<br>{{ content }}
      <span>
        <a @click="$router.go(-1)">返回</a>
      </span>
    </div>
  </div>
</div>
</template>
<script>
export default {
  computed:{
    content () {
      switch (this.$route.query.status_code+'') {
        case '405':
          return '非法访问！ X﹏X'
        case '404':
          return '哎呀，这个网页飞走了...  (。_。)'
        case '500':
          return '服务器有点小bug... (。_。)'
      }
    }
  }
}
</script>
<style scoped>
.error {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e2e2de;
  display: flex;
}
.error div {
  margin: 12% auto auto auto;
  width: 32%;
  min-width: 340px;
  color: #ad4346;
  text-align: center;
  border-radius: 6px;
  padding-top: 2em;
  line-height: 2em;
  font-size: 26px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.4);
  -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.2), 0 1px 0 rgba(255, 255, 255, 0.4);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.4);
  background-color: rgba(21, 25, 25, 0.9);
}
/* @media only screen and (max-width: 400px) {
  .error div{
    width: 32%;
  }
} */
.error span {
  display: block;
  text-align: center;
  line-height: 1.2em;
  margin-bottom: 10px;
}
.error a {
  font-size: 12px;
  color: rgba(250, 250, 250, 0.6);
  cursor: pointer;
}
.error a:hover{
  color: rgba(250, 250, 250, 0.8);
  border-bottom: 1px dashed rgba(250, 250, 250, 0.8);
}
</style>
