'use strict';

const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('../../db');
const Review = require('./review');

const Product = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.DECIMAL(16, 2),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  photo: Sequelize.STRING,
  categories: Sequelize.ARRAY(Sequelize.STRING)
});

Product.hasMany(Review);
module.exports = Product;
