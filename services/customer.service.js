const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const hashPassword = require('../pass-hash');

class CustomerService {
    constructor() {}


    async create(data) {

        const hash = await hashPassword(data.user.password)
        const newData = {
            ...data,
            user: {
                ...data.user,
                password: hash
            }
        }
        const newCustomer = await models.Customer.create(newData, {
            include: ['user']
        })

        delete newCustomer.user.dataValues.password
        return newCustomer;
    }

    async find() {
        const rta = await models.Customer.findAll({
            include: ['user']
        });
        return rta;
    }

    async findOne(id) {
        const customer = await models.Customer.findByPk(id, { include: ['user'] });
        if (!customer) throw boom.notFound('Customer Not Found')

        return customer;
    }

    async update(id, changes) {
        const customer = await this.findOne(id)
        let rta = await customer.update(changes)
        return rta
    }

    async delete(id) {
        const customer = await this.findOne(id)
        await customer.destroy()
        return { id }
    }
}


module.exports = CustomerService