/*
 * @Description: 
 * @Author: Tong Chen
 * @Date: 2022-08-13 15:46:03
 * @LastEditTime: 2022-09-01 11:25:21
 * @LastEditors:  
 */
let { centresName } = require("./config")

var Mock = require('mockjs')
var centreData = Mock.mock({
  "status": 200,
  "centreInfo|24": [{
    // 1. Unique ID
    "ID|+1": 0,

    // 2. name
    "name|+1": centresName,

    // 3. address
    "address": function () {
      return "S" + Mock.Random.integer(1, 5) + " " + Mock.Random.integer(1, 5) + Mock.Random.string("upper", 2)
    },

    // 4. distance
    "distance|1-10.1": 1,

    // 5. email
    "email": "tchen64@sheffield.ac.uk",

    // 6. phone
    "phone": function () {
      return Mock.Random.pick(["0114", "0161"]) + Mock.mock(/ \d{3} \d{4}/)
    },

    // 7. opening
    "openTime": function () {
      return Mock.Random.pick(["8", "9", "10"]) + "am - " + Mock.Random.pick(["5", "6", "7"]) + "pm"
    },

    // 8. centreLLevel
    "centreLevel|1-5": 1,

    // 9. population
    "population": function () {
      if (this.centreLevel === 1) return Mock.Random.integer(20, 100)
      else if (this.centreLevel === 2) return Mock.Random.integer(101, 300)
      else if (this.centreLevel === 3) return Mock.Random.integer(301, 600)
      else if (this.centreLevel === 4) return Mock.Random.integer(601, 1000)
      else if (this.centreLevel === 5) return Mock.Random.integer(1001, 1500)
    },

    // 10. max storage
    "maxStorage": function () {
      return this.centreLevel * 30
    },

    // 11. initial number of vaccines
    "initVaccine": function () {
      return this.maxStorage
    },

    // 12.
    "rateComsumption": 0,

    // 13.
    "manList": function () {
      return [this.ID * 2, this.ID * 2 + 1]
    },

    // 14. 
    "doctorList": function () {
      const c = this.ID * 6
      return [c, c + 1, c + 2, c + 3, c + 4, c + 5]
    }
  }]
})

module.exports = centreData