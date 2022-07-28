const express = require('express');

const CustomerService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const { updateCustomerSchema, createCustomerSchema, getCustomerSchema } = require('../schemas/customer.schema');


const router = express.Router();
const customer = new CustomerService();


router.get('/', async(req, res, next) => {
    try {
        const customers = await customer.find();
        res.json(customers);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',
    validatorHandler(getCustomerSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const findCustomer = await customer.findOne(id);
            res.json(findCustomer);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validatorHandler(createCustomerSchema, 'body'),
    async(req, res, next) => {
        try {
            const body = req.body;
            const newCustomer = await customer.create(body);
            res.status(201).json(newCustomer);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    validatorHandler(getCustomerSchema, 'params'),
    validatorHandler(updateCustomerSchema, 'body'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const customer = await customer.update(id, body);
            res.json(customer);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    validatorHandler(getCustomerSchema, 'params'),
    async(req, res, next) => {
        try {
            const { id } = req.params;
            await customer.delete(id);
            res.status(201).json({ id });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
