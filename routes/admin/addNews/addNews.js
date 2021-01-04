let express = require('express');
let router = express.Router();
let pool = require('../../../core/pool');
let upload = require('../../../middlewares/uploadImages');
let uploadController = require('../../../controllers/uploadNews');

message = '';
router.get('/', async (req, res, next) => {
    res.render('admin/news/add_news/add-news', message);
});

router.post('/add-new', upload.single('profile'), uploadController.uploadFiles, async function (req, res, next) {
    try {
        if (!req.file) {
            console.log("Not");
            message = "Ошибка, файл незагружен";
            res.redirect('/admin/news/add_news/add-news', {message, status: 'danger'});
        } else {
            console.log('yes');
            console.log(req);
            message = "Загрузка прошла успешно";
            res.render('admin/show-news', {message: message, status: 'success'});
        }
    } catch (e) {
        console.log(e)
    }

});

module.exports = router;