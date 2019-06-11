export default {
  getMonth (i) {
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return month[i-1]
  },
  getCookie(name) {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b")
    return r ? r[1] : undefined
  },
  get_xsrf() {
    return {
      'X-XSRFTOKEN': this.getCookie('_xsrf')
    }
  },
  formatTagsArticles (a) {
    var z = {}
    for (let i = 0; i < a.length; i++) {
      let t = a[i]
      var x = t._tag
      delete t._tag
      if (!z[x]) z[x] = []
      if (z[x].length <= 3) z[x].push(t)
    }
    return z
  },
  formatArticles (a) {
    var z = {}
    for (let i = 0; i < a.length; i++) {
      let t = a[i]
      var x =t._utime.substr(0,5)
      var y = this.getMonth(t._utime.substr(5,2))
      if (!z[x]) z[x] = {}
      if (!z[x][y]) z[x][y] = []
      t._stime = `${y} ${t._utime.substr(8,2)}, ${t._utime.substr(11,5)}`
      z[x][y].push(t)
    }
    return z
  },
  formatArticlesWT (a) {
    for (let i = 0; i < a.length; i++) {
      let t = a[i]
      var y = this.getMonth(t._utime.substr(5,2))
      t._stime = `${y} ${t._utime.substr(8,2)}, ${t._utime.substr(11,5)}`
    }
    return a
  }
}
