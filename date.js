const moment = require('moment')
let sql = `SELECT * FROM articles`;
let dateNoFormat = sql.slice(3);
const dateNoFormat = '2022-01-27 16:27:00'
const d = moment(dateNoFormat).format("MM Do YY, h:mm:ss a");


console.log('test', d)