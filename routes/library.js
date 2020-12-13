const express = require("express");
const router = express.Router();
const UserService = require("../services/books"); // from service books
const ServicesB = new UserService();
const UserServiceS = require("../services/students"); // from service students
const ServicesS = new UserServiceS();
const UserServiceL = require("../services/library"); // from service library
const ServicesL = new UserServiceL();
const authServiceS = require("../auth/strategies/jwtMiddleware").verify_student; // from service middleware

// get all books
router.get("/all_books", authServiceS, async(decoded, req, res, next) => {
    await ServicesS.check_user(decoded.data.email).then(async(data) => {
        if (data !== undefined && data.length !== 0) {
            const All_books = await ServicesB.findAll();
            res.send(All_books);
        } else {
            res.send("first login...!!");
        }
    });
});

// get book by name
router.get("/books/:name", authServiceS, (decoded, req, res, next) => {
    ServicesS.check_user(decoded.data.email)
        .then(async(data) => {
            if (data !== undefined && data.length !== 0) {
                let books = await ServicesB.find_by_name(req.params.name);
                if (books !== undefined && books.length !== 0) {
                    await res.send(books);
                } else {
                    await res.send({ message: "books not found" });
                }
            } else {
                res.send("first login...!!");
            }
        })
        .catch((error) => {
            res.send(error);
        });
});

// register book in library database
router.post("/bookSS/:name", authServiceS, (decoded, req, res, next) => {
    let books = req.params.name;
    let { librarian_id } = req.body; // taking input from body
    ServicesS.check_user(decoded.data.email)
        .then(async(data) => {
            console.log("fghjnjkhdj");
            if (data !== undefined && data.length !== 0) {
                let book = await ServicesB.find_by_name(books);
                // console.log(book);
                if (book !== undefined && book.length !== 0) {
                    let library_data = {
                        student_name: data.name,
                        book_name: book.name,
                        book_id: book.id,
                        student_id: data.id,
                        librarian_id: librarian_id,
                    };
                    let inserted = await ServicesL.createUsers_librarian(library_data);
                    if (inserted !== undefined && inserted.length !== 0) {
                        console.log(inserted);
                        await ServicesB.deleteBook_by_name(books);
                        res.send({
                            message: `successfully register book !!`,
                        });
                    } else {
                        console.log("something went wrong");
                    }
                } else {
                    await res.send({ message: "books not found" });
                }
            } else {
                res.send("first login...!!");
            }
        })
        .catch((err) => {
            res.send(err);
        });
});

// book bookSubmit
router.post("/bookSubmit", authServiceS, (decoded, req, res, next) => {
    // let books = req.params.name;
    let { name, Author } = req.body;
    // console.log(name);
    ServicesS.check_user(decoded.data.email)
        .then(async(data) => {
            if (data !== undefined && data.length !== 0) {
                let book = await ServicesB.find_by_name(name);
                // console.log(book, "dfghjk");
                if (book !== undefined && book.length !== 0) {
                    await res.send({ message: "book already exists !!" });
                } else {
                    await ServicesB.createBooks({ name: name, Author: Author });
                    await res.send({ message: "book successfully submitted !!" });
                }
            } else {
                res.send("first login...!!");
            }
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;