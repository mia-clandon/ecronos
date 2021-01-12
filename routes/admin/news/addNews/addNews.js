let express = require('express');
let router = express.Router();
let upload = require('../../../../middlewares/uploadImages');
let uploadController = require('../../../../controllers/uploadNews');

message = '';
router.get('/', async (req, res, next) => {
    let user = req.session.user;
    if(user) {
        res.render('admin/news/addNews/add-news', message);
    } else {
        res.render('admin/auth/login')
    }
});

router.post('/add-new', upload.single('profile'), uploadController.uploadFiles, async function (req, res, next) {
    try {
        if (!req.file) {
            console.log("Not");
            message = "Ошибка, файл незагружен";
            res.redirect('/admin/news/addNews/add-news', {message, status: 'danger'});
        } else {
            console.log('yes');
            console.log(req);
            message = "Загрузка прошла успешно";
            res.render('admin/news/showNews/show-news', {message: message, status: 'success'});
        }
    } catch (e) {
        console.log(e)
    }

});

module.exports = router;
