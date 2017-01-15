'use strict';

const db = require('../db');
const User = db.model('users');

const {mustBeLoggedIn, selfOnlyOrAdmin, forbidden} = require('./auth.filters');

module.exports = require('express').Router()


	.get('/', mustBeLoggedIn, (req, res, next) => {
		if (req.user.isAdmin) {
			User.findAll()
				.then(users => res.json(users))
				.catch(next)
		} else {
			forbidden('only admins can list all users')
		}
	})

	.post('/', mustBeLoggedIn, (req, res, next) => {
		if (req.user.isAdmin) {
			return User.create(req.body)
				.then(user => res.status(201).json(user))
				.catch(next)
		} else {
			forbidden('only admins can add users')
		}
	})

	// Use Param to DRY subsequent routes...
	// Implemented this when I thought there would be multiple routes
	.param('id', mustBeLoggedIn, selfOnlyOrAdmin("select"), function (req, res, next) {
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

	// TODO: Implement put
	// .put('/:id', (req, res, next) =>
	// 	res.status(200).json(req.user))

	// TODO: Implement delete
	// .delete('/:id', (req, res, next) =>
	// 	res.status(200).json(req.user))

