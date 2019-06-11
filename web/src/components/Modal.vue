<template>
  <div class="jy-modal-mask" v-if="show" @click.self="maskClosable?show=false:''">
    <div class="jy-modal-content">
      <h3 :style="titleCenter?{'text-align':'center'}:''">{{ title }}</h3>
      <div class="jy-modal-body">
        <slot/>
      </div>
      <div v-if="footer" class="jy-modal-footer">
        <Button v-if="!footerBtn||footerBtn==1" :text="okText" @click="handler('ok')"/>
        <Button v-if="!footerBtn||footerBtn==2" :text="cancelText" color="#C2C2BE" @click="handler('cancel')"/>
      </div>
    </div>
  </div>
</template>
<script>
import "../assets/themes/Modal.scss"
import Button from './Button'
export default {
  components: { Button },
  props: {
    value: { type: Boolean, default: false, required: false },
    maskClosable: { type: Boolean, default: true, required: false },
    title: { type: String, default: '', required: false },
    titleCenter: { type: Boolean, default: true, required: false },
    okText: { type: String, default: 'OK', required: false },
    cancelText: { type: String, default: 'CANCEL', required: false },
    footer: { type: Boolean, default: true, required: false },
    footerBtn: { type: Number, default: 0, required: false}
  },
  data () {
    return {
      show: this.value
    } 
  },
  watch: {
    show () {
      this.$emit('input', this.show)
    }
  },
  methods: {
    handler (e) {
      this.show = false
      this.$emit(e)
    }
  }
}
</script>
