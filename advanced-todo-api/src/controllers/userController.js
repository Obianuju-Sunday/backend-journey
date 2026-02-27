

const registerUser = async (req,res) =>{
    console.log("Register Logic");
    res.json({
        message: "Register endpoint"
    })
}

const loginUser = async(req,res) =>{
    console.log("Login logic");
    res.json({
        message: "Login endpoint"
    })
};

module.exports = {
    registerUser,
    loginUser
}