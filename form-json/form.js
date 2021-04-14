// 导入解析组件
var xlsx = require('./xlsx')
var csv = require('./csv')

/**
 * @description: 将 file 文件转成JSON列表
 * @param {*} file .xlsx | .xls | .csv 文件
 * @param {*} result funcation result (code, data) {
 *  code:
 *  0: 成功
 *  1: 解析失败
 *  2: 不支持解析该文件格式
 *  3: 不支持解析该文件编码格式
 *  4: 文件异常
 * 
 *  data:(file 文件解析出来的 sheets 列表JSON数据)
 *  [name: 'xxx', list:[]]
 * }
*/
function formJson (file, result) {
  // 文件有值
  if (file) {
    // 分割文件名
    const fileSplits = file.name.split('.')
    // 获取文件后缀
    const fileSuffix = fileSplits[fileSplits.length - 1]
    // 解析文件
    if (fileSuffix === 'csv') {
      csv.csvJson(file, result)
    } else if (fileSuffix === 'xls' || fileSuffix === 'xlsx') {
      xlsx.xlsxJson(file, result)
    } else {
      result(2, [])
    }
  } else {
    // 文件没值
    result(4, [])
  }
}

// 导出
module.exports = formJson
