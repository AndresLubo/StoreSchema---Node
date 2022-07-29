const { Strategy } = require('passport-local');
const boom = require('@hapi/boom')
const UserService = require('../../../services/user.service');
const verifyPassword = require('../../../pass-verify')

const service = new UserService();

const LocalStrategy = new Strategy({
    usernameField: 'email',
}, async(email, password, done) => {
    try {
        const user = await service.findByEmail(email)

        if (!user) done(boom.unauthorized('El usuario no existe'), false)

        const isMatch = await verifyPassword(password, user.password)

        if (!isMatch) done(boom.unauthorized('Contraseña erronea'), false)

        delete user.dataValues.password
        done(null, user)

    } catch (error) {
        done(error, false)
    }
});

module.exports = LocalStrategy;