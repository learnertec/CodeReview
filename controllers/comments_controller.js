
const Comment = require('../models/comment');
const Post = require('../models/post');
const commentMailer = require('../mailers/comments_mailer');
const Like = require('../models/like');

 module.exports.create = async function(req,res){
    try {
      let post = await Post.findById(req.body.post);

       if(post){
         let comment = await Comment.create({
           content: req.body.content,
           post: req.body.post,
           user: req.user._id
         });
         post.comments.push(comment);
         post.save();

         comment = await comment.populate('user','name email').execPopulate();
         commentMailer.newComment(comment);

         res.redirect('/');
       }
    } catch (err) {
      console.log('Error',err);
      return;
    }
 }


// module.exports.create = function(req,res){
//    Post.findById(req.body.post,function(err,post){

//     if(post){
//       Comment.create({
//         content: req.body.content,
//         post: req.body.post,
//         user: req.user._id
//       },function(err,comment){
         
//         if(comment){
//           //add comment to the post why i dont tell you explore yourself
          
//           post.comments.push(comment);//given by mongodb
//           post.save();
//           comment = comment.populate('user','name email').execPopulate();
//           commentMailer.newComment(comment);
//           res.redirect('/');
//         }
//       })
//     }
//    });
// }


// module.exports.destroy = function(req,res){
//     Comment.findById(req.params.id,function(err,comment){
//        if (comment.user == req.user.id){
//          let postId = comment.post
//          comment.remove();

//         Post.findByIdAndUpdate(postId,{ $pull: {comments: req.params.id}},function(err,post){
//           return res.redirect('back');
//         })
//        } else{
//          return res.redirect('back');
//        }

       
//     })
// }


module.exports.destroy = async function(req,res){
  try {
  let comment = await Comment.findById(req.params.id)
     if(comment.user == req.user.id){
       let postId = comment.post
       comment.remove();

     let post = await Post.findByIdAndUpdate(postId,{$pull: {comments: req.params.id}})
      
     await Like.deleteMany({likeable: comment._id,onModel: 'Comment'});
         
     if(req.xhr){
       return res.status(200).json({
         data: {
           comment_id: req.params.id
         },
         message: 'Post deleted'
       })
     }

       return res.redirect('back');
     }
   else {
    return res.redirect('back');
     }  
  } catch(err) {
    console.log('Error',err);
    return;
  }

}