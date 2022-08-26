/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-13 15:46:44
 * @LastEditTime: 2022-08-25 22:22:35
 * @LastEditors:  
 */

var Mock = require('mockjs')
var doctorData = Mock.mock({
  "status": 200,
  "doctorInfo|36": [{
    // 1. Unique ID
    "ID|+1": 1,

    // 2. name
    "name": "@name",

    // 3. email
    "email": "tchen64@sheffield.ac.uk",

    // 4. phone
    "phone": function () {
      return Mock.Random.pick(["0114", "0161"]) + Mock.mock(/ \d{3} \d{4}/)
    }
  }]
})

module.exports = doctorData