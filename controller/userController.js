const User = require("../model/userModel");
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")


const getAll_user_get = (req, res) => {
  const data = User.find({}).then((data) => {
    res.send(data);
  });
};


//create a jwt for login and signup first require jwt
const maxAge = 60 * 60 * 24 *30 * 12

const createToken = (id)=> {
  return jwt.sign({id},'mostafa',{expiresIn:maxAge} )
}

const createNew_user_post = async (req, res, next) => {
  const {userName, email, password, confirmPassword} = req.body
  try{
    const user = await User.create({userName, email, password, confirmPassword});
    const token = createToken(user._id)
    // console.log(user._id);
    // console.log(createToken(user._id));
    res.cookie('jwt', token ,{maxAge:maxAge*1000})
    res.redirect('/')
    
    // .status(201).json({
    //   status:'success',data:{newuser:user}})
    
    // res.redirect('/blog');  
    // res.status(201).json({
    //   status:'success',
    //   data:{
    //     newuser:user
    //   }
    // })

  }catch(err){
    console.log(err);
  }
};



const createNew_user_get = async (req, res, next) => {
  res.render('signup', { title: 'signup' });

};

const login_user_get = async (req, res, next) => {
  res.render('login', { title: 'login' });

};

const login_user_post = async (req, res, next) => {
  const {email, password} = req.body
  try{
    const user =await User.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token ,{maxAge:maxAge*1000})
    res.status(200).json({ user: user._id });

    console.log('entered');
  }catch(err){
    console.log(err);
  }
};

const updateOne_user_pathch = async (req, res, next) => {
  const cond = { _id: req.params.id };

  User.updateOne(cond, req.body)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
};

const deleteOne_user_delete = async (req, res, next) => {
  const cond = { _id: req.params.id };

  User.deleteOne(cond, req.body)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
};

const logout_user_get = async (req, res, next) => {

res.cookie('jwt', '', {maxAge:1})
res.redirect('/about')
// res.cookie('jwt', token ,{maxAge:maxAge*1000})

};

module.exports = { getAll_user_get, createNew_user_post, updateOne_user_pathch, deleteOne_user_delete ,createNew_user_get 
  , login_user_get , login_user_post, logout_user_get};
