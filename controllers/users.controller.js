const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const asyncWrapper = require("../middleware/asyncWrapper");
const User = require('../models/user.model');

const getAllUsers = asyncWrapper(async (req, res) => {
    const query = req.query;
    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const users = await User.find({}, { "__v": false }).limit(limit).skip(skip);
    res.json({ status: httpStatus.OK, data: { users } });
});

const register = asyncWrapper(async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ status: httpStatus.BAD_REQUEST, message: "Missing required fields" });
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
        return res.status(400).json({ status: httpStatus.BAD_REQUEST, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ status: httpStatus.CREATED, data: { user: newUser } });
});

const login = asyncWrapper(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ status: httpStatus.BAD_REQUEST, message: "Invalid" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ status: httpStatus.BAD_REQUEST, message: "Invalid" });
    }

    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ status: httpStatus.OK, data: { user, token } });
});

module.exports = {
    getAllUsers,
    register,
    login
};
