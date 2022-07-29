const express = require('express');
const passport = require('passport');
const signToken = require('../token-sign')

const router = express.Router();

router.post('/login',
    passport.authenticate('local', { session: false }),

    async(req, res, next) => {
        try {
            const user = req.user;

            const payload = {
                sub: user.id,
                role: user.role
            }

            const token = signToken(payload);
            res.json({
                user,
                token
            })
        } catch (error) {
            next(error);
        }
    });


module.exports = router;