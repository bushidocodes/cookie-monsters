'use strict';

const db = require('../db');
const User = db.model('users');

const {mustBeLoggedIn, forbidden} = require('./auth.filters');

module.exports = require('express').Router()
	.get('/', forbidden('only admins can list users'), (req, res, next) =>
		User.findAll()
			.then(users => res.json(users))
			.catch(next))
	.post('/', (req, res, next) =>
		User.create(req.body)
			.then(user => res.status(201).json(user))
			.catch(next))

	// Use Param to DRY subsequent routes...
	// Implemented this when I thought there would be multiple routes
	.param('id', mustBeLoggedIn, function (req, res, next) {
		User.findById(req.params.id)
			.then(user => {
				if (user) {
					req.user = user;
					next();
				} else {
					res.sendStatus(404);
				}
			})
			.catch(next);
	})

	.get('/:id', (req, res, next) =>
		res.status(200).json(req.user))