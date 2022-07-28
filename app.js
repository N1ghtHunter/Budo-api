const express = require("express");
const path = require("path");
const { mainModule } = require("process");
const app = express();
app.use(express.urlencoded({ extended: false }));
//Database
const db = require("./config/database");

// Test DB
db.authenticate()
	.then(() => console.log("Database connected..."))
	.catch((err) => console.log("Error: " + err));
//EJS
app.set("view engine", "ejs");
//parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));
//index route
app.get("/", (req, res) => res.send("INDEX"));
//user route
app.use("/users", require("./routes/users"));
app.use("/communities", require("./routes/communities"));
let PORT = process.env.PORT || 3000;

module.exports = app.listen(PORT, console.log(`Server started on port ${PORT}`));
