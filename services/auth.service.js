const userService = require('./user.service')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt');
const signToken = require('../token-sign')
const nodemailer = require('nodemailer')
const config = require('../config')

const service = new userService();



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
        }
    }

    async sendMail(email) {

        const user = service.findByEmail(email)

        if (!user) throw boom.unauthorized()

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: config.mailAddress,
                pass: config.mailPassword
            }
        })


        await transporter.sendMail({
            from: config.mailAddress, // sender address
            to: `${user.email}`, // list of receivers
            subject: "Este es un nuevo correo", // Subject line
            text: "Correo de prueba", // plain text body
            html: "<b>Correo de prueba</b>", // html body
        });

        return {
            message: 'Mail sent'
        }
    }
}

module.exports = AuthService;