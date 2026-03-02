const User = require("../models/User");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        
     

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required",
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {

            return res.status(409).json({ message: "User Already Exist!" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
}


module.exports.login = async (req, res) => {

   
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                message: "email and password are required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {

            return res.status(401).json({ message: "User not exist!" })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(404).json({ message: "Invalid Email or Password!" })
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "7d" })

        res.status(201).json({
            message: "Login successfully",
            token,
            user: {

                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
}
