let pool = require('../pool');

function getSearchMail(mail = null, callback) {
    let field;

    if (mail) {
        field = Number.isInteger(mail) ? 'serial_number' : 'username';
    }

    let sql = `select * from mailing where ${field} = ?`;

    pool.query(sql, mail, function (err, result) {
        if (err) throw err;

        if (result.length) {
            callback(result[0]);
        } else {
            callback(null)
        }

    })
}

function getCreateNewMail(body, callback) {
    let bind = [];
    for (prop in body) {
        bind.push(body[prop]);
    }
    let sql = `INSERT INTO mailing(serial_number, firstname, lastname, patronymic, tocity, wherecity)
               VALUES (?, ?, ?, ?, ?, ?)`;
    pool.query(sql, bind, function (err, result) {
        if (err) throw err;
        callback(result.insertId)
    });
};

module.exports = {getSearchMail, getCreateNewMail};
