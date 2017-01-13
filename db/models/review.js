'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('../../db')

const Review = db.define('reviews', {
	title: {
		type: Sequelize.STRING,
		allowNull: false
		// OB/EPS: consider not empty validator
	},
	body: {
		type: Sequelize.TEXT
	},
	rating: {
		type: Sequelize.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			max: 5
		}
	},
	photo: {
		type: Sequelize.STRING,
		validate: {
			isUrl: true
		}
	}
});



module.exports = Review;