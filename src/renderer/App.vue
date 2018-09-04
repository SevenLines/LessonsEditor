<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'lessonseditor'
  }
</script>

<style lang="scss">
  @import "~bootstrap/dist/css/bootstrap.css";
  @import "~katex/dist/katex.css";
  @import "./scss/minima.scss";
  @import "~element-ui/lib/theme-chalk/index.css";
</style>
