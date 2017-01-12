'use strict'

const Sequelize = require('sequelize')
const db = require('../../db')

const Order = db.define('orders', {
  orderID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
    defaultValue: 'created',
    allowNull: false
  },
  shippingRate: {
    type: Sequelize.DECIMAL(16, 2),
    defaultValue: 3.95,
    validate: {
      notEmpty: true
    }
  },
  shippingCarrier: {
    type: Sequelize.ENUM('USPS', 'UPS', 'FedEx'),
    allowNull: true
  },
  trackingNumber: {
    type: Sequelize.STRING,
    allowNull: true
  }
}
  , {
    getterMethods: {
      total: function () {
        let runningTotal = 0.00;
        return this.getProducts()
          .then(products => {
            products.forEach(
              product => runningTotal += product.orderLineItems.subtotal
            )
            runningTotal += this.shippingRate
            console.log(runningTotal);
            return runningTotal;
          })
      }
    }
  }
)

module.exports = Order
