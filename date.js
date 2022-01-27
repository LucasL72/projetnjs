const moment = require('moment')
const dateNoFormat = '2022-01-27 16:27:00'
const d = moment(dateNoFormat).format("MM Do YY, h:mm:ss a");
console.log('date', d)