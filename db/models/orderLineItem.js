'use strict'

const Order = require('./order.js');
const Product = require('./product.js');
const Sequelize = require('sequelize');
const db = require('../../db');

// OB/EPS: code comments—yay!
// An OrderLineItem is effectively a join table with extra attributes

// Example Syntax for adding a product to an order
// TODO: Make sure that we're passing by value

// currentOrder.addProduct(selectedProduct, {
//   quantity: 1,
//   price: selectedProduct.price
// })

const OrderLineItem = db.define('orderLineItems', { // OB/EPS: nice name!
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true // OB/EPS: what does this do for integers?
      // OB/EPS: consider min validator
    }
  },
  price: {
    type: Sequelize.DECIMAL(16, 2), // OB/EPS: integer + cents is an alternative
    allowNull: false,
    validate: {
      notEmpty: true
      // OB/EPS: consider min validator
    }
  }
}, {
    getterMethods: {
      subtotal: function () {
        return this.quantity * this.price;
      }
    }
  }
)

// OB/EPS: watch out for defining associations in model files, can lead to circular requires
Order.belongsToMany(Product, { through: OrderLineItem });
Product.belongsToMany(Order, { through: OrderLineItem });


module.exports = OrderLineItem
