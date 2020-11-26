const dotenv = require('dotenv')
dotenv.config();
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const User = require('../models/userModel.js');
exports.register = async (req, res, next) => {
    const { username, email, password, city } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(403).json({ message: 'Email already in use!' });
        // res.setTimeout(40000, () =>{
        //     return res.status(403).json({ error: { message: 'Email already in use!' } });
        //  });
    }
    const newUser = new User({ username, email, password, city })
    try {
        await newUser.save();
        const token = getSignedToken(newUser);
        res.status(200).json({ token });
    }
    catch(error){
        error.status = 400;
        next(error);
    }
   

}

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
        return res.status(403).json({ message: 'invalid email/password' });
    const isValid = await user.isPasswordValid(password);
    if (!isValid)
        return res.status(403).json({ message: 'invalid email/password' });
    const token = getSignedToken(user);
    res.status(200).json({ token })

}

getSignedToken = user => {
    return jwt.sign({
        id: user._id,
        email: user.email,
        name: user.username,
    }, SECRET_KEY, { expiresIn: '1h' });
};