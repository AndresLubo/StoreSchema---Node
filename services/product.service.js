// const faker = require('faker');
const boom = require('@hapi/boom');
// const sequelize = require('../libs/sequelize');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
class ProductsService {

    constructor() {}

    async create(data) {
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    async find(query) {

        const options = {
            include: ['category'],
            where: {}
        }

        const { limit, offset, price, price_min, price_max } = query

        if (limit && offset) {
            options.limit = limit
            options.offset = offset
        }


        if (price) {
            options.where.price = price
        }

        if (price_min && price_max) {
            options.where.price = {
                [Op.between]: [price_min, price_max]
            }
        }

        const products = await models.Product.findAll(options);
        return products;
    }

    async findOne(id) {

    }

    async update(id, changes) {

    }

    async delete(id) {

    }

}

module.exports = ProductsService;
