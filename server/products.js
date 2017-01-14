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

  // Use Param to DRY subsequent routes
  .param('id', function (req, res, next) {
    Product.findById(req.params.id)
      .then(product => {
        if (product) {
          req.product = product;
          next();
        } else {
          res.sendStatus(404);
        }
      })
      .catch(next);
  })

  // Get a single type of cookie by cookie id
  .get('/:id', (req, res, next) => {
    res.status(200).json(req.product)
  })

  // Modify a cookie by id
  .put('/:id', (req, res, next) => {
    req.product.update(req.body)
      .then(order => res.status(200).json(order))
      .catch(next)
  })

  // Delete a cookie by id. Oh NOOO!!!
  .delete('/:id', (req, res, next) => {
    req.product.destroy()
      .then(() => res.sendStatus(200))
      .catch(next)
  })
