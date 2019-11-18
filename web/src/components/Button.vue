<template>
  <div :class="disabled?'jy-btn-disabled':'jy-btn'" :style="bColor()" @click="disabled?'':$emit('click')">
    {{text}}<span v-if="count">{{count>max?max+'+':count}}</span>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import "../assets/themes/Button.scss"
import varyColor from '@/utils/varyColor'
export default {
  props: {
    text: { type: String, default: '', required: false },
    color: { type: String, default: '#99CC99', required: false },
    count: { type: Number, required: false },
    max: { type: Number, default: 99, required: false },
    disabled: { type: Boolean, default: false, required: false },
  },
  computed: {
    ...mapGetters(['Colors'])
  },
  methods: {
    bColor() { // 避免频繁调用 VaryColor
      if(!this.Colors[this.color]) {
        this.Colors[this.color] = {
          '--bColor': this.color,
          '--h_bColor': varyColor.darken(this.color, 0.1),
          '--b_bColor': varyColor.darken(this.color, 0.4),
        }
      }
      return this.Colors[this.color]
    }
  }
}
</script>
