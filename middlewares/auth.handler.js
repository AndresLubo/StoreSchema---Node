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

module.exports = { checkApiKey };