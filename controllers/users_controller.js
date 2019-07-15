const User = require('../models/user')
const fs = require('fs');
const path = require('path');

// No nesting only one callback level so don't need to convert it into async await
module.exports.profile = function(req,res){
    User.findById(req.params.id,function(err,user){
       // res.end('<h1>User Profile</h1>');
    return res.render('users_profile',{
        title: 'Profile',
        profile_user: user
     });    
    })
   
}

module.exports.signIn = function(req,res){
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
       }
       
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


module.exports.update = async function(req,res){
    //   if (req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body,function(err,user){
    //         return res.redirect('back');
    //     })
    //   } else{
    //      return  res.status(401).send('Unauthorized');
    //   } 
    
    if (req.user.id == req.params.id){
       try {
        let user = await User.findById(req.params.id);
           User.uploadedAvatar(req,res,function(err){
               if(err){
                   console.log('*****multer error',err);
               }
               user.name = req.body.name;
               user.email = req.body.email;

               if(req.file){

                if(user.avatar){
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }
               
                //  saving the path of uploaded file to avatar field in user
                 user.avatar = User.avatarPath + '/' + req.file.filename;
               }
               user.save();
               return res.redirect('back');
               
           });
       } catch (err) {
          req.flash('error',err);
          return res.redirect('back'); 
       }
    } else{
      req.flash('error','Unauthorized');
      return  res.status(401).send('Unauthorized');
       } 

}

//signin and create session 
module.exports.createSession = function(req,res){
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}


module.exports.signUp = function(req,res){
      if (req.isAuthenticated()){
       return res.redirect('/users/profile');
      }
    return res.render('users_sign_up',{
        title: "SignUp"
    })  
}


module.exports.signOut = function(req,res){
    
      req.logout();

      req.flash('success','Logged out successfully');

    return res.redirect('/');
}
