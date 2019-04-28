<template>
<div class="content">
  <h2 style="margin-top:0;">Markdown编辑器</h2>
  <mavon-editor id="editor" :toolbars="toolbars" :defaultOpen="subfield?'':'edit'" :subfield="subfield" @fullScreen="fullScreen" @imgAdd="$imgAdd" @imgDel="$imgDel" @save="save" :tabSize="2" v-model="mdSter"/>
  <div class="wallpaper" v-if="upload||showChoice||download" @click.self="showChoice=false" :style="upload?{'pointer-events':'none'}:''">
    <div class="info" v-if="showChoice">
      <h3 style="padding-left:20px;">{{ choice }}</h3>
      <Button @click="choice=='是否保存到本地？'?showChoice=false:'';choice='是否保存到本地？'" text="NO" color="#C2C2BE" style="width:60px;float:right;margin:0 20px 18px 0"/>
      <Button @click="showChoice=false;choice.indexOf('本地')>0?download=true:upload=true" text="YES" style="width:60px;float:right;margin:0 14px 18px 0"/>
    </div>
    <div class="info" v-if="upload" style="min-width:620px">
      <h3 style="text-align:center;background:#e2e2de;margin:0 0 16px 0;padding:26px 0 10px 0;user-select:none;cursor:move" @mousedown="dragover">Upload</h3>
      <div class="content">
        <span>Title:</span>
        <input type="text" v-model="article.title"/>
      </div>
      <div class="content">
        <span>Tags:</span>
        <input style="width:46%" readonly type="text" v-model="article.tag"/>
        <Button @click="showTags=!showTags" :text="showTags?'CANCEL':'SELTEC'" :color="showTags?'#C2C2BE':'#D1923F'" style="width:60px;margin-right:-1px"/>
        <Button @click="createTag=!createTag" :text="createTag?'CANCEL':'NEW'" :color="createTag?'#C2C2BE':'#D1923F'" style="width:60px;margin-right:0"/>
        <div v-if="showTags" class="showtags">
          <p v-if='!tags'>暂无Tags，请添加。</p>
          <Button v-for="t in tags" color="#73B9A2" @click="article.tag=t._text;showTags=false" :text="t._text"/>
        </div>
        <div v-if="createTag" style="margin-top:20px">
          <span style="margin-left:92px;width:106px">Create Tag:</span>
          <input style="width:42%" type="text" v-model="tag"/>
          <Button @click="createTagHandler" color="#D1923F" text="CREATE" style="width:58px;"/>
        </div>
      </div>
      <div class="content">
        <span>Abstract:</span>
        <textarea type="text" v-model="article.abstract"/>
      </div>
      <Button @click="upload=false"  color="#C2C2BE" text="CANCEL" style="width:60px;float:right;margin:0 20px 18px 0"/>
      <Button @click="uploadHander" text="OK" style="width:60px;float:right;margin:0 14px 18px 0"/>
    </div>
    <div class="info" v-if="download" style="min-width:520px">
      <h3 style="text-align:center;background:#e2e2de;margin:0 0 16px 0;padding:26px 0 10px 0;user-select:none;cursor:move" @mousedown="dragover">Download</h3>
      <div class="content">
        <span>Title:</span>
        <input style="width:75%" type="text" v-model="article.title"/>
      </div>
      <div v-if="Object.keys(img_file).length > 0" class="content">
        <p style="margin-bottom:10px;padding:0;">检测到您在浏览器上缓存了图片，您希望以何种形式保存？</p>
        <div style="text-align:center">
          <Button @click="file=true" color="#cd9a5b" text="File" style="margin:0 14px 0 0;width:60px;"/>
          <Button @click="file=false" text="Base64" color="#C2C2BE" style="margin:0;width:60px;" :disabled="true"/>
        </div>
      </div>
      <Button @click="download=false" color="#C2C2BE" text="CANCEL" style="width:60px;float:right;margin:0 20px 18px 0"/>
      <Button @click="downloadHandler" text="OK" style="width:60px;float:right;margin:0 14px 18px 0"/>
    </div>
  </div>
  <div class="wallpaper" v-if="info">
    <div class="info">
      <h3 style="padding-left:20px;text-align:center">Info</h3>
      <p>{{infoMsg}}</p>
       <Button @click="info=false" text="OK" style="width:62px;float:right;margin:0 14px 18px 0" />
    </div>
  </div>
