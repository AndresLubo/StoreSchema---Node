'use strict';
const { DataTypes } = require('sequelize')
const { CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
    async up(queryInterface) {
        await queryInterface.changeColumn(CUSTOMER_TABLE, 'userId', {
            allowNull: false,
            type: DataTypes.INTEGER,
            field: 'user_id',
            unique: true
        })
    },

    // async down(queryInterface) {
    //     //
    // }
};
