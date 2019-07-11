 const Post = require('../models/post');

module.exports.home = function(req,res){
    // populate the user of each post
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: 'Codial | Home',
            posts: posts
        });
    })
  
      
}