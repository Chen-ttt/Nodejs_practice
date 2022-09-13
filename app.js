/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-25 17:08:54
 * @LastEditTime: 2022-09-13 19:29:30
 * @LastEditors:  
 */
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

// app是客户端, 端口3002
var app = express()

var ejs = require('ejs')
app.engine('html', ejs.__express)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// app2是服务器端, 端口3001
var app2 = express()

// 方法一: CORS - 服务器设置Access-Control-Allow-Origin即可开启CORS

/**
 * 1. 简单请求不会触发预检请求, 简单请求有4个特征
 *    a. HEAD 或 POST 或 GET 请求
 *    b. 请求头不超过以下几个字段
 *       Accept, Accept-Language, Content-Language, Last-Event-ID, Content-Type(仅限于application/x-www-form-urlencoded、multipart/form-data、text/plain)
 *    c. 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器
 *    d. 请求中没有使用 ReadableStream 对象
 * 
 * 2. 非简单请求
 *    a. 必须先使用OPTIONS方法发送一个预检请求, 已获知服务器是否允许该请求(防止跨域请求对服务器数据产生未知的副作用)
 *        预检请求头:
 *        Origin: http://foo.example // 实际请求的源站
 *        Access-Control-Request-Method: POST // 告知服务器, 实际请求要使用POST方法
 *        Access-Control-Request-Headers: X-PINGOTHER, Content-Type // 实际请求将携带哪些自定义的请求字段
 *    b. 服务器响应 允许跨域 (如果不允许, 请求结束)
 *        响应内容如下:
 *        Access-Control-Allow-Origin: http://foo.example
 *        Access-Control-Allow-Methods: POST, GET, OPTIONS // 允许客户端使用这些方法
 *        Access-Control-Allow-Headers: X-PINGOTHER, Content-Type // 允许请求中携带这些字段
 *        Access-Control-Max-Age: 86400 // 该响应有效时间为86400秒, 也就是24小时, 有效时间内, 浏览器无须为同一请求再次发起预检请求
 *    c. 发送真实请求
 *    d. 服务器响应数据
 */

// app2.get("/", (req, res) => {
//   // 设置哪些域名可以访问资源, *表示任意域都可以访问; 也可以写http://abc.com, 表示只允许这一个域访问
//   res.header("Access-Control-Allow-Origin", "*")
//   res.send("hello")

//   // 也可以Access-Control-Allow-Method指定允许哪些方式访问
// })



// 方法二: JSONP - 原理: script不受跨域限制
// 缺点: 只支持GET, 不支持POST
app2.get("/", (req, res) => {
  // 1. 服务器端 从url中获取回调函数的函数名(string类型)
  var funcName = req.query.callback
  res.send(funcName + "(\"这是来自app2的数据\")")
  // 2. 拼接字符串: 函数调用 & 传入参数
})

app2.listen(3001)


var app3 = express()

const centreData = require("./mockDB/centresDB")
const manData = require("./mockDB/manufacturersDB")
const doctorData = require("./mockDB/doctorDB")

// Receive request: Centre Database
app3.all('/mockCentre.action', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.send(centreData)
})
// Receive request: Manufacturer Database
app3.all('/mockMan.action', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.send(manData)
})
// Receive request: Doctor Database
app3.all('/mockDoctor.action', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.send(doctorData)
})

app3.listen(3003)

module.exports = app
