const path = require('path');
const ctrl = {};
const helpers = require('../helpers/libs');
const fs = require('fs-extra');    

ctrl.index = (req, res) => {
       
};
ctrl.create = async (req, res) => {
    const imgName = randomNumber();
    console.log(imgName);
    const imageTemPath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    console.log(ext)
    const targetPath = path.resolve(`src/public/upload/${imgName}${ext}`)

    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif'){
        await fs.rename(imageTemPath, targetPath);

    }

    res.send('works!')
};
ctrl.like = (req, res) => {
       
};
ctrl.comment = (req, res) => {
       
};
ctrl.remove = (req, res) => {
       
};


module.exports = ctrl;