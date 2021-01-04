let express = require('express');
let router = express.Router();

let pool = require('../../core/pool');

router.get('/', async function (req, res, next) {
    let user = req.session.user;
    if (user) {
        const query = 'SELECT * FROM news order by id asc';
        await pool.query(query, function (err, rows) {
            if (err) {
                req.flash('error', err);
                res.render('admin/show-news', {data: ''});
            } else {
                res.render('admin/show-news', {data: rows})
            }
        })
    } else {
        res.render('admin/admin');
    }
});
router.get('/show-news/(:id)', function (req, res, next) {
    let user = req.session.user;
    if (user) {
        let query = 'SELECT * FROM images WHERE id = ' + req.params.id;

        pool.query(query, function (err, rows, fields) {
            if (err) throw err

            // if topic not found
            if (rows.length <= 0) {
                req.flash('error', 'news not found with id = ' + req.params.id)
                res.redirect('/admin/show-news')
            } else { // if topic found
                // render to views/topic/edit.ejs template file
                res.render('admin/show-news', {
                    id: rows[0].id,
                    heading: rows[0].heading,
                    description: rows[0].description,
                    name: rows[0].name,
                })
            }
        })
    } else {
        res.render('admin/admin');
    }
});
module.exports = router;
