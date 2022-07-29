const boom = require('@hapi/boom');
const config = require('../config');

function checkApiKey(req, res, next) {
    const apiKey = req.headers['api']
    console.log(typeof apiKey);
    if (apiKey === config.apiKey) {
        next()
    } else {
        next(boom.unauthorized('No estas autorizado'))
    }
}

function checkAdminRole(req, res, next) {
    const userRole = req.user.role
    if (userRole === 'admin') {
        next()
    } else {
        next(boom.unauthorized('No estas autorizado, no eres administrador'))
    }
}

function checkRoles(...roles) {
    return (req, res, next) => {
        const user = req.user
        if (roles.includes(user.role)) {
            next()
        } else {
            next(boom.unauthorized('No estas autorizado'))
        }
    }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles };