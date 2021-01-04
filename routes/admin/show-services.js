let express = require('express');
let router = express.Router();

let pool = require('../../core/pool');

router.get('/', function(req, res, next) {
  let user = req.session.user;
  if (user) {
    const query = 'SELECT * FROM services order by id asc';
    pool.query(query, function (err, rows) {
      if (err) {
        req.flash('error', err);
        res.render('admin/show-services', {data: ''});
      } else {
        res.render('admin/show-services', {data: rows})
      }
    })
    } else {
      res.render('admin/admin');
    }
});
  router.get('/show-services/(:id)', function(req, res, next){
    let user = req.session.user;
    if (user) {
      let query = 'SELECT * FROM services WHERE id = ' + req.params.id;

      pool.query(query, function (err, rows, fields) {
        if (err) throw err

        // if topic not found
        if (rows.length <= 0) {
          req.flash('error', 'news not found with id = ' + req.params.id)
          res.redirect('/admin/show-services')
        } else { // if topic found
          // render to views/topic/edit.ejs template file
          res.render('admin/show-services', {
            id: rows[0].id,
            heading: rows[0].heading,
            description: rows[0].description,
          })
        }
      })
    } else {
      res.render('admin/admin');
    }
  });
  module.exports = router;
