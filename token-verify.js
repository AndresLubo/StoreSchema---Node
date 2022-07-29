const jwt = require('jsonwebtoken')
const config = require('./config')


const verifyToken = (token) => jwt.verify(token, config.jwtSecret)

module.exports = verifyToken;