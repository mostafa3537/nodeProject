const { redirect } = require("express/lib/response")
const jwt = require("jsonwebtoken")
const User = require('../model/userModel')

//protect routing
const authmiddleware = (req,res,next) => {

    const token = req.cookies.jwt

    if(token){
        jwt.verify(token, 'mostafa', (err,decodedToken) =>{
            if(err){
               res.redirect('/user/login')
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        res.redirect('/user/login')
    }
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'mostafa', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          // return user
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

  module.exports = { authmiddleware, checkUser}

















