# ex2json

csv、xls、xlsx、文件通过 JavaScript 解析成为 JSON 数据，支持行列合并问题，CSV 文件逗号分隔问题。

![Demo效果](demo.gif)

- 安装

  ```sh
  $ npm i ex2json
  ```

- 引入

  ```js
  import ex2json from "ex2json";
  ```

- 使用

  ```html
  <template>
    <input type="file" @change="read" />
  </template>

  <script>
    import ex2json from "ex2json";
    export default {
      methods: {
        read(e) {
          // 文件对象
          const file = e.target.files[0];
          // 转成成 json
          ex2json.parse(file, (code, sheets) => {
            console.log(code, sheets);
          });
        },
      },
    };
  </script>
  ```
