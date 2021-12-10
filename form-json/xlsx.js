// 基于: 文件导入方式
var XLSX = require("./xlsx.full.min")
// 将 xls、xlsx 文件解析成 JSON
function xlsxJson (file, result) {
  // 读取完成的数据
  var wb;
  // 检测是浏览器是否支持 readAsBinaryString 函数
  var rABS = typeof FileReader !== 'undefined' && typeof FileReader.prototype !== 'undefined' && typeof FileReader.prototype.readAsBinaryString !== 'undefined'
  // 创建 FileReader
  var reader = new FileReader()
  // 读取回调
  reader.onload = function (e) {
    var data = e.target.result
    var err = undefined
    if(rABS) {
      try { 
        wb = XLSX.read(data, {
          type: 'binary',
          cellDates: true
        })
      } catch (error) { err = error }
    } else {
      // 以base64方式读取
      try { 
        wb = XLSX.read(btoa(fixdata(data)), {
          type: 'base64',
          cellDates: true
        })
      } catch (error) { err = error }
    }
    // 将数据处理成需要的JSON
    if (wb) {
      // 读取成功
      handleJson(wb, result)
    } else {
      // 读取失败
      result(1, err)
    }
  }
  // 开始读取
  if(rABS) {
    reader.readAsBinaryString(file)
  } else {
    reader.readAsArrayBuffer(file)
  }
}

// 将数据处理成需要的JSON
function handleJson (data, result) {
  // 获取表名
  const sheetNames = data.SheetNames
  // 获取表数据
  const sheets = data.Sheets
  // 数据源
  const dataArray = []
  // 便利数据
  sheetNames.forEach((item) => {
    const sheet = sheets[item]
    const merges = sheet['!merges'] || []
    // 将 sheet 转成 json
    var sheetJson = XLSX.utils.sheet_to_json(sheet, { header: 1 })
    // json 数据内部格式处理
    handleDataFormat(sheetJson)
    // json 合并单元格处理
    merges.forEach((item) => {
      handleMerge(item, sheetJson)
    })
    // 组合数据
    dataArray.push({
      name: item,
      list: sheetJson
    })
  })
  // 返回数据
  result(0, dataArray)
}

// 解析合并行数据
function handleMerge (merge, sheetJson) {
  const start = merge.s
  const end = merge.e
  if (start.c === end.c) { // 列合并
    const item = sheetJson[start.r][start.c]
    for (let index = start.r; index <= end.r; index++) {
      sheetJson[index][start.c] = item
    }
  } else { // 行合并
    const item = sheetJson[start.r][start.c]
    for (let index = start.c; index <= end.c; index++) {
      sheetJson[start.r][index] = item
    }
  }
}

// 检查数据对象并处理为需要的数据格式
function handleDataFormat (sheet) {
  // 遍历所有行
  sheet.forEach((row) => {
    // 遍历所有列
    row.forEach((col, colIndex) => {
      // 检查每列数据
      if (typeof col === 'object') {
        // 判断是否为时间格式
        var date = new Date(col)
        if (!isNaN(date.getTime())) {
          // 将时间格式装换为指定格式字符串
          const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          row[colIndex] = dateString
        }
      }
    })
  })
}

// 文件流转 BinaryString
function fixdata(data) {
  var o = "",
      l = 0,
      w = 10240;
  for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}

// 导出
module.exports = {
  xlsxJson
}