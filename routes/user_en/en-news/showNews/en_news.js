let express = require('express');
let router = express.Router();

let pool = require('../../../../core/pool');

router.get('/', function(req, res, next) {
  const query = 'SELECT * FROM news order by id asc';
  pool.query(query, function (err, rows) {
    if(err) {
      req.flash('error', err);
      res.render('en/news', {data: ''});
    } else{
      res.render('en/news', {data: rows});
    }
  })
});

router.get('/show-news/(:id)', function(req, res, next){
  let query = 'SELECT * FROM news WHERE id = ' + req.params.id;

  pool.query( query, function(err, rows, fields) {
    if(err) throw err
    if (rows.length <= 0) {
      req.flash('error', 'news not found with id = ' + req.params.id)
      res.redirect('/news')
    }
    else {
      res.render('en/show-news', {
        id: rows[0].id,
        en_heading: rows[0].en_heading,
        en_description: rows[0].en_description,
        name: rows[0].name,
      })
    }
  })
});
module.exports = router;
