const path = require('path');
const ctrl = {};
const helpers = require('../helpers/libs');
const fs = require('fs-extra');
const {
    Image
} = require('../models/index');



ctrl.index = async (req, res) => {
    
  let viewModel = { image: {}};

  const image = await Image.findOne({
    filename: { $regex: req.params.image_id },
  }).lean();

  // if image does not exists
//   if (!image) return next(new Error("Image does not exists"));

//   // increment views
//   const updatedImage = await Image.findOneAndUpdate(
//     { _id: image.id },
//     { $inc: { views: 1 } }
//   ).lean();

  viewModel.image = image;

  // get image comments
//   const comments = await Comment.find({ image_id: image._id }).sort({
//     timestamp: 1,
//   });

//   viewModel.comments = comments;
//   viewModel = await sidebar(viewModel);

  console.log(viewModel);
  res.render("image", viewModel);
};
ctrl.create = (req, res) => {

    const saveImage = async () => {
        const imgName = randomNumber();
        const images = await Image.find({
            filename: imgName
        });

        if (images.length > 0) {
            saveImage();
        } else {

            const imageTemPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath = path.resolve(`src/public/upload/${imgName}${ext}`)

            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imageTemPath, targetPath);
                const newImg = new Image({
                    title: req.body.title,
                    description: req.body.description,
                    filename: imgName + ext,
                    uniqueID: imgName

                });


                const imageSaved = await newImg.save();
                res.send('works!')
                //    res.redirect('/images');
            } else {
                await fs.unlink(imageTemPath);
                res.status(500).json({
                    error: 'Solo se permiten Imagenes'

                })
            }
        }
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