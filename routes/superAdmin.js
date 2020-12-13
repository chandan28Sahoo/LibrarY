const express = require('express');
const router = express.Router();
const UserService = require('../services/teachers');
const teacher = new UserService();
const authService = require('../auth/strategies/jwtMiddleware').verifySuperAdmin
const UserService2 = require('../services/librarian');
const librarian = new UserService2();

// get all
router.get('/getAll', authService, async(req, res, next) => {
    const All_users = await teacher.findAll()
    res.send(All_users)
})


// update 
router.put('/update_details/:email', authService, async(req, res, next) => {
    let mail = req.params.email
    await teacher.updateByEmail(mail, req.body)
    res.send(`message : ${mail} successfully Update  !!`)
})

// delete
router.delete('/delete_users/:name', authService, async(req, res, next) => {
    let delete_users = req.params.name;
    const book_Details = await teacher.deleteBook_by_name(delete_users);
    res.send("delete book successfully")
})


// principle
router.post('/librarian/:email', authService, async(req, res) => {
    let email1 = req.params.email;
    teacher.check_user(email1).then(async(user) => {
        if (user !== undefined) {
            console.log(user.name);
            await librarian.createUsers_librarian({ name: user.name, teacher_id: user.id })
            await res.send({ "success": `${user.name} is librarian !!` });
        } else {
            res.send("You are a unknown person")
        }
    }).catch((err) => {
        res.send(err)
    });
})

module.exports = router;