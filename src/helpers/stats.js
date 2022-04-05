const {
    Comment,
    Image
} = require('../models')

async function imageCounter() {
    return await Image.countDocuments();
}

async function commentsCounter() {
    return await Comment.countDocuments();
}

async function imageTotalViewCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            viewsTotal: {
                $sum: '$views'
            }
        }
    }]);
    let viewsTotal = 0;
    if (result.length > 0) {
      viewsTotal += result[0].viewsTotal;
    }
    return viewsTotal;
}


async function imageLikesTotalCounter() {
    const result = await Image.aggregate([{
        $group: {
            _id: '1',
            likesTotal: {
                $sum: '$likes'
            }
        }
    }]);
 
    let likesTotal = 0;
    if (result.length > 0) {
      likesTotal += result[0].likesTotal;
    }
    return likesTotal;
}
module.exports = async () => {
   const results = await Promise.all([
        imageCounter(), commentsCounter(), imageTotalViewCounter(), imageLikesTotalCounter()
    ])

    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }

}