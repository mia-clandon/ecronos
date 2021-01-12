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
// db.sequelize.sync(function(err){});
let indexRouter = require('./routes');
let companyRouter = require('./routes/user_ru/company/showCompany/company');
let servicesRouter = require('./routes/user_ru/services/showServices/services');
let newsRouter = require('./routes/user_ru/news/showNews/news');
let contactsRouter = require('./routes/user_ru/contacts/showContacts/contacts');
let cabinetRouter = require('./routes/user_ru/cabinet/showCabinet/cabinet');
let mailingRouter = require('./routes/user_ru/mailing/mailing');
let adminRouter = require('./routes/admin/auth/login/adminlogin');
let adminAddServicesRouter = require('./routes/admin/services/addServices/add-services');
let adminAddNewsRouter = require('./routes/admin/news/addNews/addNews');
let adminAddMailingRouter = require('./routes/admin/mailing/addMailing/add_mailing');
let adminMailingRouter = require('./routes/admin/mailing/mailing');
let adminAddStatusMailingRouter = require('./routes/admin/mailing/status_mailing/addStatusMailing/add_status_mailing');
let adminShowNewsRouter = require('./routes/admin/news/showNews/show-news');
let adminShowServicesRouter = require('./routes/admin/services/showServices/show-services');
let adminHomePageRouter = require('./routes/admin/admin');

let enIndexRouter = require('./routes/user_en/en-index/showIndex/en_index');
let enCompanyRouter = require('./routes/user_en/en-company/showCompany/en_company');
let enNewsRouter = require('./routes/user_en/en-news/showNews/en_news');
let enServicesRouter = require('./routes/user_en/en-services/showServices/en_services');
let enContactsRouter = require('./routes/user_en/en-contacts/showContacts/en_contacts');
let enCabinetRouter = require('./routes/user_en/en-cabinet/showCabinet/en_cabinet');
let enMailingRouter = require('./routes/user_en/en-mailing/mailing');


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
app.use('/admin', adminRouter);
app.use('/admin/add-services', adminAddServicesRouter);
app.use('/admin/add-news', adminAddNewsRouter);
app.use('/admin/add-mailing', adminAddMailingRouter);
app.use('/admin/mailing', adminMailingRouter);
app.use('/admin/add-status-mailing', adminAddStatusMailingRouter);
app.use('/admin/show-news', adminShowNewsRouter);
app.use('/admin/show-services', adminShowServicesRouter);
app.use('/admin/home', adminHomePageRouter);
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
