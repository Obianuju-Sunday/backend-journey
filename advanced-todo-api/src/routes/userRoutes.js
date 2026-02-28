const express = require("express")
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const { registerValidator, loginValidator } = require("../middleware/validators")

router.post("/register", registerValidator, registerUser)

router.post('/login', loginValidator, loginUser);


module.exports = router;