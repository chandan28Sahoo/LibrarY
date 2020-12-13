const express = require('express');
const router = express.Router();
const UserServiceT = require('../services/teachers');
const ServicesT = new UserServiceT();
const authServiceT = require('../auth/strategies/jwtMiddleware').verify_teacher


// teachers
router.get('/teachers', authServiceT, async(decoded, req, res, next) => {
    await ServicesT.check_user(decoded.data.email).then(async(data) => {
        if (data !== undefined && data.length !== 0) {
            const All_users = await ServicesT.findAll()
            res.send(All_users)
        } else {
            res.send("first login...!!")
        }
    })
})

//  teachers
router.get('/students/:id', authServiceT, async(decoded, req, res, next) => {
    let id = req.params.id;
    await ServicesT.check_user(decoded.data.email).then(async(data) => {
        // console.log(data);
        if (data !== undefined && data.length !== 0) {
            await ServicesT.find_By_Id(id).then((e) => {
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

// update teacher
router.put('/updatesT', authServiceT, async(decoded, req, res, next) => {
    await ServicesT.check_user(decoded.data.email).then(async(data) => {
        console.log(data.email);
        try {
            if (data !== undefined && data.length !== 0) {
                console.log("data", data);
                await ServicesT.updateByEmail(data.email, req.body)
                res.send(`message : ${data.email} successfully Update  !!`)
            }
        } catch (error) {
            console.log(error);
        }

    }).catch((err) => {
        res.send(err)
    })
})


// delete 
router.delete('/deleteT', authServiceT, async(decoded, req, res, next) => {
    await authServiceT.check_user(decoded.data.email).then(async(data) => {
        if (data !== undefined && data.length !== 0) {
            const Details = await authServiceT.delete_by_name(data.name);
            res.send("delete book successfully")
        } else {
            res.send("user not found");
        }
    })
})



module.exports = router;