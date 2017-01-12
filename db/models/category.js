'use strict';

const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('../../db');
const Product = require('./product');

// OB/EPS: consider removing this model in favor of an array of string in product
const Category = db.define('categories', {
  name: {
    // OB/EPS: consider unique validator
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = Category;
