export default {
  pad2(num) {
    var t = num.toString(16);
    if (t.length === 1) t = '0' + t;
    return t
  },
  lighten(colorStr, weight) { // 淡化
    return this.mix('fff', colorStr, weight)
  },
  darken(colorStr, weight) { // 加深
    return this.mix('000', colorStr, weight)
  },
  mix(color1, color2, weight, alpha1, alpha2) { // 混合
    color1 = color1.replace('#', '');
    color2 = color2.replace('#', '');
    if (weight === undefined) weight = 0.5;
    if (alpha1 === undefined) alpha1 = 1;
    if (alpha2 === undefined) alpha2 = 1;

    var w = 2 * weight - 1;
    var alphaDelta = alpha1 - alpha2;
    var w1 = (((w * alphaDelta === -1) ? w : (w + alphaDelta) / (1 + w * alphaDelta)) + 1) / 2;
    var w2 = 1 - w1;

    var nums1 = this.toNum3(color1);
    var nums2 = this.toNum3(color2);
    var r = Math.round(w1 * nums1[0] + w2 * nums2[0]);
    var g = Math.round(w1 * nums1[1] + w2 * nums2[1]);
    var b = Math.round(w1 * nums1[2] + w2 * nums2[2]);
    return '#' + this.pad2(r) + this.pad2(g) + this.pad2(b)
  },
  rgba(colorStr, rate) {
    var nums = this.toNum3(colorStr);
    var r = nums[0], g = nums[1], b = nums[2];
    return r = Math.round((1 - rate) * r),
      g = Math.round((1 - rate) * g),
      b = Math.round((1 - rate) * b),
      r = this.pad2(r),
      g = this.pad2(g),
      b = this.pad2(b),
    '#' + r + g + b
  },
  toNum3(colorStr) {
    if (colorStr.length === 3) {
      colorStr = colorStr[0] + colorStr[0] + colorStr[1] + colorStr[1] + colorStr[2] + colorStr[2]
    }
    var r = parseInt(colorStr.slice(0, 2), 16)
    var g = parseInt(colorStr.slice(2, 4), 16)
    var b = parseInt(colorStr.slice(4, 6), 16);
    return [r, g, b]
  }
}