const Blog = require("../model/bolgModel");
const User = require("../model/userModel");

const getAll_get = (req, res) => {
  const data = Blog.find({}).populate({path:'auther',select:'userName'}).then((data) => {
    res.render('index', { blogs: data, title: 'All blogs' });
  });
};
const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
}
const createNew_post = async (req, res, next) => {
  const blog = new Blog(req.body);
  console.log(req.body);
  blog
    .save()
    .then((result) => {
      console.log(blog);
     res.redirect('/blog');  

    })
    .catch((err) => {
      console.log(err);
    });
};

const updateOne_pathch = async (req, res, next) => {
  const cond = { _id: req.params.id };

  Blog.updateOne(cond, req.body)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
};

const deleteOne_delete = async (req, res, next) => {
  const cond = { _id: req.params.id };
  console.log(req.params.id);
  Blog.deleteOne(cond, req.body)
    .then((doc) => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch((err) => next(err));
};

module.exports = { getAll_get, createNew_post, updateOne_pathch, deleteOne_delete , blog_create_get };
