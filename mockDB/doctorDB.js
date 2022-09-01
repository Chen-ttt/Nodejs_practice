/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-13 15:46:44
 * @LastEditTime: 2022-09-01 11:25:56
 * @LastEditors:  
 */

var Mock = require('mockjs')
var doctorData = Mock.mock({
  "status": 200,
  "doctorInfo|144": [{
    // 1. Unique ID
    "ID|+1": 1,

    // 2. name
    "name": "@name",

    // 3. email
    "email": function () {
      if (this.ID < 36) {
        return "tchen64@sheffield.ac.uk"
      } else {
        return "k" + Mock.mock(/\d{3}\d{3}/) + "@sv.ac.uk"
      }
    },

    // 4. phone
    "phone": function () {
      return Mock.Random.pick(["0114", "0161"]) + Mock.mock(/ \d{3} \d{4}/)
    }
  }]
})

module.exports = doctorData