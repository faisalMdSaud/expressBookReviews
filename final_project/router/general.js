const express = require("express");
let books = require("./booksdb.js").books;
let getBookWithIsbn = require("./booksdb.js").getBookWithIsbn;
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const { body, validationResult } = require("express-validator");

const validateUserData = [
  body("firstName")
    .isString()
    .withMessage("First Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("First Name is required")
    .matches(/^[A-Za-z]+$/)
    .withMessage("First Name must contain only letters"),

  body("lastName")
    .isString()
    .withMessage("Last Name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Last Name is required")
    .matches(/^[A-Za-z]+$/)
    .withMessage("Last Name must contain only letters"),

  body("username")
    .isString()
    .withMessage("Username must be a string")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .matches(/^[A-Za-z][A-Za-z0-9_]*$/)
    .withMessage(
      "Username must start with a letter and contain only letters, numbers, and underscores",
    ),

  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),

  body("dob")
    .optional()
    .isISO8601()
    .withMessage("DOB must be a valid date (YYYY-MM-DD)"),
];

public_users.post("/register", validateUserData, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: JSON.stringify(errors.array()) });
  }

  if (!isValid(req.body.username))
    return res.status(400).json({
      message: `User already exist with username: ${req.body.username}`,
    });

  await users.push(req.body);

  return res.status(300).json({
    message: `User registration has been successful for user: ${req.body.username}`,
  });
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  return res.status(300).json({
    message: "Books have been fetched successfully",
    books: JSON.stringify(books),
  });
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
  const isbn = req.params.isbn;
  const filteredBook = await books.filter((book) => book.isbn === isbn);
  if (!filteredBook[0])
    return res
      .status(400)
      .json({ message: `Not found any book with isbn: ${isbn} ` });

  return res.status(300).json({
    message: `Book has been filtered with isbn: ${isbn}`,
    bookDetails: JSON.stringify(filteredBook),
  });
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  //Write your code here
  const author = req.params.author;
  const filteredBook = await books.filter(
    (book) => book.author.toLowerCase() === author.toLowerCase(),
  );
  if (!filteredBook[0])
    return res
      .status(400)
      .json({ message: `Not found any book with author: ${author} ` });

  return res.status(300).json({
    message: `Books have been filtered with author: ${author}`,
    bookDetails: JSON.stringify(filteredBook),
  });
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
  const title = req.params.title;
  const filteredBook = await books.filter(
    (book) => book.title.toLowerCase() === title.toLowerCase(),
  );
  if (!filteredBook[0])
    return res
      .status(400)
      .json({ message: `Not found any book with title: ${title} ` });

  return res.status(300).json({
    message: `Books have been filtered with title: ${title}`,
    bookDetails: JSON.stringify(filteredBook),
  });
});

//  Get book review
public_users.get("/review/:isbn", async function (req, res) {
  const isbn = req.params.isbn;
  const filteredBook = await getBookWithIsbn(isbn);
  if (Object.keys(filteredBook?.reviews).length === 0)
    return res
      .status(400)
      .json({ message: `Not found any book's review with isbn: ${isbn} ` });

  return res.status(300).json({
    message: `Book's review has been filtered with isbn: ${isbn}`,
    reviews: JSON.stringify(filteredBook?.reviews),
  });
});

module.exports.general = public_users;
