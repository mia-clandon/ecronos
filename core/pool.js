const util = require('util');
const mysql = require('mysql');
/**
 * pool to the database.
 *  */
const pool = mysql.createPool({
    poolLimit: 10000,
    host: 'localhost',
    user: 'root', // use your mysql username.
    password: '1234', // user your mysql password.
    database: 'www'
});

pool.getConnection((err, pool) => {
    if(err)
        console.error("Something went wrong connecting to the database ...");

    if(pool)
        pool.release();
    return;
});

pool.query = util.promisify(pool.query);

module.exports = pool;
