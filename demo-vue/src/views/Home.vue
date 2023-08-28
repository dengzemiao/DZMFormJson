<template>
  <div class="content-view">
    <input type="file" @change="read">
    <div>上传文件之后，请查看控制台 console.log() 输出结果</div>
  </div>
</template>

<script>
import ex2json from 'ex2json'
export default {
  methods: {
    read (e) {
      // 文件对象
      const file = e.target.files[0]
      // 转成成 json
      ex2json.parse(file, (code, sheets) => {
        console.log(code, sheets)
      })
    }
  }
}
</script>

<style scoped>
.content-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>