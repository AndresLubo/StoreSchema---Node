const UserService = require('./user.service')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt');
const signToken = require('../token-sign')
const tokenVerify = require('../token-verify')
const nodemailer = require('nodemailer')
const config = require('../config')
const hashPassword = require('../pass-hash')

const service = new UserService();



class AuthService {

    async getUser(email, password) {
        const user = await service.findByEmail(email)
        if (!user) throw boom.unauthorized()

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) throw boom.unauthorized()

        delete user.dataValues.password

        return user
    }


    signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role
        }
        const token = signToken(payload);
        return {
            user,
            token
        };
    }


    async sendRecovery(email) {
        const user = await service.findByEmail(email)

        if (!user) throw boom.unauthorized()

        const payload = {
            sub: user.id
        }

        const token = signToken(payload)
        const link = `http://myfrontend.com/recovery?token=${token}`
        await service.update(user.id, {
            recoveryToken: token
        })

        const mail = {
            from: config.mailAddress,
            to: `${user.email}`,
            subject: "Recuperación de contraseña",
            html: `<b>Ingresa al siguiente enlace => ${link}</b>`

        }

        const rta = await this.sendMail(mail)
        return rta
    }

    async changePassword(token, newPassword) {
        try {

            const payload = tokenVerify(token)
            const user = await service.findOne(payload.sub)

            if (user.recoveryToken !== token) throw boom.unauthorized()

            const hash = await hashPassword(newPassword)

            await service.update(user.id, {
                recoveryToken: null,
                password: hash
            })

            return { message: 'password changed' }

        } catch (error) {
            throw boom.unauthorized()
        }
    }


    async sendMail(infoMail) {

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: config.mailAddress,
                pass: config.mailPassword
            }
        })
        await transporter.sendMail(infoMail);

        return {
            message: 'Mail sent'
        }
    }
}

module.exports = AuthService;
