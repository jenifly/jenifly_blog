import JSZip from 'jszip'
import FileSaver from 'file-saver'

export default {
  localDownload (title , mdStr, images) {
    if (Object.keys(images).length) {
      var zip = new JSZip()
      var imgFolder= zip.folder("images")
      for(var img in images) {
        mdStr = mdStr.replace(RegExp(`][(]${img}[)]`,'g'),`](./images/${images[img].name})`)
        imgFolder.file(images[img].name, images[img].miniurl.split(';base64,')[1], { base64: true })
      }
      zip.file(`${title}.md`, mdStr)
      zip.generateAsync({type:"blob"}).then(content => {
        FileSaver.saveAs(content, `${title}.zip`)
      }, err=>console.log(err))
    } else {
      FileSaver.saveAs(new Blob([mdStr], { type: "text/plain;charset=utf-8" }), `${title}.md`)
    }
  },
  serverDownload () {
  }
}