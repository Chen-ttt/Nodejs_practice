/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-25 17:08:54
 * @LastEditTime: 2022-08-25 18:14:01
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
// app2.get("/", (req, res) => {
//   // 方法一: 修改请求头
//   res.header("Access-Control-Allow-Origin", "*") // *表示任意域都可以访问; 也可以Access-Control-Allow-Method指定允许哪些方式访问
//   res.send("hello")
// })

app2.get("/", (req, res) => {
  // 方法二: jsonp - 原理: script不受跨域限制
  // 1. 服务器端 从url中获取回调函数的函数名(string类型)
  var funcName = req.query.callback
  res.send(funcName + "(\"这是来自app2的数据\")")
  // 2. 拼接字符串: 函数调用 & 传入参数
})

app2.listen(3001)

module.exports = app
