let pool = require('../pool');

function getCreateNewMail(body, callback){
    let bind = [];
    for (prop in body) {
        bind.push(body[prop]);
    }
    let sql = `INSERT INTO mailing(serial_number, firstname, lastname, patronymic, tocity, wherecity) VALUES (?, ?, ?, ?, ?, ?)`;
    pool.query(sql, bind, function (err, result) {
        if (err) throw err;
        callback(result.insertId)
    });
};

module.exports = {getCreateNewMail};
