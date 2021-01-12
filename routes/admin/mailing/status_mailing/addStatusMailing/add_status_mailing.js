const express = require('express');
const router = express.Router();
const pool = require('../../../../../core/pool');
const {getAddStatusMail} = require('../../../../../core/models/modelAddStatusMail');

router.get('/', async (req, res, next) => {
    let user = req.session.user;
    if (user) {
        const query = "select * from mailing";
        await pool.query(query, function (err, rows) {
            if (err) {
                res.render('admin/mailing/addStatusMailing/add-status-mailing', {data: ''})
            } else {
                res.render('admin/mailing/addStatusMailing/add-status-mailing', {data: rows})
            }
        })
    } else {
        res.redirect('/admin');
    }
});
router.post('/add-status-mail', async (req, res, next) => {
    let user = req.session.user;
    if (user) {
    const statusMailInput = {
        serial_number: req.body.serial_number,
        status: req.body.status,
        date: req.body.date
    };
    getAddStatusMail(statusMailInput, function (lastId) {
        if (lastId) {
            res.render('admin/home', {messageSuccess: "Успешно добавлено"});
        } else {
            res.render('admin/home', {message: "Что-то пошло не так"})
        }
    });
    } else {
        res.render('admin/auth/login');
    }
});
module.exports = router;
