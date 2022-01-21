const { constants } = require("buffer")
const { query } = require("express")
const express = require("express")
const blogController = require('../controller/blogController')
const {authmiddleware,checkUser} = require('../middleware/authMiddleware')


const router = express.Router()

//blog routes
router.get('/',authmiddleware, blogController.getAll_get)
router.get('/create', authmiddleware, blogController.blog_create_get)
router.post('/', authmiddleware, blogController.createNew_post)
router.patch('/:id', authmiddleware, blogController.updateOne_pathch)
router.delete('/:id', blogController.deleteOne_delete)


module.exports = router;

