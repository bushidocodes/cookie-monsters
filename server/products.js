'use strict'

const db = require('../db')
const Product = require('../db/models/product')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    Product.findAll()
      .then(products => res.json(products))
      .catch(next))
  .post('/', (req, res, next) =>
    Product.create(req.body)
      .then(product => res.json(product))
      .catch(next))
  .get('/:id', (req, res, next) => {
    let idAsNumber = parseInt(req.params.id, 10);
    if (!isNaN(idAsNumber)) {
    Product.findById(idAsNumber)
      .then((product) => res.json(product))
      .catch(next)
    } else {
      res.sendStatus(400)
    }
  })
