 // pack 方法接收一个参数对象
 const pack = require('./src/index.js')
 /**
  * 该对象有三个属性
  * entryPath  主入口文件路径  *必须
  * outPath    出口文件路径    *必须
  * [,isCompression]  是否对代码进行压缩/【该参数可选，默认为false】
  */
 config = {
     entryPath: './entry/index.js',
     outPath: 'dist/',
     isCompresssion: true/false  
 }
 pack(config)