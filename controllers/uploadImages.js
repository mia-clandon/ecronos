const fs = require("fs");

const db = require("../core/SequilizeCore");
const Image = db.images;
const DIR ='./public/images/news/';


const uploadFiles = async (req, res) => {
    try {
        console.log(req.file);

        if (req.file == undefined) {
            return res.send(`You must select a file.`);
        }

        Image.create({
            type: req.file.mimetype,
            name: req.file.originalname,
            heading: req.body.heading,
            en_heading: req.body.en_heading,
            description: req.body.description,
            en_description: req.body.en_description,
            data: fs.readFileSync(
                DIR + req.file.filename
            ),
            dateAdd: req.body.dateAdd,
        }).then((image) => {
            fs.writeFileSync(
                DIR + image.name,
                image.data
            );
            return res.render('home');
        });
    } catch (error) {
        console.log(error);
        return res.send(`Error when trying upload images: ${error}`);
    }
};

module.exports = {
    uploadFiles,
};
