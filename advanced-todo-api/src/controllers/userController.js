const { validationResult } = require('express-validator');
const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();


const registerUser = async (req, res) => {

    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if user exists in the DB
    const { name, email, password } = req.body;
    const checkUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (checkUser.rows.length > 0) {
        return res.status(409).json({
            message: "Registration failed. Please try again."
        })
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Add newUSer to DB
    const newUser = await pool.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *", [name, email, hashedPassword]);
    const user = newUser.rows[0];

    res.status(201).json({
        message: "Registration successful.",
        data: {
            id: user.id,
            userName: user.name,
            email: user.email
        }
    })
}

const loginUser = async (req, res) => {

    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const userQuery = await pool.query("SELECT * FROM users WHERE email = $1",
        [email])

    if(userQuery.rows.length === 0){
        return res.status(401).json({
            message: "Invalid Credentials"
        })
    }

    const user = userQuery.rows[0];

    // compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    // Generate JWT
    const token = jwt.sign(
        {userId: user.id, email: user.email},
        process.env.JWT_SECRET,
        { expiresIn: "24h"}
    )

    res.status(200).json({
        message: "Login successful",
        token: token,
        userData: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
};

module.exports = {
    registerUser,
    loginUser
}