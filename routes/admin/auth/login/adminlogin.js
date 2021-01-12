const express = require('express');
const {getFindUser, getCreateUser, loginUser} = require('../../../../core/models/user');
const router = express.Router();

router.get('/', (req, res, next) => {
  let user = req.session.user;
  if(user) {
    res.redirect('/admin/home');
    return;
  }
  res.render('admin/auth/login');
});

// Get home page
router.get('/home', (req, res, next) => {
  let user = req.session.user;

  if(user) {
    res.render('admin/home', {opp:req.session.opp, name:user.fullname});
    return;
  }
  res.redirect('/admin/auth/login');
});
router.post('/login', (req, res, next) => {
  loginUser(req.body.username, req.body.password, function(result) {
    if(result) {
      req.session.user = result;
      req.session.opp = 1;
      res.redirect('/admin/home');
    }else {
      res.render('admin/auth/login', {message: 'Пароль или логин неверен'});
    }
  })
});
router.post('/register', (req, res, next) => {
  let userInput = {
    username: req.body.username,
    fullname: req.body.fullname,
    password: req.body.password
  };
  getCreateUser(userInput, function(lastId) {
    if(lastId) {
      getFindUser(lastId, function(result) {
        req.session.user = result;
        req.session.opp = 0;
        res.redirect('/home');
      });
    }else {
      res.render('admin/admin', {message: 'Ошибка при создании нового пользователя'});
    }
  });
});


// Get loggout page
router.get('/loggout', (req, res, next) => {
  if(req.session.user) {
    req.session.destroy(function() {
      res.redirect('/admin/auth/login');
    });
  }
});

module.exports = router;
