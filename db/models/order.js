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
      // TODO: fix total so that it actually generates a working total.
      total: function () {
        let runningTotal = 0.00;
        // let myLineItems = this.getOrderLineItems();
        // this.getProducts()
        // .then((items)=> console.log(items));
        // myLineItems.forEach((lineItem) => {
          // runningTotal += lineItem.subtotal;
        // });
        runningTotal += this.shippingRate;
        return runningTotal;
      }
    }
  }
)

module.exports = Order
