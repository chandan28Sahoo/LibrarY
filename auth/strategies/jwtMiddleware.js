const jwt = require("jsonwebtoken");

function verify_teacher(req, res, next) {
    let token = req.headers.cookie;
    if (token !== undefined) {
        jwt.verify(token.slice(6), process.env.SECRET_KEY, (err, result) => {
            if (err) {
                res.send(err);
            }
            next(result);
        });
    } else {
        res.send("login please !");
    }
}

function verify_student(req, res, next) {
    let token = req.headers.cookie;
    if (token !== undefined) {
        jwt.verify(token.slice(6), process.env.SECRET_KEY, (err, result) => {
            if (err) {
                res.send(err);
            }
            next(result);
        });
    } else {
        res.send("login please !");
    }
}

// admin of library
function verify_librarian(req, res, next) {
    let token = req.headers.cookie;
    if (token !== undefined) {
        jwt.verify(token.slice(6), process.env.SECRET_KEY, (err, result) => {
            if (err) {
                res.send(err);
            }else{
                if (result.data.email === "akhilesh19@navgurukul.org") {
                    next();
                } else {
                    res.send("You are not principal");
                }
            }
        });
    } else {
        res.send("login please !");
    }
}

// super admin
function verifySuperAdmin(req, res, next) {
    let token = req.headers.cookie;
    if (token !== undefined) {
        jwt.verify(token.slice(6), process.env.SECRET_KEY, (err, result) => {
            if (err) {
                res.send(err);
            }else{
                if (result.data.email === "anand18@navgurukul.org") {
                    next();
                } else {
                    res.send("You are not principal");
                }
            }
        });
    } else {
        res.send("Invalid token");
    }
}
module.exports = {
    verify_teacher,
    verify_student,
    verify_librarian,
    verifySuperAdmin,
};
