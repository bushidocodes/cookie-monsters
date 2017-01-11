'use strict'

const db = require('../db')
const Order = require('../db/models/order')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    Order.findAll()
    .then(orders => res.json(orders))
    .catch(next))
  .post('/', (req, res, next) =>
    Order.create(req.body)
    .then(product => res.json(product))
    .catch(next))
