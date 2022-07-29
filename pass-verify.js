const bcrypt = require('bcrypt');

const verifyPassword = async(password, hash) => await bcrypt.compare(password, hash)

module.exports = verifyPassword;