/**
 * @description: 回调
 * @param {number} code 0: 成功、1: 解析失败、2: 不支持解析该文件格式、3: 不支持解析该文件编码格式、4: 文件异常
 * @param {Record} res 解析成功的数据
 */
type EXResult = (code: number, res: any) => void;

/**
 * @description: 将文件转成 JSON
 * @param {any} file .xlsx | .xls | .csv 文件对象
 * @param {EXResult} result 解析回调
 */
function parse(file: any, result: EXResult): void;

/** 抛出 */
module.exports = {
  /** 解析文件 */
  parse
}
