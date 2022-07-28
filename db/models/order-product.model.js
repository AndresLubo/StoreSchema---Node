const { Model, DataTypes, Sequelize } = require('sequelize')

const { PRODUCT_TABLE } = require('./product.model')
const { ORDER_TABLE } = require('./order.model')


const ORDER_PRODUCT_TABLE = 'orders-products'

const OrderProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    orderId: {
        field: 'order_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: ORDER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    productId: {
        field: 'product_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: PRODUCT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    amount: {
        allowNull: false,
        type: DataTypes.INTEGER
    }

}


class OrderProduct extends Model {
    static associate(models) {

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_PRODUCT_TABLE,
            modelName: 'OrderProduct',
            timestamps: false
        }
    }
}

module.exports = {
    ORDER_PRODUCT_TABLE,
    OrderProductSchema,
    OrderProduct,
}
