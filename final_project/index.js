const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;
const app = express();
const SECRET_KEY = "hello this is my secret key for jwt";

app.use(express.json());

app.use(
  "/customer",
  session({
    secret: "fingerprint_customer",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
    },
  }),
);

app.use("/customer/auth/*", function auth(req, res, next) {
  //Write the authenication mechanism here
  const token = req.session?.authorization?.accessToken;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userInfo = decoded;

    next();
  } catch (err) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
