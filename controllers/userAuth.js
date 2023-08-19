const { userModel } = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const saltRounds = 10

const signup = async (req, res) => {
    // Existing user check 
    // hashing password
    // user creation
    // token generation

    const { email, fullName, password, education, city, countryCode, } = req.body;
    console.log(countryCode);
    let phone = req.body.phone;

    try {
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await userModel.create({
            email: email,
            fullName: fullName,
            city: city,
            education: education,
            password: hashedPassword,
            phone: phone
        });

        const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_KEY, (err, token) => {
            if (err)
                res.status(500).json({ message: "something went wrong" })
            res.status(200).json({ user: result, token: token})
        })



    } catch (error) {
        console.log(error);

    }

}


const login = async (req, res) => {
    // existing user check
    // password match 
    // generate token 

    console.log("hiii I am fine ");
    try {

        const { email, password } = req.body;
        const existingUser = await userModel.findOne({ email: email })
        if (!existingUser)
            return res.status(404).json({ message: "User not found" })


        const matchPassword = bcrypt.compare(password, existingUser.password);

        if (!matchPassword)
            return res.status(400).json({ message: "invalid credentials" });

        const token = jwt.sign({ email: existingUser, id: existingUser._id }, process.env.SECRET_KEY, (err, token) => {
            if (err)
                res.status(400).json({ message: "failed to generate token" })
            res.status(200).json({ user: existingUser, token: token ,valid:true});  //final response when everything is ok 
        })


    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Something went wrong" })

    }


}


module.exports = { signup, login }