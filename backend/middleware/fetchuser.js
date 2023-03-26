// this file will be used as middfleware where we will get id from jwt

// importing json web token (jwt)  :-
const jwt = require('jsonwebtoken');

// making JWT_SECRET:-
const JWT_SECRET = "Gre$ght8";

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "Please authenicate using a valid user" });
    }

    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenicate using a valid user" });
    }
}

module.exports = fetchuser;