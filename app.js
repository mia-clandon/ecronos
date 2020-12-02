let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let expressValidator = require('express-validator');
let flash = require('express-flash');
let session = require('express-session');
let bodyParser = require('body-parser');

global.__basedir = __dirname;

let mysql = require('mysql');
let pool  = require('./core/pool');
let db = require('./core/SequilizeCore');
let indexRouter = require('./routes');
let companyRouter = require('./routes/user_ru/company');
let servicesRouter = require('./routes/user_ru/services');
let newsRouter = require('./routes/user_ru/news');
let contactsRouter = require('./routes/user_ru/contacts');
let cabinetRouter = require('./routes/user_ru/cabinet');
let mailingRouter = require('./routes/user_ru/mailing');
let adminLoginRouter = require('./routes/admin/adminlogin');
let adminAddServicesRouter = require('./routes/admin/add-services');
let adminAddNewsRouter = require('./routes/admin/add-news');
let adminAddMailingRouter = require('./routes/admin/add_mailing');
let adminMailingRouter = require('./routes/admin/mailing');
let adminAddStatusMailingRouter = require('./routes/admin/add_status_mailing');
let adminShowNewsRouter = require('./routes/admin/show-news');
let adminShowServicesRouter = require('./routes/admin/show-services');
let adminHomePageRouter = require('./routes/admin/adminlogin');

let enIndexRouter = require('./routes/user_en/en_index');
let enCompanyRouter = require('./routes/user_en/en_company');
let enNewsRouter = require('./routes/user_en/en_news');
let enServicesRouter = require('./routes/user_en/en_services');
let enContactsRouter = require('./routes/user_en/en_contacts');
let enCabinetRouter = require('./routes/user_en/en_cabinet');
let enMailingRouter = require('./routes/user_en/mailing');


let app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'iftuEcrGsevaClas',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 360000000 }
}));

app.use(flash());
app.use(expressValidator());

app.use('/', indexRouter);
app.use('/o-kompanii', companyRouter);
app.use('/services', servicesRouter);
app.use('/news', newsRouter);
app.use('/contacts', contactsRouter);
app.use('/cabinet', cabinetRouter);
app.use('/mailing', mailingRouter);
app.use('/adminlogin', adminLoginRouter);
app.use('/admin', adminLoginRouter);
app.use('/adminlogin/add-services', adminAddServicesRouter);
app.use('/adminlogin/add-news', adminAddNewsRouter);
app.use('/adminlogin/add-mailing', adminAddMailingRouter);
app.use('/adminlogin/mailing', adminMailingRouter);
app.use('/adminlogin/add-status-mailing', adminAddStatusMailingRouter);
app.use('/adminlogin/show-news', adminShowNewsRouter);
app.use('/adminlogin/show-services', adminShowServicesRouter);
app.use('/adminlogin/home', adminHomePageRouter);
//english version

app.use('/en/index', enIndexRouter);
app.use('/en/o-kompanii', enCompanyRouter);
app.use('/en/news', enNewsRouter);
app.use('/en/services', enServicesRouter);
app.use('/en/contacts', enContactsRouter);
app.use('/en/cabinet', enCabinetRouter);
app.use('/en/mailing', enMailingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
