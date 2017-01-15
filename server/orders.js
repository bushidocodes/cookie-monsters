'use strict'

const db = require('../db')
const Order = require('../db/models/order')
const Product = require('../db/models/product')
const User = require('../db/models/user')
const Promise = require('bluebird');
const {mustBeLoggedIn, forbidden} = require('./auth.filters');

module.exports = require('express').Router()

	// Action: Retrieve all orders, including products and orderlineitem details
	// Roles: Admin
	.get('/', mustBeLoggedIn, (req, res, next) => {
		if (req.user.isAdmin) {
			return Order.findAll({
				include: [{
					model: Product,
					through: {
						attributes: ['quantity', 'price']
					}
				}]
			})
				.then(orders => _promisifyOrderProps(orders))
				.then(orders => Promise.all(orders))
				.then(orders => res.json(orders))
				.catch(next)
		} else {
			req.user.getOrders({
				include: [{
					model: Product,
					through: {
						attributes: ['quantity', 'price']
					}
				}]
			})
				.then(orders => _promisifyOrderProps(orders))
				.then(orders => Promise.all(orders))
				.then(orders => res.status(200).json(orders))
				.catch(next)
		}
	})

	// Action: Create a new order
	// Roles: Guest, User, Admin
	// Notes: The behavior of this action differs slightly
	//   based on the role of the user. If the user is a
	//   guest, they create an order unassociated with
	//   any single user
	//   User has actually ordered.
	.post('/:userId?', (req, res, next) => {
		if (req.user.isAdmin) {
			if (req.param.userId) {
				User.findById(req.param.userId)
					.then(user => user.create(req.body))
					.then(order => res.status(200).json(order))
					.catch(next)
			} else {
				Order.create(req.body)
					.then(order => res.status(200).json(order))
					.catch(next)
			}
		} else if (req.user.role === 'auth') {
			req.user.createOrder(req.body)
				.then(order => res.status(200).json(order))
				.catch(next)
		} else { // guest checkout
			Order.create(req.body)
				.then(order => res.status(200).json(order))
				.catch(next)
		}
	})

	// TODO: Enhance to be able to create items at the same time once
	//   Using this structure:

	// "order": {
	// 	"status": "cancelled",
	//   "shippingRate": 9.99,
	//   "shippingCarrier": null,
	//   "trackingNumber": null,
	// 	"orderLineItems": {
	// 		"2": { "quantity": 10 },
	// 		"10": { "quantity": 2 }
	// 	}
	// }

	// This is a non-functional starting point
	// .post('/', (req, res, next) =>
	// 	Order.create(req.body, {
	// 		include: [{
	// 			model: Product,
	// 			through: {
	// 				attributes: ['quantity', 'price']
	// 			}
	// 		}]
	// 	})
	// 		.then((order) => { })
	// 		.then(order => res.json(order))
	// 		.catch(next))

	// Action: Retrieve a single order, including products and orderlineitem details
	// Roles: Admin.
	// Notes: Perhaps a user should be able to view this for their orders...
	.get('/:orderId', mustBeLoggedIn, (req, res, next) => {
		if (req.user.isAdmin) {
			return Order.findById(req.params.orderId, {
				include: [{
					model: Product,
					through: {
						attributes: ['quantity', 'price']
					}
				}]
			}).then(orders => _promisifyOrderProps(orders))
				.then(order => res.json(order))
				.catch(next)
		} else {
			forbidden("You are not authorized to do this.");
		}
	})

	// Action: Update an order
	// Roles: Admin.
	.put('/:orderId', mustBeLoggedIn, (req, res, next) => {
		if (req.user.isAdmin) {
			return Order.findById(req.params.orderId)
				.then(order => order.update(req.body))
				.then(order => res.status(200).json(order))
				.catch(next)
		} else {
			forbidden("You are not authorized to do this.");
		}
	})

	// Action: Delete an order
	// Roles: Admin.
	.delete('/:orderId/', mustBeLoggedIn, (req, res, next) => {
		if (req.user.isAdmin) {
			return Order.findById(parseInt(req.params.orderId, 10))
				.then(order => order.destroy())
				.then(res.sendStatus(200))
				.catch(next);
		} else {
			forbidden("You are not authorized to do this.");
		}
	})

	// Action: Add several items to an order or update the item count in an order
	// Roles: Admin.
	// Example Request Body
	// {"orderLineItems": {
	// 	"2": {"quantity": 10},
	//  	"10": {"quantity": 2}
	// }}
	.post('/:orderId/products/', mustBeLoggedIn, (req, res, next) => {
		if (req.user.isAdmin) {
			let orderLineItems = req.body.orderLineItems;
			let productIds = Object.keys(orderLineItems);
			let order;
			Order.findById(req.params.orderId)
				.then(_order => {
					order = _order;
					return Promise.all(productIds.map(productId => Product.findById(productId)))
				})
				.then(products => {
					products.forEach((product) =>
						order.addProduct(product, {
							quantity: orderLineItems[product.id].quantity,
							price: product.price
						})
					)
				})
				.then(res.sendStatus(200))
				.catch(next)
		} else {
			forbidden("You are not authorized to do this.");
		}
	})

	// Action: Remove an item from an order
	// Roles: Admin.
	.delete('/:orderId/products/:productId', mustBeLoggedIn, (req, res, next) => {
		if (req.user.isAdmin) {
			return Order.findById(req.params.orderId)
				.then(order => order.removeProduct(req.params.productId))
				.then(res.sendStatus(200))
				.catch(next);
		} else {
			forbidden("You are not authorized to do this.");
		}
	})

// This is a kludgey looking helper function to deal with resolving a Promise
// returned by a Sequelize getter
// TODO : Clean up this nightmare somehow
function _promisifyOrderProps(orders) {
	return orders.map(
		({
			orderID,
			status,
			shippingRate,
			shippingCarrier,
			trackingNumber,
			created_at,
			products,
			total}) => Promise.props({
				orderID,
				status,
				shippingRate,
				shippingCarrier,
				trackingNumber,
				created_at,
				products,
				total
			}))
}