const path = require('path');
const ctrl = {};
const helpers = require('../helpers/libs');
const fs = require('fs-extra');
const {
    Image,
    Comment
} = require('../models/index');
const {
    findOneAndUpdate
} = require('../models/image');
const image = require('../models/image');
const sidebar = require('../helpers/sidebar')



ctrl.index = async (req, res, next) => {
    let viewModel = {
        image: {},
        comments: []
    };

    const image = await Image.findOneAndUpdate({
        filename: {
            $regex: req.params.image_id
        }
    }, {
        $inc: {
            views: 1
        }
    }).lean();
    if (!image) return next(new Error("Image does not exists"),
        res.redirect('/'));

    viewModel.image = image;

    const comments = await Comment.find({
        image_id: image._id
    }).sort({
        timestamp: 1,
    }).lean();

    viewModel.comments = comments;
    viewModel = await sidebar(viewModel);
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

                res.redirect('/images/' + imgName);
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
ctrl.like = async (req, res) => {
    const image = await Image.findOne({
        filename: { $regex: req.params.image_id },
      });
      if (image) {
        image.likes = image.likes + 1;
        await image.save();
        res.json({ likes: image.likes });
      } else {
        res.status(500).json({ error: "Internal Error" });
      }
    };


ctrl.comment = async (req, res) => {
    const image = await Image.findOne({
        filename: {
            $regex: req.params.image_id
        }
    });
    if (image) {
        const newComment = new Comment(req.body);
        newComment.image_id = image._id;
        console.log(newComment);
        await newComment.save();
        res.redirect('/images/' + image.uniqueID);

    }

};
ctrl.remove = async (req, res) => {
   const image =  await Image.findOne({filename:{$regex: req.params.image_id}});
if(image){
    await fs.unlink(path.resolve('./src/public/upload/' + image.filename))
    await Comment.deleteOne({image_id: image._id});
    await image.remove();
    res.json(true);
}
};


module.exports = ctrl;