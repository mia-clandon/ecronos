let express = require('express');
let router = express.Router();
let pool = require('./../../core/pool');
let {getCreateNewService} = require('./../../core/models/modelService');

router.get('/', function (req, res) {
    let user = req.session.user;
    if(user) {
        res.render('admin/add-services', message)
    }
    res.redirect('/admin');
});

router.post('/add-service', async (req, res, next) => {
    let user = req.session.user;
    if (user) {
        const serviceInput = {
            heading: req.body.heading,
            description: req.body.description,
            en_heading: req.body.en_heading,
            en_description: req.body.en_description,
            excerpt_description: req.body.excerpt_description,
            excerpt_en_description: req.body.excerpt_en_description,
        };
        getCreateNewService(serviceInput, function (lastId) {
            if (lastId) {
                res.render('admin/add-services');
            } else {
                console.log("Что-то пошло не так");
            }
        });
    } else {
        res.redirect('/admin');
    }
});

module.exports = router;
