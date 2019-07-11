
const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(req,res){
   Post.findById(req.body.post,function(err,post){

    if(post){
      Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
      },function(err,comment){
        
        if(comment){
          //add comment to the post why i dont tell you explore yourself
          
          post.comments.push(comment);//given by mongodb
          post.save();

          res.redirect('/');
        }
      })
    }
   });
}