const jwt = require('jsonwebtoken')
const config = require('./config')

const signToken = (payload) => jwt.sign(payload, config.jwtSecret)


module.exports = signToken;