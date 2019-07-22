const Like = require('../models/like');
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.toggleLike = async function(req,res){
    try {
    // likes toggle/?id=nnvjkj&type=

     let likeable;
     let deleted = false;

     if(req.query.type == 'Post'){
         likeable = await Post.findById(req.query.id).populate('likes');
     }else{
         likeable = await Comment.findById(req.query.id).populate('likes');
     }

    //  check if like already exists
    let existingLike = await Like.findOne({
       likeable: req.query.id,
       onModel: req.query.type,
       user: req.user._id
    })

    // if like already exist then delete it
    if(existingLike){
    //   delete the like
     likeable.likes.pull(existingLike._id);
     likeable.save();

     existingLike.remove();
     deleted = true;
    }else{
    // create a new like
      let newLike = await Like.create({
          user: req.user._id,
          likeable: req.query.id,
          onModel: req.query.type
      })
      likeable.likes.push(newLike._id);
      likeable.save();
    }
    if(req.xhr){
        return res.status(200).json({
            data: {
                deleted: deleted
            },
          message: "Request successful"
        })
    
    }
    // return res.json(200,{
    //     message: "Request successful",
    //     data: {
    //         deleted: deleted
    //     }
    // })
    return res.redirect('back');

    } catch (err) {
        console.log(err);
        return res.json(500,{
            message: 'Internal Server Error'
        })
    }
}