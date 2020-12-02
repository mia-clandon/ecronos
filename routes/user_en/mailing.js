const express = require('express');
const router = express.Router();
const pool = require('./../../core/pool');

router.get('/', async (req, res, next) => {
    res.render('en/mailing', {data: ''})
});

router.post('/search-mail', async (req, res, next) => {
    const data = [req.body.serial_number];
    let sql = `select * from status_mailing where serial_number = ?`;

    pool.query(sql, data, function (err, result) {
        if(err) throw err;

        if(result.length){
            res.render('en/mailing', {data: result});
            console.log(result)
        } else {
            res.render('en/mailing', {data: '', message: 'No information about this shipment'})
        }

    })
})

module.exports = router;
