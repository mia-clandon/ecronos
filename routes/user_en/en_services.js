let express = require('express');
let router = express.Router();

let pool = require('../../core/pool');

// /* GET home page. */
router.get('/', function(req, res, next) {
  const query =  'SELECT * FROM services order by id desc';

  pool.query( query, function (err, rows) {
    if (err) {
      req.flash('error', err);
      res.render('en/services', {data: ''});
    } else {
      res.render('en/services', {data: rows})
    }
  });
});
router.get('/read-services/(:id)', function(req, res, next){
  let query = 'SELECT * FROM services WHERE id = ' + req.params.id;

  pool.query( query , function(err, rows, fields) {
    if(err) throw err

    // if topic not found
    if (rows.length <= 0) {
      req.flash('error', 'news not found with id = ' + req.params.id)
      res.redirect('/en/services')
    }
      res.render('en/read-services', {
        id: rows[0].id,
        en_heading: rows[0].en_heading,
        en_description: rows[0].en_description,
      })
  })
});
module.exports = router;
