
const fs = require("fs");
const CryptoJS = require("crypto-js");

module.exports = {
  input: [
    './src/views/**/*.{ts,vue}',
    './src/components/**/*.{ts,vue}',
    './src/pinia/**/*.{ts,vue}'
  ],
  output: './', //输出目录
  options: {
    debug: true,
    func: false,
    // func: {
    //   list: ['t'], // 翻译函数名，可根据实际情况修改
    // },
    trans: false,
    lngs: ['zh', 'en'],
    defaultLng: 'zh',
    resource: {
      loadPath: './src/i18n/language/{{lng}}.json', //输入路径 (手动新建目录)
      savePath: './src/i18n/language/{{lng}}.json', //输出路径 (输出会根据输入路径内容自增, 不会覆盖已有的key)
      jsonIndent: 2,
      lineEnding: '\n'
    },
    removeUnusedKeys: true,
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}'
    }
  },
  // 这里我们要实现将中文转换成crc格式, 通过crc格式key作为索引, 最终实现语言包的切换.
  transform: function customTransform(file, enc, done) {
    //自己通过该函数来加工key或value
    'use strict'
    const parser = this.parser
    const content = fs.readFileSync(file.path, enc)
    parser.parseFuncFromString(content, { list: ['lang'] }, (text, options) => {
      const encrypted = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
      options.defaultValue = text
      let hashKey = encrypted
      parser.set(hashKey, options)
    })
    done()
  }
}