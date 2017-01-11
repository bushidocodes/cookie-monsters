'use strict';

const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('../../db');
const Category = require('./category');

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
  photo: Sequelize.STRING
});

Product.belongsToMany(Category, { through: 'productCategories' });

module.exports = Product;
