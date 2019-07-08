const User = require('../models/user')

module.exports.profile = function(req,res){
    // res.end('<h1>User Profile</h1>');
    return res.render('users_profile',{
        title: 'Profile'
    });
}

module.exports.signIn = function(req,res){
    return res.render('users_sign_in',{
        title: "SignIn"
    })
}

//signup ne user
module.exports.create = function(req,res){
    //TODO
    if( req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
  
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.log('Error',err);
            return;
        }
        if(!user){
            User.create( req.body ,function(err,user){
              if(err){
                console.log('Error',err);
                return;
              }
              return res.redirect('/users/sign-in'); 
            })
        }
        else{
            return res.redirect('back');
        }
    })


}

//signin and create session 
module.exports.createSession = function(req,res){
    // TODO
}


module.exports.signUp = function(req,res){
    return res.render('users_sign_up',{
        title: "SignUp"
    })
}