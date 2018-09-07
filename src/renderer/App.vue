<template>
  <div id="app">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
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
