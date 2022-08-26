/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-13 15:46:44
 * @LastEditTime: 2022-08-25 22:23:08
 * @LastEditors:  
 */
let { manufacturerName } = require("./config")

var Mock = require('mockjs')
var manufacturerData = Mock.mock({
  "status": 200,
  "manufacturerInfo|12": [{
    // 1. Unique ID
    "ID|+1": 1,

    // 2. name
    "name|+1": manufacturerName,

    // 3. address
    "address": function () {
      return "S" + Mock.Random.integer(1, 5) + " " + Mock.Random.integer(1, 5) + Mock.Random.string("upper", 2)
    },

    // 4. email
    "email": "tchen64@sheffield.ac.uk",

    // 5. phone
    "phone": function () {
      return Mock.Random.pick(["0114", "0161"]) + Mock.mock(/ \d{3} \d{4}/)
    }
  }]
})

module.exports = manufacturerData