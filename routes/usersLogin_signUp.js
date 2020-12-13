const express = require('express');
const router = express.Router();
const UserServiceT = require('../services/teachers');
const UserServiceS = require('../services/students');
const ServicesT = new UserServiceT();
const ServicesS = new UserServiceS();
const jwt = require('jsonwebtoken');



//  check user type
router.post('/user', async(req, res) => {
    let user = req.body
    if (user.user_type === "teacher") {
        res.redirect('/signup_teacher')
    } else {
        res.redirect('/signup_student')
    }
})

// sign up teacher
router.post('/signup_teacher', async(req, res) => {
    await ServicesT.createUsers_teacher(req.body).then(user => {
        res.send({ "success": `${user.email} registered successfully!` })
    }).catch(err => {
        res.send(err);
    })
})


// sign up students
router.post('/signup_student', async(req, res) => {
    await ServicesS.createUsers_student(req.body).then(user => {
        res.send({ "success": `${user.email} registered successfully!` })
    }).catch(err => {
        res.send(err);
    })
})


// login teachers
router.post('/login_teacher', async(req, res) => {
    await ServicesT.check_user(req.body.email).then((data) => {
        if (data === undefined && data.length === 0) {
            res.send({ "sorry": `account doesn't exist!` });
        } else {
            if (data.password === req.body.password) {
                let token = jwt.sign({ data }, process.env.SECRET_KEY);
                res.cookie('token', token)
                res.json({
                    "msg": "sucessfully logged in..",
                    "token": token
                })
            } else {
                res.send({ "wrong password": "try again " })
            }
        }
    })
})


// login students
router.post('/login_students', async(req, res) => {
    await ServicesS.check_user(req.body.email).then((data) => {
        if (data == undefined) {
            res.send({ "sorry": `account doesn't exist!` });
        } else {
            if (data.password === req.body.password) {
                // console.log(data);
                let token = jwt.sign({ data }, process.env.SECRET_KEY);
                res.cookie('token', token)
                res.json({
                    "msg": "sucessfully logged in..",
                    "token": token
                })
            } else {
                res.send({ "wrong password": "try again " })
            }
        }
    })
})


module.exports = router;