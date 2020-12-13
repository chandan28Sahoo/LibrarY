const express = require('express');
const router = express.Router();
const UserServiceS = require('../services/students');
const ServicesS = new UserServiceS();
const authServiceS = require('../auth/strategies/jwtMiddleware').verify_student

// get all students
router.get('/students', authServiceS, async(decoded, req, res, next) => {
    await ServicesS.check_user(decoded.data.email).then(async(data) => {
        if (data !== undefined && data.length !== 0) {
            const All_users = await ServicesS.findAll()
            res.send(All_users)
        } else {
            res.send("first login...!!")
        }
    })
})

// get students by id
router.get('/student/:id', authServiceS, async(decoded, req, res, next) => {
    let id = req.params.id;
    await ServicesS.check_user(decoded.data.email).then(async(data) => {
        console.log(data);
        if (data !== undefined && data.length !== 0) {
            await ServicesS.find_By_Id(id).then((e) => {
                if (!e) {
                    res.send({ "message": "user not found" })
                }
                res.send(e)
            });
        } else {
            res.send("first login...!!")
        }
    }).catch((err) => {
        res.send(err)
    })
})


// update students
router.put('/updates', authServiceS, async(decoded, req, res, next) => {
    await ServicesS.check_user(decoded.data.email).then(async(data) => {
        // console.log(data.email);
        try {
            if (data !== undefined && data.length !== 0) {
                console.log("data", data);
                await ServicesS.updateByEmail(data.email, req.body)
                res.send(`message : ${data.email} successfully Update  !!`)
            }
        } catch (error) {
            console.log(error);
        }

    }).catch((err) => {
        res.send(err)
    })
})

// delete students
router.delete('/delete', authServiceS, async(decoded, req, res, next) => {
    await ServicesS.check_user(decoded.data.email).then(async(data) => {
        if (data !== undefined && data.length !== 0) {
            const Details = await ServicesS.delete_by_name(data.name);
            res.send("delete book successfully")
        } else {
            res.send("user not found");
        }
    })
})

module.exports = router;