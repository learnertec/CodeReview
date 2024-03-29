const Post = require('../models/post');
const Comment = require('../models/comment');
const Like = require('../models/like');

// async await conversion of normal function
module.exports.create = async function(req,res){
    try{
        let post = await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        if(req.xhr){
            return res.status(200).json({
              data: {
                  post: post
              },
              message: "Post created!"
            });
        }
        req.flash('success',"Post published!.")
        return res.redirect('back');
    }catch(err){
        req.flash('error','Error in post creation');
    // console.log('Error',err);
    return;
    }
}
     
//      Post.create({
//          content: req.body.content,
//          user: req.user._id
//      },function(err,post){
//          if(err) {
//              console.log('error in creating the post');
//               return;
//             }
//            return res.redirect('back');

//      })
// }

// async await conversion of normall function
module.exports.destroy = async function(req,res){
   try{

    let post = await Post.findById(req.params.id);
    if(post.user == req.user.id){

        await Like.deleteMany({likeable: post,onModel: 'Post'});
        await Like.deleteMany({_id: {$in: post.comments}});

        post.remove();
    
        await Comment.deleteMany({ post: req.params.id})
            
        if(req.xhr){
            return res.status(200).json({
                data: {
                    post_id: req.params.id
                },
                message: "Post deleted "
            })
        }

        req.flash('error','Post and associated comments deleted.');
        return res.redirect('back');
    } else{
        return res.redirect('back');
    }

   }catch(err){
       req.flash('error',err);
    //    console.log('Error',err);
       return ;
   }
}
 

// module.exports.destroy = function(req,res){
//     Post.findById(req.params.id,function(err,post){
//        //  when comparing ids of two object we need to convert it on string so we use user.id and not user._id
//        // .id means converting objectId into string
//         if (post.user == req.user.id){
//             post.remove();
      
//             Comment.deleteMany({ post: req.params.id},function(err){
//                 return res.redirect('back');
//             })
     
//         }else{
//             return res.redirect('back');
//         }
//     });
//    }