const express = require('express');
const router = express.Router();
const {getCreateNewMail} = require('./../../core/models/modelNewMail');
router.get('/', async (req, res, next) => {
    let user = req.session.user;
    if (user) {
        res.render('admin/add-mailing', {data: ''})
    } else {
        res.render('admin/adminlogin');
    }
});

router.post('/add-mail', async (req, res, next) => {
    let user = req.session.user;
    if (user) {
        const mailInput = {
            serial_number: req.body.serial_number,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            patronymic: req.body.patronymic,
            tocity: req.body.tocity,
            wherecity: req.body.wherecity,
            date: req.body.date,
        };
        getCreateNewMail(mailInput, function (lastId) {
            if (lastId) {
                res.render('admin/add-mailing');
            } else {
                console.log("Что-то пошло не так");
            }
        });
    } else {
        res.redirect('/adminlogin');
    }
});

module.exports = router;
