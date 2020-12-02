let express = require('express');
let router = express.Router();

let pool = require('../../core/pool');

router.get('/', async (req, res, next) => {
  const query = 'select * from images order by id asc';
  await pool.query(query, function (err, rows) {
    if(err) {
      req.flash('error', err);
      res.render('ru/news', {data: ''});
    } else{
      res.render('ru/news', {data: rows})
    }
  })
});
router.get('/read-news/(:id)', async (req, res, next) => {
  let query = 'SELECT * FROM images WHERE id = ' + req.params.id;
  await pool.query( query, function(err, rows, fields) {
    if(err) throw err
    if (rows.length <= 0) {
      req.flash('error', 'news not found with id = ' + req.params.id)
      res.redirect('/ru/news')
    }
    else {
      res.render('ru/read-news', {
        id: rows[0].id,
        heading: rows[0].heading,
        description: rows[0].description,
        name: rows[0].name,
        data: rows[0].data
      })
    }
  })
});
module.exports = router;
