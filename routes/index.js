/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-25 17:08:54
 * @LastEditTime: 2022-08-25 17:21:31
 * @LastEditors:  
 */
var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router
