let express = require('express');
let router = express.Router();
let pool = require('../../core/pool');
let upload = require('../../middlewares/uploadImages');
let uploadController = require('../../controllers/uploadImages');

message = '';
router.get('/', async (req, res, next) => {
    res.render('admin/news/add_news/add-news', message);
});

router.post('/add-new', upload.single('profile'), uploadController.uploadFiles, function (req, res, next) {
    message: "Error"
    if (!req.file) {
        console.log("Not");
        message = "Error"
        res.redirect('/admin/news/add_news/add-news', {message, status: 'danger'});
    } else {
        console.log('yes');
        console.log(req);
        message = "Succesfully! uploaded";
        res.render('admin/show-news', {message: message, status: 'success'});
    }

});

module.exports = router;
