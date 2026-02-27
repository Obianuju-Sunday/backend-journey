const pool = require("./src/config/db"); 
require("dotenv").config();
const express = require("express");
const app = express();
const helmet = require("helmet");
const userRoutes = require("./src/routes/userRoutes")
const authLimiter = require("./src/middleware/rateLimiter")

app.use(express.json());
app.use(helmet());
app.use("/auth", authLimiter, userRoutes);

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "All clear!"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`)
})