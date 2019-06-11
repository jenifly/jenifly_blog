<template>
  <header class="the-header">
    <svg tabindex="66" width="20" height="20" viewBox="0 0 20 20">
      <rect y="9" width="20" height="2"></rect>
      <rect y="3" width="20" height="2"></rect>
      <rect y="15" width="20" height="2"></rect>
    </svg>
    <div class="unit-head">
      <div class="unit-inner unit-head-inner">
        <nav class="nav-global">
          <ul>
            <li class="logo">
              <a @click="$router.push('_token')">Jenifly 's Blog</a>
            </li>
            <li class="archive"><router-link to="/index">写在前面</router-link></li>
            <li class="page"><router-link to="/main">主页</router-link></li>
            <li class="tag"><router-link to="/tags">标签</router-link></li>
            <li class="tag"><router-link to="/editor">Markdown编辑器</router-link></li>
            <!-- <li class="tag"><router-link to="/show">音乐播放器</router-link></li>
            <li class="tag"><router-link to="/editor">视频解析</router-link></li> -->
            <li class="other"><router-link to="/other">其他工具</router-link></li>
          </ul>
        </nav>
      </div><!-- unit-inner -->
    </div><!-- unit-head -->
  </header>
</template>
<style scoped>
.the-header svg{
  outline: none;
  cursor: pointer;
  position: absolute;
  right: 26px;
  top: 41px;
}
svg:focus +.unit-head {
  height: 192px;
}
</style>

