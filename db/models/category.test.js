'use strict'

const db = require('../../db')
const Product = require('./product')
const Category = require('./category')
const {expect} = require('chai')

describe('Category', () => {
  before('wait for the db', () => db.didSync)
  let testCookie;
  let testCategory;
  beforeEach(() => {
    testCookie = Product.build({
        name: 'Chocolate Chip',
        description: 'The classic. Enjoy with a tall glass of cold milk.',
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/chocolate-chip.jpg'
    });
    testCategory = Category.build({
        name: 'chocolate'
      });
    // OB/EPS: watch out for undead code
    // testCookie.addCategory(testCategory.id)
  })

  describe('create category', () => {
    it('has a name', () =>
      expect(testCategory.name).to.equal('chocolate'))

    // it('links to a product', () =>
    //   expect(testCookie.category_id).to.equal('Chocolate Chip'))
  })
})
