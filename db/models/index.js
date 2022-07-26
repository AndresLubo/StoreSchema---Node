const { User, UserSchema } = require('./user.model')

const setupModels = (sequelize) => {
    User.init(UserSchema, User.config(sequelize))
}


module.exports = setupModels
