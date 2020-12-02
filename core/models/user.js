const pool = require('../pool');
let bcrypt = require('bcrypt');

// function User() {};

function getFindUser(user = null, callback){
    let field;

    if(user){
        field = Number.isInteger(user) ? 'id' : 'username';
    }

    let sql = `select * from users where ${field} = ?`;

    pool.query(sql, user, function (err, result) {
        if(err) throw err;

        if(result.length){
            callback(result[0]);
        } else {
            callback(null)
        }

    })
}

function getCreateUser(body, callback) {
    let pwd = body.password;
    body.password = bcrypt.hashSync(pwd, 10);

    let bind = [];

    for (prop in body) {
        bind.push(body[prop]);
    }
    let sql = `INSERT INTO users(username, fullname, password) VALUES (?, ?, ?)`;
    pool.query(sql, bind, function (err, result) {
        if (err) throw err;
        callback(result.insertId);
    });
}
function loginUser(username, password, callback){
    getFindUser(username, function (user) {
        if(user){
            if(bcrypt.compareSync(password, user.password)){
                callback(user);
                return;
            }
        }
        callback(null);
    })
}


module.exports = {getFindUser, getCreateUser, loginUser};
