// In this file we will create 3 endpoints :-
// 1st for signup authentication
// 2nd for login authentication
// 3rd for getting user's account data like his mail id etc 

const express = require("express");
const router = express.Router();
const User = require("../Mongoose-Models/User");

// a) importing express-validator here :-
const { body, validationResult } = require('express-validator');

// b) importing bcryptjs here:-
const bcrypt = require('bcrypt');

// c) importing json web token (jwt)  :-
const jwt = require('jsonwebtoken');

// d) importing fetchuser middleware :-
const fetchuser = require("../middleware/fetchuser");

// d) making JWT_SECRET:-
const JWT_SECRET = "Gre$ght8";

// e) Route 1:-
// creating a user using "post" req, on end point "/api/auth/createuser".
// This route is for signup
// Dosent require login till this step.
// making req,res as async await.
// "/createuser", [], (req, res), the array is made using express validator

router.post("/createuser", [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Invalid password').isLength({ min: 5 })
], async (req, res) => {

    // making a variable success
    let success = false;

    // a) putting the logic inside try catch
    try {
        // 1) if there are errors , return bad rquest and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({success, errors: errors.array() });
        }

        // 2) check if the user exists with same email and then save it to database
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success = false;
            return res.status(400).json({success, error: "email already exists" });
        }

        // 3) adding salt and hashing the users password using bcryptjs
        //    becrypt returns a promise so we need to use await
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        // 4) saving the data inside users collection and making a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword
        });

        // 5) after doing the above work we will send token to the user and its id bec we have index on the id :-
        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
});


// f) Route 2 :-
//  now what will happen if the user login in his account.
// this route is for login.
// authenticate a user using "post" req, on end point "/api/auth/login".
router.post("/login", [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'password is empty').exists()
], async (req, res) => {

    // making a variable success
    let success = false;

    // 1) checking the errors again
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({success, errors: errors.array() });
    }

    // 2) destructuring email, password from req.body
    const { email, password } = req.body;

    // 3) wrapping logic inside try, catch
    try {

        // a) check if email entered during login exists in our database or not
        let user = await User.findOne({ email });
        if (!user) {
            success = false;
            return res.status(400).json({success, error: "Please enter corrrect credentials" });
        }

        // b) check if password entered during login exists in our database or not
        const passwordCompare = await bcrypt.compare(password, user.password)
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error: "Please enter corrrect credentials" });
        }

        // c) if email and password are both correct :-
        // we will send jwt token again
        const data = {
            user: {
                id: user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }
});


// g) Route 3:-
// after login we will show user's account to him
// Get loggedin user details using "post" req, on end point "/api/auth/getuser"

router.post("/getuser", fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("some error occured");
    }

});

module.exports = router;