const moment = require('moment')

exports.formatterDate = (date) => {
    const d = moment(date).format('MMMM Do YYYY, h:mm:ss a')
    return d
}