const express = require("express");
const router = express.Router();
const UserService = require("../services/books");
const ServicesB = new UserService();
const authServiceL = require("../auth/strategies/jwtMiddleware")
    .verify_librarian;
const UserServicel = require("../services/librarian");
const ServicesLibrarian = new UserServicel();

// insert all books
router.post("/insertBooks", authServiceL, async(req, res, next) => {
    await ServicesB.createBooks(req.body)
        .then((book) => {
            res.send({
                success: ` id is  ${book.id}, ${book.name} ,inserted successfully in library`,
            });
        })
        .catch((err) => {
            res.send(err);
            console.log(err);
        });
});

// get all books
router.get("/books", authServiceL, async(req, res, next) => {
    const All_books = await ServicesB.findAll();
    res.send(All_books);
});

// get book by name
router.get("/book/:name", authServiceL, async(req, res, next) => {
    const book_Details = await ServicesB.find_by_name(req.params.name);
    if (book_Details !== undefined) {
        res.send(book_Details);
    } else {
        res.send("not found");
    }
});

// update
router.put("/update_book/:name", authServiceL, async(req, res, next) => {
    const book_Detail = await ServicesB.find_by_name(req.params.name);
    if (book_Detail !== undefined) {
        const book_update = await ServicesB.updateByBookName(
            req.params.name,
            req.body
        );
        res.send("update book successfully");
    } else {
        res.send("not found");
    }
});

// delete
router.delete("/delete_books/:name", authServiceL, async(req, res, next) => {
    let delete_book = req.params.name;
    const Details = await ServicesB.find_by_name(delete_book);
    if (Details !== undefined) {
        const book_Details = await ServicesB.deleteBook_by_name(delete_book);
        res.send("delete book successfully");
    } else {
        res.send("not found");
    }
});

router.get("/all", authServiceL, async(req, res, next) => {
    console.log("hello");
    const all_data = await ServicesLibrarian.find();
    console.log(all_data);
    res.send(all_data);
});

module.exports = router;