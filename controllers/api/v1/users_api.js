
const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

//signin and create session 
module.exports.createSession = async function(req,res){
     try {
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
          return res.json(422,{
              message: "Invalid User/Password"
          })
        }
        // if user passowrd match and user is found
        return res.json(200,{
            meassage: "Sign in sucessul here is your token plz keep it safe",
            // pass token using jwtwebtoken and  user.toJSON() is encripted and there is a header and signature available ith expiration time
            data: {
                token: jwt.sign(user.toJSON(),'codial',{expiresIn: '100000'})
            }
        })

     } catch (error) {
         console.log('*****',err);
         return res.json(500,{
             message: "Internal server error"
         })
     }
}
