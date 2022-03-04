const path = require('path');
const ctrl = {};
const helpers = require('../helpers/libs');
const fs = require('fs-extra');
const { Image } = require('../models/index');



ctrl.index = (req, res) => {

};
ctrl.create = (req, res) => {

    const saveImage = async () => {
        const imgName = randomNumber();
        const images = await Image.find({ filename: imgName });
      
        if (images.length > 0) {
          saveImage();
        } else {
   
    const imageTemPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    console.log(ext)
    const targetPath = path.resolve(`src/public/upload/${imgName}${ext}`)

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
        await fs.rename(imageTemPath, targetPath);
        const newImg = new Image({
            title: req.body.title,
            description: req.body.description,
            filename: imgName + ext

        });
            res.send('works!')

        const imageSaved = await newImg.save();

    } else {
        await fs.unlink(imageTemPath);
        res.status(500).json({
            error: 'Solo se permiten Imagenes'
        
        })
    }}
}
saveImage();
};
ctrl.like = (req, res) => {

};
ctrl.comment = (req, res) => {

};
ctrl.remove = (req, res) => {

};


module.exports = ctrl;