const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const user_router = require("./routes/usersLogin_signUp");
app.use(user_router);
const teachers = require("./routes/teachers");
app.use(teachers);
const students = require("./routes/students");
app.use(students);
const librarian = require("./routes/librarian");
app.use(librarian);
const library = require("./routes/library");
app.use(library);
const superadmin = require("./routes/superAdmin");
app.use(superadmin);

app.get("/", (req, res) => {
    res.send("HELLO World");
});

app.listen(port, () => {
    console.log("port is running on " + port);
});