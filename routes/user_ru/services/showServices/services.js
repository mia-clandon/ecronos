let express = require('express');
let router = express.Router();

let pool = require('../../../../core/pool');

// /* GET home page. */
router.get('/', function(req, res, next) {
  const query = 'SELECT * FROM services order by id desc';
  pool.query( query, function (err, rows) {
    if (err) {
      req.flash('error', err);
      res.render('ru/services', {data: ''});
    } else {
      res.render('ru/services', {data: rows})
    }
  });
});
router.get('/read-services/(:id)', async (req, res, next) => {
  let query = 'SELECT * FROM services WHERE id = ' + req.params.id;

  await pool.query(query, function(err, rows, fields) {
    if(err) throw err
    if (rows.length <= 0) {
      req.flash('error', 'news not found with id = ' + req.params.id)
      res.redirect('/ru/services')
    }
    else {
      res.render('ru/read-services', {
        id: rows[0].id,
        heading: rows[0].heading,
        description: rows[0].description,
      })
    }
  })
});
module.exports = router;
