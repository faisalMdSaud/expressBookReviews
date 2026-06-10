const { default: axios } = require("axios");
const express = require("express");
let books = require("./booksdb.js").books;
let getBookWithIsbn = require("./booksdb.js").getBookWithIsbn;
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const { body, validationResult } = require("express-validator");
const URL = "http://localhost:5000/async";
const booksArray = Object.values(books);

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
  try {
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
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  try {
    // let books = await require("./booksdb.js").books;
    let books = await axios.get(`${URL}/title/${title}`);
    // if (!books[0])
    //   return res.status(400).json({ message: `Not found any books` });

    return res.status(200).json(JSON.stringify(books));
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
  const { isbn } = req.params;
  try {
    const filteredBook = await axios.get(`${URL}/isbn/${isbn}`);
    //  const filteredBook = await booksArray.filter((book) => book.isbn === isbn);
    // if (!filteredBook[0])
    //   return res
    //     .status(400)
    //     .json({ message: `Not found any book with isbn: ${isbn} ` });

    return res.status(200).json(filteredBook);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  //Write your code here
  const { author } = req.params;
  try {
    const filteredBook = await axios.get(`${URL}/isbn/${author}`);

    // const filteredBook = await booksArray.filter(
    //   (book) => book.author.toLowerCase() === author.toLowerCase(),
    // );
    if (!filteredBook[0])
      return res
        .status(400)
        .json({ message: `Not found any book with author: ${author} ` });

    return res.status(200).json(filteredBook);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
  const { title } = req.params;
  try {
    const filteredBook = await axios.get(`${URL}/isbn/${title}`);
    // const filteredBook = await booksArray.filter(
    //   (book) => book.title.toLowerCase() === title.toLowerCase(),
    // );
    if (!filteredBook[0])
      return res
        .status(400)
        .json({ message: `Not found any book with title: ${title} ` });

    return res.status(200).json(filteredBook);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

//  Get book review
public_users.get("/review/:isbn", async function (req, res) {
  const { isbn } = req.params;

  try {
    const filteredBook = await getBookWithIsbn(isbn);
    if (Object.keys(filteredBook?.reviews).length === 0)
      return res
        .status(400)
        .json({ message: `Not found any book's review with isbn: ${isbn} ` });

    const firstReview = Object.values(filteredBook.reviews)[0];

    return res.status(200).json(firstReview);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

//for axios async/await TAsk 10-13

// Get the book list available in the shop

// Task 10
public_users.get("/promise", async function (req, res) {
  try {
    let books = await axios.get(`${URL}`);

    books = books?.data;

    if (!books[0])
      return res.status(400).json({ message: `Not found any books` });

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Get book details based on ISBN with promise
// Task 11
public_users.get("/promise/isbn/:isbn", async function (req, res) {
  const { isbn } = req.params;
  try {
    let filteredBook = await axios.get(`${URL}/isbn/${isbn}`);

    filteredBook = filteredBook?.data;

    if (!filteredBook[0])
      return res
        .status(400)
        .json({ message: `Not found any book with isbn: ${isbn} ` });

    return res.status(200).json(filteredBook);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Get book details based on author
// Task 12
public_users.get("/promise/author/:author", async function (req, res) {
  //Write your code here
  const { author } = req.params;
  try {
    let filteredBook = await axios.get(`${URL}/author/${author}`);

    filteredBook = filteredBook?.data;
    if (!filteredBook[0])
      return res
        .status(400)
        .json({ message: `Not found any book with author: ${author} ` });

    return res.status(200).json(filteredBook);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

// Get all books based on title
// Task 13
public_users.get("/promise/title/:title", async function (req, res) {
  const { title } = req.params;
  try {
    let filteredBook = await axios.get(`${URL}/title/${title}`);
    filteredBook = filteredBook?.data;

    if (!filteredBook[0])
      return res
        .status(400)
        .json({ message: `Not found any book with title: ${title} ` });

    return res.status(200).json(filteredBook);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports.general = public_users;
