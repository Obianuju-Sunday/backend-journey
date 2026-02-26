const pool = require("./src/config/db"); 
require("dotenv").config();
const express = require("express");
const userRoutes = require("./src/routes/userRoutes")
const app = express();
app.use(express.json());
app.use("/auth", userRoutes);

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "All clear!"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`App running on port ${process.env.PORT}`)
})