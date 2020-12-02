let pool = require('../pool');

function getAddStatusMail(body, callback){
    let bind = [];
    for (prop in body) {
        bind.push(body[prop]);
    }
    let sql = `INSERT INTO status_mailing(serial_number, status, date) VALUES (?, ?, ?)`;
    pool.query(sql, bind, function (err, result) {
        if (err) throw err;
        callback(result.insertId)
    });
};

module.exports = {getAddStatusMail};
