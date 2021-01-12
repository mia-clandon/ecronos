const express = require('express');
const router = express.Router();
// const {getSearchStatusMail} = require('./../../core/models/modelSearchStatusMail');
const pool = require('../../../core/pool');

router.get('/', async (req, res, next) => {
    res.render('ru/mailing', {data: ''})
});

router.post('/search-mail', async (req, res, next) => {
    const data = [req.body.serial_number];
    let sql = `select * from status_mailing where serial_number = ?`;

    pool.query(sql, data, function (err, result) {
        if(err) throw err;

        if(result.length){
            res.render('ru/mailing', {data: result});
            console.log(result)
        } else {
            res.render('ru/mailing', {data: '', message: 'Нет информации о данном отправлении'})
        }

    })
})

module.exports = router;