</div>
</template>
<script>
import { mapState, mapActions } from "vuex"
import Button from '@/components/Button'
export default {
  components: { Button },
  data () {
    return {
      s_width: 0,
      full: false,
      mdSter: '',
      img_file: {},
      token: '',
      showChoice: false,
      choice: '',
      upload: false,
      download: false,
      createTag: false,
      showTags: false,
      tag: '',
      file: true,
      info: false,
      infoMsg: '',
      article: {title:'',tag:'',abstract:'',pics:'',uid:'10000'},
    }
  },
  created () {
    this.s_width = window.innerWidth
  },
  mounted () {
    const self = this
    window.onresize =()  =>{
      return (()=>{
        self.s_width = window.innerWidth
      })()
    }
  },
  computed:{
    ...mapState(['tags']),
    toolbars () {
       if (this.s_width < 540)
        return { link: true, imagelink: true, table: true, undo: true, redo: true, save: true, navigation: true, preview: true, fullscreen: true}
       else if (this.s_width < 645)
        return { quote: true, ol: true, ul:true, link: true, imagelink: true, table: true, undo: true, redo: true, save: true, navigation: true, preview: true, fullscreen: true}
      else if (this.s_width < 904)
        return { bold: true, quote: true, ol: true, ul:true, italic: true, header: true, link: true, imagelink: true, table: true, undo: true, redo: true, save: true, navigation: true, preview: true, fullscreen: true}
      else if (this.s_width < 1228)
        return { bold: true, italic: true, quote: true, ol: true, ul:true,header: true, underline: true, strikethrough: true, mark: true, code: true, table: true,imagelink: true, readmodel: true, undo: true, fullscreen: true, redo: true, save: true, navigation: true, preview: true }
      else
        return {bold: true, italic: true, header: true, underline: true, strikethrough: true, mark: true, superscript: true, subscript: true, quote: true, ol: true, ul: true, link: true, imagelink: true, code: true, table: true, fullscreen: true, readmodel: true, htmlcode: true, help: true, undo: true, redo: true, trash: true, save: true, navigation: true, alignleft: true, aligncenter: true, alignright: true, subfield: true, preview: true}
    },
    subfield () {
      return this.s_width > 1120
    }
  },
  methods: {
    ...mapActions(['setTags', 'setArticleTime', 'setArticleWatch']),
    downloadHandler () {
      this.Util.mdSave.localDownload(this.article.title, this.mdSter, this.img_file)
    },
    uploadHander () {
      if(this.article.tag&&this.article.title){
        var formdata = new FormData();
        for(var _img in this.img_file){
          formdata.append(_img, this.img_file[_img]);
        }
        formdata.append('article', JSON.stringify(this.article));
        formdata.append('mdSter', this.mdSter);
        this.Util.request.doUpload('api/ula',formdata, (res) => {
          this.info = true
          if(res.id){
            this.setTags()
            this.setArticleTime(8)
            this.setArticleWatch(8)
            this.infoMsg = '文章上传成功！'
            this.img_file = {}
            this.showChoice=this.upload=false
          }else{
            this.infoMsg = '文章上传失败！'
          }
        }) 
      }
    },
    createTagHandler () {
      if(!this.tag) return
      this.Util.request.doPost('api/tags',{m:1,t:this.tag},(res)=>{
        if(res.id){
          this.createTag = false
          this.article.tag = this.tag
          this.tags.push({_count:0,_id:res.id,_text:this.tag})
        }else{
          this.info = true
          this.infoMsg = 'Tag添加失败！'
        }
      },err=>console.log(err))
    },
    save (e) {
      if(!this.mdSter) return
      this.showChoice = true
      this.token = this.Util.commons.getCookie('j')
      this.choice = `是否${this.token?'上传至服务器':'保存到本地'}？`
      if(this.token&&!this.tags) this.setTags()
    },
    dragover (e) {
      let odiv = e.target.parentNode;
      let disX = e.clientX - odiv.offsetLeft
      let disY = e.clientY - odiv.offsetTop
      document.onmousemove = (e)=>{
        let left = e.clientX - disX
        let top = e.clientY - disY
        this.positionX = top
        this.positionY = left
        odiv.style.marginLeft = left + 'px'
        odiv.style.marginTop = top + 'px'
      };
      document.onmouseup = (e) => {
        document.onmousemove = null
        document.onmouseup = null
      }
    },
    $imgAdd(pos, $file){
      this.img_file[pos] = $file;
    },
    $imgDel(pos){
      delete this.img_file[pos];
    },
    fullScreen (e) {
      this.full = e
    }
  }
}
</script>
<style lang="scss">
#editor{
  height: calc(100vh - 162px);
  a {
    border: none;
  }
  ul {
    list-style-type: disc;
  }
  ul ul{
    list-style-type: circle;
  }
  .add-image-link-wrapper .add-image-link .title{
    top: 0;
    width: 100%;
    margin-left: -20px;
  }
  .add-image-link-wrapper .add-image-link {
      padding: 46px 20px 12px 20px;
  }
  .add-image-link-wrapper .add-image-link i{
    z-index: 2000;
  }
  @media only screen and (max-width: 760px) {
    .add-image-link-wrapper .add-image-link {
      padding: 42px 12px 12px 12px;
    }
    .add-image-link-wrapper .add-image-link .title{
      margin-left: -12px;
    }
    height: calc(100vh - 192px);
  }
}
</style>
<style scoped>
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
  pointer-events: auto;
  background-color: #e2e2de;
  margin: 12% auto auto auto;
  min-width: 360px;
  border-radius: 8px;
  height: auto;
  padding: 0;
  border: 1px solid #e2e2de;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}
