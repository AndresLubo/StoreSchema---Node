const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const hashPassword = require('../pass-hash');

class UserService {
    constructor() {

    }

    async create(data) {

        const hash = await hashPassword(data.password)
        const newUser = await models.User.create({
            ...data,
            password: hash
        })

        delete newUser.dataValues.password
        return newUser
    }

    async find() {
        let rta = await models.User.findAll({
            include: ['customer']
        })
        return rta;
    }

    async findByEmail(email) {
        let rta = await models.User.findOne({
            where: {
                email
            }
        })
        return rta;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id)
        if (!user) throw boom.notFound('User Not Found')

        return user;
    }

    async update(id, changes) {
        const user = await this.findOne(id)
        let rta = await user.update(changes)
        return rta
    }

    async delete(id) {
        const user = await this.findOne(id)
        await user.destroy()
        return { id }
    }
}

module.exports = UserService;