const { constants } = require("buffer")
const { query } = require("express")
const express = require("express")
const userController = require('../controller/userController')

const router = express.Router()

//user routes

router.get('/', userController.getAll_user_get)
//sign up route
router.post('/signup', userController.createNew_user_post)
//sign up route
router.get('/signup', userController.createNew_user_get)

//login route
router.post('/login', userController.login_user_post)
//login route
router.get('/login', userController.login_user_get)

//logout route
router.get('/logout', userController.logout_user_get)


router.patch('/:id', userController.updateOne_user_pathch)

router.delete('/:id', userController.deleteOne_user_delete)



module.exports = router;

