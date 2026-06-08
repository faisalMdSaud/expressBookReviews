const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();
const { body, validationResult } = require("express-validator");

let users = [
  {
    firstName: "Ahmed",
    lastName: "Faisal",
    dob: "1998-08-01",
    username: "ahmed",
    password: "123456",
  },
];
const SECRET_KEY = "hello this is my secret key for jwt";

const isValid = (username) => {
  return users.some((user) => user.username == username);
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.

  console.log(username, password);

  return users.some(
    (user) => user.username === username && user.password === password,
  );
};

const validateLoginInputs = [
  body("username").trim().notEmpty().withMessage("Username is required"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

//only registered users can login
regd_users.post("/login", validateLoginInputs, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: JSON.stringify(errors.array()) });

  const { username, password } = req.body;

  if (!authenticatedUser(username, password))
    return res
      .status(400)
      .json({ message: "Unable to login with invalid credentials" });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });

  req.session.token = token;
  req.session.username = username;

  return res.status(200).json({
    message: "Login successful",
    token: token,
  });

  return res.status(300).json({ message: "Yet to be implemented yiu" });
});

// Add a book review
regd_users.put("/auth/review/:isbn", async (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
