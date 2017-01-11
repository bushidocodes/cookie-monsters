'use strict'

const db = require('../db')
const Category = require('../db/models/category')

module.exports = require('express').Router()
  .get('/', (req, res, next) =>
    Category.findAll()
    .then(categories => res.json(categories))
    .catch(next))
  .post('/', (req, res, next) =>
    Category.create(req.body)
    .then(category => res.json(category))
    .catch(next))
