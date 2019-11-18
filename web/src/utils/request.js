import axios from 'axios'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code && res.code !== 4000) {
      if (res.code === 4102) {
        // MessageBox.confirm('您的登录信息已经失效，您可以选择继续停留在这个页面浏览或重新登录。', '提示', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      } else {
        // Message({
        //   message: res.msg || 'Error',
        //   type: 'error',
        //   duration: 5000
        // })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    const status = error.response.status
    if (status == 404 || 500) {
      return router.replace({path: 'error', query: {status_code: status}})
    }
    // Message({
    //   message: error,
    //   type: 'error',
    //   duration: 5000
    // })
    return Promise.reject(error)
  }
)

export default service
