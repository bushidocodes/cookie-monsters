'use strict';

// Require our models. Running each module registers the model into sequelize
// so any other part of the application could call sequelize.model('User')
// to get access to the User model.

const User = require('./user');
const Product = require('./product');
const Order = require('./order');
const OrderLineItem = require('./orderLineItem');
const Review = require('./review');

User.hasMany(Review);
Order.belongsToMany(Product, { through: OrderLineItem });
Product.belongsToMany(Order, { through: OrderLineItem });

module.exports = {User};