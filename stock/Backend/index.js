//Importing necessary modules and models
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Authroute = require("./routes/authroute")
const product = require("./routes/product");
const stock = require("./routes/stock")

// Database Connection
// Replace <username>, <password>, <cluster>, and <dbname> with your MongoDB Atlas credentials.
mongoose.connect("mongodb://localhost:27017/sms")
    .then(() => console.log("Database connected successfully"))
    .catch((err) => console.log("Database connection failed", err));
// Starting the Application
const port = 8000;
app.listen(port, () => {
    console.log(`App is running at ${port}`);
});
// Middleware Configuration
// Body-parser to parse incoming request bodies as JSON
app.use(bodyParser.json());
// Cookie-parser for handling cookies
app.use(cookieParser());
// CORS for enabling Cross-Origin Resource Sharing
app.use(cors());
// Routing
// Mounting authentication-related routes under the '/api' endpoint
app.use("/api", Authroute);

app.use("/api", product);

app.use("/api", stock);