let pool = require('../pool');

function getSearchStatusMail(body, callback){
    let sql = `select * from status_mailing where serial_number = ?`;

    pool.query(sql, function (err, result) {
        if(err) throw err;

        if(result.length){
            callback(result[0]);
        } else {
            callback(null)
        }

    })
}

module.exports = {getSearchStatusMail};
