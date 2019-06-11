import axios from 'axios'
import commons from './commons'

export default {
  doPost(url, data, success, fail) {
    axios({
      method: "POST",
      url: url,
      headers: commons.get_xsrf(),
      data: data,
      timeout: 4000
    }).then((res) => {
      success(res.data)
    }).catch(err => fail(err))
  },
  doGet(url, success) {
    axios({
      method: "GET",
      url: url,
      timeout: 4000
    }).then((res) => {
      success(res.data)
    }).catch(err => console.log(err))
  },
  doUpload(url, formdata, success) {
    axios({
      url: url,
      method: 'POST',
      data: formdata,
      headers: {'Content-Type': 'multipart/form-data', 'X-XSRFTOKEN':commons.getCookie('_xsrf')},
    }).then((res) => {
      success(res.data)
    }).catch(err=>console.log(err))
  }
}