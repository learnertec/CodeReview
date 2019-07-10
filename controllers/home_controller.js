 const Post = require('../models/post');

module.exports.home = function(req,res){
    // return res.end('<h1>Express is up for codial</h1>');
    // Populating the user of each posts
    Post.find({}).populate('user').exec(function(err,posts){
        return res.render('home',{
            title: 'Codial Home',
            posts: posts
        });
    })
      
}