const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const encrypt = (password) => {
    return bcrypt.hash(password, 10);
}

const password_match = (password, user_data) => {
    return bcrypt.compare(
        password,
        user_data);
}

const tokenGenerator = async (data) => {

    const token = jwt.sign(data , PRIVATE_KEY, { expiresIn: '1d' });
    return token;

}

const refreshTokenGenerator = async (data) => {
    const refreshToken = jwt.sign({ userData: data }, PRIVATE_KEY, { expiresIn: '30d' });
    return refreshToken;
}

module.exports = {
    encrypt,
    password_match,
    tokenGenerator,
    refreshTokenGenerator,
}