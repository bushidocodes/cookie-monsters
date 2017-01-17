'use strict'

const db = require('../db')
const Product = require('../db/models/product')

module.exports = require('express').Router()

  // Action: List all the cookies
  // Roles: Guest, User, Admin
  .get('/', (req, res, next) =>
    Product.findAll()
      .then(products => {
        if (products.length > 0) {
          res.json(products);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(next))

  // Action: Create a new type of cookie
  // Roles: Admin
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

  // Action: List a single type of cookie by cookie id
  // Roles: Guest, User, Admin
  .get('/:id', (req, res, next) => {
    res.status(200).json(req.product)
  })

  // Action: Modify a cookie by id
  // Roles: Admin
  .put('/:id', (req, res, next) => {
    req.product.update(req.body)
      .then(order => res.status(200).json(order))
      .catch(next)
  })

  // Action: Delete a cookie by id. Oh NOOO!!!
  // Roles: Admin
  .delete('/:id', (req, res, next) => {
    req.product.destroy()
      .then(() => res.sendStatus(200))
      .catch(next)
  })
