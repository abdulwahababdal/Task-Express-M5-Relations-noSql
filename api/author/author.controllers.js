const Author = require("../../models/Author");
const Post = require("../../models/Post");

exports.fetchAuthor = async (authorId, next) => {
  try {
    const author = await Author.findById(authorId);
    return author;
  } catch (error) {
    next(error);
  }
};

exports.authorsCreate = async (req, res, next) => {
  try {
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

exports.authorsDelete = async (req, res, next) => {
  try {
    await Author.findByIdAndRemove(req.author.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
exports.postsCreate = async (req, res, next) => {
  console.log("I am here");
  try {
    req.body.author = req.author.id;
    const newPost = await Post.create(req.body);
    await Author.findByIdAndUpdate(req.author.id, {
      $push: { posts: newPost._id },
    });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

exports.authorsUpdate = async (req, res, next) => {
  try {
    await Author.findByIdAndUpdate(req.author.id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.authorsGet = async (req, res, next) => {
  try {
    const authors = await Author.find({}, "-createdAt -updatedAt").populate(
      "posts"
    );
    res.json(authors);
  } catch (error) {
    next(error);
  }
};
