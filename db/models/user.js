'use strict';

const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const db = require('APP/db');

const Review = require('./review');
// const Order = require('./order');


const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  billingAddress: Sequelize.STRING,
  billingCity: Sequelize.STRING,
  billingState: Sequelize.STRING,
  billingZip: Sequelize.INTEGER,

  shippingAddress: Sequelize.STRING,
  shippingCity: Sequelize.STRING,
  shippingState: Sequelize.STRING,
  shippingZip: Sequelize.INTEGER,

  // We support oauth, so users may or may not have passwords.
  password_digest: Sequelize.STRING,
  password: Sequelize.VIRTUAL,
  resetPassword: Sequelize.BOOLEAN,

  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  role: {
    type: Sequelize.ENUM('unauth', 'auth'),
    defaultValue: 'unauth'
  }
}, {
  indexes: [{ fields: ['email'], unique: true }],
  hooks: {
    beforeCreate: setEmailAndPassword,
    beforeUpdate: setEmailAndPassword
  },
  instanceMethods: {
    authenticate(plaintext) {
      return new Promise((resolve, reject) =>
        bcrypt.compare(plaintext, this.password_digest,
          (err, result) =>
          err ? reject(err) : resolve(result))
      );
    }
  }
});

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase();
  if (!user.password) return Promise.resolve(user);

  return new Promise((resolve, reject) =>
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) reject(err);
      user.set('password_digest', hash);
      resolve(user);
    })
  );
}

User.hasMany(Review);
// User.hasMany(Order);

module.exports = User;