.info p {
  color: #ad4346;
  font-size: 18px;
  padding: 0 32px 0 32px;
}
.content {
  padding: 0 20px;
}
@media only screen and (max-width: 400px) {
  .content {
    padding: 10px 15px;
  }
  .content h2{
    margin-bottom: 10px;
  }
}
.content input {
  display: inline-block;
  width: 79%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid rgba(21, 25, 25, 0.8);
  background-color: transparent;
  border-radius: 6px;
  outline: none;
}
.content span {
  display: inline-block;
  width: 84px;
}
.content textarea {
  width: 79%;
  padding: 8px 12px;
  border: 1px solid rgba(21, 25, 25, 0.8);
  background-color: transparent;
  border-radius: 6px;
  outline: none;
}
.content .showtags {
  margin-left:92px;
  margin-top: 20px;
  border-radius: 6px;
  padding: 8px 12px;
  max-height: 160px;
  overflow: auto;
  border: 1px solid rgba(21, 25, 25, 0.8);
}
.content .showtags p{
  margin-bottom: 0;
}
.layout-page .tag_box {
  background: transparent;
  padding: 0;
  box-shadow: none;
  -webkit-box-shadow: none;
}
.btn {
  line-height: 1.4em;
}
.no {
  background-color: #c2c2be !important;
  border: 1px solid #82829e !important;
}
.no:hover {
  background-color: #a2a29e !important;
  border: 1px solid #72726e !important;
}
.no:active {
  background-color: #a2a29e !important;
  border: 1px solid #72726e !important;
}
</style>
