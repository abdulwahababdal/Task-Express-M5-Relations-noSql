const express = require("express");
const router = express.Router();
const {
  authorsGet,
  authorsUpdate,
  authorsDelete,
  authorsCreate,
  fetchAuthor,
  postsCreate,
} = require("./author.controllers");

router.param("authorId", async (req, res, next, authorId) => {
  const author = await fetchAuthor(authorId, next);
  if (author) {
    req.author = author;
    next();
  } else {
    const err = new Error("Author Not Found");
    err.status = 404;
    next(err);
  }
});

router.get("/", authorsGet);
router.post("/", authorsCreate);
router.post("/:authorId/posts", postsCreate);

router.delete("/:postId", authorsDelete);

router.put("/:postId", authorsUpdate);

module.exports = router;
