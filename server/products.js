'use strict'

const db = require('../db')
const Product = require('../db/models/product')

module.exports = require('express').Router()

  // List all the cookies
  .get('/', (req, res, next) =>
    Product.findAll()
      .then(products => res.json(products))
      .catch(next))

  // Create a new type of cookie
  .post('/', (req, res, next) =>
    Product.create(req.body)
      .then(product => res.json(product))
      .catch(next))

  // Get a single type of cookie by cookie id
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

  // Modify a cookie by id
  .put('/:id', (req, res, next) => {
    let idAsNumber = parseInt(req.params.id, 10);
    if (isNaN(idAsNumber)) res.sendStatus(400)
    Product.findById(idAsNumber)
      .then((product) => product.update(req.body))
      .then((order) => res.status(200).json(order))
      .catch(next)
  })

  // Delete a cookie by id. Oh NOOO!!!
  .delete('/:id', (req, res, next) => {
    let idAsNumber = parseInt(req.params.id, 10);
    if (isNaN(idAsNumber)) res.sendStatus(400)
    Product.findById(idAsNumber)
      .then((product) => product.destroy())
      .then(() => res.sendStatus(200))
      .catch(next)
  })
