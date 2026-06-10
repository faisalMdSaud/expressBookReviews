const express = require("express");
const jwt = require("jsonwebtoken");
let getBookWithIsbn = require("./booksdb.js").getBookWithIsbn;
const regd_users = express.Router();
const { body, validationResult } = require("express-validator");
const { books } = require("./booksdb.js");

let users = [
  {
    firstName: "Ahmed",
    lastName: "Faisal",
    dob: "1998-08-01",
    username: "ahmed",
    password: "123456",
  },
  {
    firstName: "Harun",
    lastName: "Bashar",
    dob: "1995-08-01",
    username: "harun",
    password: "123456",
  },
];
const SECRET_KEY = "hello this is my secret key for jwt";

const isValid = (username) => {
  return !users.find((user) => user.username == username);
};

const authenticatedUser = (username, password) => {
  return users.find(
    (user) => user.username === username && user.password === password,
  );
};

const validateLoginInputs = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

regd_users.post("/login", validateLoginInputs, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: JSON.stringify(errors.array()) });

    const { username, password } = req.body;
    const user = authenticatedUser(username, password);

    if (!user)
      return res
        .status(400)
        .json({ message: "Unable to login with invalid credentials" });

    let accessToken = jwt.sign(
      {
        username: user.username,
      },
      SECRET_KEY,
      { expiresIn: 60 * 60 },
    );

    req.session.authorization = {
      accessToken,
    };

    return res.status(200).json({
      message: "Login successful",
      token: accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

const reviewValidation = [
  body("review")
    .trim()
    .notEmpty()
    .withMessage("Review is required")
    .isLength({ min: 10 })
    .withMessage("Review must be at least 10 characters"),
];

// Add a book review
regd_users.put("/auth/review/:isbn", async (req, res) => {
  const { isbn } = req.params;
  const { review } = req.query;
  try {
    if (!review) return res.status(400).json({ message: "review is required" });

    const book = await getBookWithIsbn(isbn);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    const userName = req.userInfo?.username;

    if (!userName) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    let message = !book.reviews[userName]
      ? "Book Review has been added"
      : "Book Review has been updated";

    book.reviews[userName] = review;

    const otherBooks = books.filter((book) => book.isbn !== isbn);
    otherBooks.push(book);

    return res.status(300).json({ message: message, book: book });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Delete book review
regd_users.delete("/auth/review/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const userName = req.userInfo?.username; // from auth middleware

    if (!userName) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const book = await getBookWithIsbn(isbn);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // delete review for this user
    if (book.reviews && book.reviews[userName]) {
      delete book.reviews[userName];
    } else {
      return res.status(404).json({ message: "Review not found for user" });
    }

    return res.status(200).json({
      message: `Review for ISBN ${isbn} deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});
module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
