const express = require('express');
const router = express.Router();
let pool = require('../../../core/pool');

router.get('/', function(req, res, next) {
    let user = req.session.user;
    if (user) {
        const query = 'SELECT * FROM mailing order by id asc';
        pool.query(query, function (err, rows) {
            if (err) {
                req.flash('error', err);
                res.render('admin/mailing/showMailing/mailing', {data: ''});
            } else {
                res.render('admin/mailing/showMailing/mailing', {data: rows});
                console.log(rows);
            }
        })
    } else {
        res.render('admin/auth/login');
    }
});
router.get('/show-history-mailing/(:id)', function(req, res, next){
    let user = req.session.user;
    if (user) {
        let query = 'SELECT * FROM status_mailing WHERE serial_number= ' + req.params.serial_number;

        pool.query(query, function (err, rows, fields) {
            console.log(fields)
            if (err) throw err
            if (rows.length <= 0) {
                req.flash('error', 'news not found with id = ' + req.params.serial_number);
                res.redirect('/admin/mailing/showHistoryMailing/show-history-mailing')
            } else {
                res.render('/admin/mailing/showHistoryMailing/show-history-mailing', {
                    // id: rows[0].id,
                    serial_number: rows[0].serial_number,
                    status: rows[0].status,
                    date: rows[0].date,
                })
            }
        })
    } else {
        res.render('admin/auth/login');
    }
});
module.exports = router;
