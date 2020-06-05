<template>
  <div id="app">
    <input type="file" @change="read">
    <div>上传文件之后，请查看控制台 console.log() 输出结果</div>
  </div>
</template>
<script>
import { formJson } from './form-json/form'
export default {
  methods: {
    read (e) {
      const file = e.target.files[0]
      formJson(file, (code, sheets) => {
        console.log(code, sheets)
      })
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
