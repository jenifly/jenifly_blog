<template>
<div style="border-radius:8px;" class="content tag_box">
  <h4 style="font-size:30px;">CHECK TOKEN</h4>
  <input type="password" placeholder="Please enter the password-1" v-model="pws.pw0"/>
  <input type="password" placeholder="Please enter the password-2" v-model="pws.pw1"/>
  <input type="password" placeholder="Please enter the password-3" v-model="pws.pw2"/>
  <div style="display:flex;width:100%">
    <Button @click="submit" class="btn" style="width:40%;padding:.25em;margin:6px auto"text="SUBMIT"/>
  </div><!-- layout-page -->
  <div class="wallpaper" v-if="showInfo" @click.self="showInfo=false">
    <div class="info">
      <h3>INFO</h3>
      <p>{{info}}</p>
      <Button @click="showInfo=false" style="padding:1px 38px;float:right;margin:0 20px 18px 0" text="OK"/>
    </div>
  </div>
</div>
</template>
<script>
import Button from '@/components/Button'
export default {
  components: { Button },
  data () {
    return {
      pws: {pw0: '', pw1: '', pw2: ''},
      showInfo: false,
      info: '',
    }
  },
  methods: {
    submit () {
      for(let t in this.pws){
        if(this.pws[t].split().length = 0) return
        this.pws[t] = this.pws[t].toString()
      }
      this.Util.doPost('api/token', {pws: this.pws}, (res)=>{
        if(res)
          return this.$router.replace('index')
        this.info = 'Token校验失败，当前ip被锁定，今日还可重试2次！'
        this.showInfo = true
      }, (err)=>{this.info='网络错误，请稍后重试！';this.showInfo=true})
    }
  }
}
</script>
<style scoped>
h4 {
  text-align: center;
}
h3 {
  font-size: 24px;
  text-align: center;
  margin: 10px 0;
}
input {
  display: block;
  margin: 16px auto;
  width: 52%;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  background-color: rgba(21, 25, 25, 0.8);
  border-radius: 6px;
  outline: none;
  color: rgba(250, 250, 250, 0.8);
  -webkit-box-shadow: inset 0 1px 0 #000;
  -moz-box-shadow: inset 0 1px 0 #000;
  box-shadow: inset 0 1px 0 #000;
}
@media only screen and (max-width: 520px) {
  input{
    width: 70%;
  }
  .info{
    width: 320px !important;
  }
}
p {
  color: #ad4346;
  padding: 18px 32px 2px 32px;
}
.wallpaper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  display: flex;
  background: rgba(0,0,0,0.3)
}
.info{
  background-color: #e2e2de;
  margin: 16% auto auto auto;
  width: 400px;
  height: auto;
  border-radius: 8px;
  border: 1px solid #e2e2de;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}
</style>
