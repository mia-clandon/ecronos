let pool = require('../pool');

function getCreateNewService(body, callback){
    let bind = [];
    for (prop in body) {
        bind.push(body[prop]);
    }
    let sql = `INSERT INTO services(heading, description, en_heading, en_description, excerpt_description, excerpt_en_description) VALUES (?, ?, ?, ?, ?, ?)`;
    pool.query(sql, bind, function (err, result) {
        if (err) throw err;
        callback(result.insertId)
    });
};

module.exports = {getCreateNewService};
