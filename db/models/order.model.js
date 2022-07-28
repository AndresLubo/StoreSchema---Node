const { Model, DataTypes, Sequelize } = require('sequelize')

const { CUSTOMER_TABLE } = require('./customer.model')

const ORDER_TABLE = 'orders'

const OrderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CUSTOMER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    total: {
        // Este es un calculo que se hace en el backend y no se refleja en la base de datos
        // Un consejo para este tipo de calculos es realizarlos cuando no hay muchos items en la base de datos, cuando el volumen de datos es mucho más grande, es recomendable hacer los calculos con una query de la base de datos


        type: DataTypes.VIRTUAL,
        get() {
            if (this.items.length > 0) {
                return this.items.reduce((total, item) => {
                    return total + (item.price * item.OrderProduct.amount)
                }, 0)
            }
        }
    }
}


class Order extends Model {
    static associate(model) {
        this.belongsTo(model.Customer, {
            as: 'customer',
        })

        this.belongsToMany(model.Product, {
            as: 'items',
            through: model.OrderProduct,
            foreignKey: 'orderId',
            otherKey: 'productId',
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false
        }
    }
}

module.exports = {
    ORDER_TABLE,
    OrderSchema,
    Order,
}
