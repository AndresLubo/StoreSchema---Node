const bcrypt = require('bcrypt');

const myHash = '$2b$10$i6E6BuzzXQLmdBVkgUptzOED9CLjhBjEKAsXGrhbUj5MsKtUpQaMe'
const myPassword = 'admin123'

async function verifyPassword(password, hash) {
    const isMatch = await bcrypt.compare(password, hash)
    console.log(isMatch);
    return isMatch
}

verifyPassword(myPassword, myHash)