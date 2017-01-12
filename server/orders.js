'use strict'

const db = require('../db')
const Order = require('../db/models/order')
const Product = require('../db/models/product')
const Promise = require('bluebird');

module.exports = require('express').Router()

	// Retrieve all orders, including products and orderlineitem details
	.get('/', (req, res, next) =>
		Order.findAll({
			include: [{
				model: Product,
				through: {
					attributes: ['quantity', 'price']
				}
			}]
		})
			.then((orders) => orders.map(
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
					})))
			.then(orders => Promise.all(orders))
			.then(orders => res.json(orders))
			.catch(next)
	)


	// Create a new empty order without products
	// The request body may contain status, shippingRate, shippingCarrier, or trackingNumber
	// TODO Enhance to be able to create items at the same time once
	// This should be done when the Redux store structure is better understood
	.post('/', (req, res, next) =>
		Order.create(req.body)
			.then(product => res.json(product))
			.catch(next))

	// Retrieve a single order, including products and orderlineitem details
	.get('/:orderId', (req, res, next) => {
		let idAsNumber = parseInt(req.params.orderId, 10);
		if (!isNaN(idAsNumber)) {
			Order.findById(idAsNumber, {
				include: [{
					model: Product,
					through: {
						attributes: ['quantity', 'price']
					}
				}]
			}).then(({
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
				.then((order) => res.json(order))
				.catch(next)
		} else {
			res.sendStatus(400)
		}
	})

	// Update an order
	.put('/:orderId', (req, res, next) => {
		let idAsNumber = parseInt(req.params.orderId, 10);
		if (!isNaN(idAsNumber)) {
			Order.findById(idAsNumber)
				.then((order) => order.update(req.body))
				.then((order) => res.status(200).json(order))
				.catch(next)
		} else {
			res.sendStatus(400)
		}
	})

	// Delete an order
	.delete('/:orderId/', (req, res, next) =>
		Order.findById(parseInt(req.params.orderId, 10))
			.then((order) => order.destroy())
			.then(res.sendStatus(200))
			.catch(next))

	// Add a single item to an order
	.post('/:orderId/products/:productId', (req, res, next) =>
		Order.findById(parseInt(req.params.orderId, 10))
			.then((order) => {
				Product.findById(parseInt(req.params.productId, 10))
					.then((product) => {
						order.addProduct(product, {
							quantity: 1,
							price: product.price
						})
					})
			})
			.then(res.sendStatus(200))
			.catch(next))

	// Add several items to an order or update the item count in an order
	.post('/:orderId/products/:productId/quantity/:quantity', (req, res, next) =>
		Order.findById(parseInt(req.params.orderId, 10))
			.then((order) => {
				Product.findById(parseInt(req.params.productId, 10))
					.then((product) => {
						order.addProduct(product, {
							quantity: parseInt(req.params.quantity, 10),
							price: product.price
						})
					})
			})
			.then(res.sendStatus(200))
			.catch(next))

	// Remove an item from an order
	.delete('/:orderId/products/:productId', (req, res, next) =>
		Order.findById(parseInt(req.params.orderId, 10))
			.then((order) => {
				Product.findById(parseInt(req.params.productId, 10))
					.then((product) => {
						product.destroy()
					})
			})
			.then(res.sendStatus(200))
			.catch(next))