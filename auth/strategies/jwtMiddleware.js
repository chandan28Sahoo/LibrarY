const jwt = require("jsonwebtoken");

function verify_teacher(req, res, next) {
    let token = req.headers.cookie;
    if (token !== undefined) {
        let headers = token.slice(6);
        let decoded = jwt.verify(headers, process.env.SECRET_KEY);
        if (decoded !== undefined && decoded.length !== 0) {
            next(decoded);
        } else {
            res.send("not found");
        }
    } else {
        res.send("login please !");
    }
}

function verify_student(req, res, next) {
    let token = req.headers.cookie;
    if (token !== undefined) {
        let headers = token.slice(6);
        let decoded = jwt.verify(headers, process.env.SECRET_KEY);
        if (decoded !== undefined && decoded.length !== 0) {
            next(decoded);
        } else {
            res.send("not found");
        }
    } else {
        res.send("login please !");
    }
}

// admin of library
function verify_librarian(req, res, next) {
    let token = req.headers.cookie;
    if (token !== undefined) {
        let headers = token.slice(6);
        let decoded = jwt.verify(headers, process.env.SECRET_KEY);
        if (decoded !== undefined && decoded.length !== 0) {
            if (decoded.data.email === "akhilesh19@navgurukul.org") {
                next();
            } else {
                res.send("You are not librarian");
            }
        } else {
            res.send("login please !!");
        }
    } else {
        res.send("login please !");
    }
}

// super admin
function verifySuperAdmin(req, res, next) {
    let token = req.headers.cookie;
    if (token !== undefined) {
        // console.log(token);
        let headers = token.slice(6);
        let decoded = jwt.verify(headers, process.env.SECRET_KEY);
        if (decoded !== undefined && decoded.length !== 0) {
            if (decoded.data.email === "anand18@navgurukul.org") {
                next();
            } else {
                res.send("You are not principal");
            }
        } else {
            res.send("Invalid request !!");
        }
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