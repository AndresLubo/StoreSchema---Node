// const express = require('express');
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const categoriesRouter = require('./categoriesRouter');

const routerApi = (server) => {
    server.use('/products', productsRouter);
    server.use('/users', usersRouter);
    server.use('/categories', categoriesRouter);
}

module.exports = routerApi;