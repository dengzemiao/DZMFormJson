# DZMFormJson

csv、xls、xlsx、文件通过 JavaScript 解析成为 JSON 数据，支持行列合并问题，CSV文件逗号分隔问题。

![Demo效果](demo.gif)

* 通过 npm 引入

  ```
  npm i dzm-form-json
  ```

* `main.js` 导入

  ```
  import Vue from 'vue'
  import App from './App.vue'
  import router from './router'

  Vue.config.productionTip = false

  // 导入 DZMFormJson
  import DZMFormJson from 'dzm-form-json'
  Vue.prototype.$formJson = DZMFormJson

  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
  ```

* 使用

  ```
  <template>
    <div id="app">
      <input type="file" @change="read">
    </div>
  </template>
  <script>
  export default {
    methods: {
      read (e) {
        const file = e.target.files[0]
        // 使用
        this.$formJson(file, (code, sheets) => {
          console.log(code, sheets)
        })
      }
    }
  }
  </script>
  ```
