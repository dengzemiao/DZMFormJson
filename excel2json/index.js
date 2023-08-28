var xlsx = require('./lib/xlsx')
var csv = require('./lib/csv')

/**
 * @description: 将文件转成 JSON
 * @param {*} file ..xlsx | .xls | .csv 文件对象
 * @param {*} result funcation result (code, res) {
 *   code:
 *   0: 成功
 *   1: 解析失败
 *   2: 不支持解析该文件格式
 *   3: 不支持解析该文件编码格式
 *   4: 文件异常
 * 
 *   res: (解析出来 JSON 数据)
 *   [name: 'xxx', list:[]]
 * }
*/
function parse(file, result) {
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

/** 抛出 */
module.exports = {
  /** 解析文件 */
  parse
}
