const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
    constructor() {}


    async create(data) {
        const newCustomer = await models.Customer.create(data)
    }

    async find() {
        const rta = await models.Customer.findAll();
        return rta;
    }

    async findOne(id) {
        const customer = await models.Customer.findByPk(id)
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
