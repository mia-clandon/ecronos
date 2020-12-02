let express = require('express');
let router = express.Router();
let pool = require('../../core/pool');
let upload = require('../../middlewares/uploadImages');
let uploadController = require('../../controllers/uploadImages');

message = '';
router.get('/', async (req, res, next) => {
    res.render('admin/add-news', message);
});

router.post('/add-new', upload.single('profile'), uploadController.uploadFiles, function (req, res, next) {
    message: "Error"
    if (!req.file) {
        console.log("Not");
        message = "Error"
        res.redirect('/admin/add-news', {message, status: 'danger'});
    } else {
        console.log('yes');
        console.log(req);
        message = "Succesfully! uploaded";
        res.render('admin/home', {message: message, status: 'success'});
    }

});

module.exports = router;
