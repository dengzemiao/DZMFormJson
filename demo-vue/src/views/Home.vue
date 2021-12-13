<template>
  <div class="content-view">
    <input type="file" @change="read">
    <div>上传文件之后，请查看控制台 console.log() 输出结果</div>
  </div>
</template>

<script>
import FormJson from '../../../form-json/form'
export default {
  methods: {
    read (e) {
      const file = e.target.files[0]
      // npm 导入
      // this.$formJson(file, (code, sheets) => {
      //   console.log(code, sheets)
      // })
      // 本地导入
      FormJson(file, (code, sheets) => {
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