let multer = require('multer');
let path = require('path');
const DIR ='./public/images/news/';

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb("Please upload only images.", false);
    }
};

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, DIR)
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' +  Date.now() + path.extname(file.originalname));
    }
});


let uploadFile = multer({storage: storage, imageFilter: imageFilter});

module.exports = uploadFile;
