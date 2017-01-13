'use strict'

const db = require('../../db')
const Product = require('./product')
const {expect} = require('chai')

describe('Product', () => {
  before('wait for the db', () => db.didSync)

  // after(function (done) {
  //   db.connection.db.dropDatabase(function () {
  //       db.connection.close(function () {
  //           done();
  //       });
  //   });
  // });


  let testCookie;
  before(Product.create({
        name: 'Chocolate Chip',
        description: 'The classic. Enjoy with a tall glass of cold milk.',
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/chocolate-chip.jpg',
        categories: ['chocolate', 'classic']
      })
      .then(result => testCookie = result)
  )

  describe('check if cookie has been created', () => {
    it('makes sure the cookie has a name', () =>
      expect(testCookie.name).to.equal('Chocolate Chip'))
  })
})