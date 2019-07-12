 const Post = require('../models/post');
 const User = require('../models/user');

// module.exports.home = function(req,res){
//     // populate the user of each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function(err,posts){
//         User.find({},function(err,users){
//             return res.render('home',{
//                 title: 'Codial | Home',
//                 posts: posts,
//                 all_users: users
//             });
//         })
        
//     })
      
// }

// using async await for the problem of callback hell
module.exports.home = async function(req,res){

     try{
        let posts = await Post.find({}).populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });
    
        let users = await User.find({});
    
        return res.render('home',{
                            title: 'Codial | Home',
                            posts: posts,
                            all_users: users
                        });
     }catch(err){
     console.log('Error',err);
     }
  
}


// using then promise based
// Post.find({}).populate('comments').then(function(){});


// Using exac
// let post = Post.find({}).populate('comments').exac();
// post.then()

// Asinc await