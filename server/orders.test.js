const request = require('supertest-as-promised')
const {expect} = require('chai')
const db = require('../db')
const User = require('../db/models/user')
const Order = require('../db/models/order')
const app = require('./start')

const bobTheAdmin = {
  name: 'bobTheAdmin',
  username: 'bob@admins.org',
  password: '12345',
  isAdmin: true
}

const dallas = {
  name: 'Dallas Malice',
  username: 'dallas@secrets.org',
  password: '12345',
  isAdmin: false
}

describe('/api/orders/', () => {

  describe('GET / (as Non-Admin)', () => {
    const agent = request.agent(app)
    let user, product, associatedOrder, unassociatedOrder;
    before('Create non-admin user and login', () =>
      db.didSync
        .then(() =>
          User.create(
            {
              name: dallas.name,
              email: dallas.username,
              password: dallas.password
            })
        )
        .then(_user => {
          user = _user;
          return agent
            .post('/api/auth/local/login')
            .send(dallas)
        })
        .then(res => user.createOrder())
        .then(_associatedOrder => associatedOrder = _associatedOrder)
        .then(_order => Order.create())
        .then(_unassociatedOrder => unassociatedOrder = _unassociatedOrder)
    )

    it('returns only the logged-in user orders', () => agent
      .get('/api/orders/')
      .expect(200)
      .then(res => {
        expect(res.body).to.have.lengthOf(1);
        expect(res.body[0].orderID).to.equal(associatedOrder.orderID);
      })
    )
    after('logoff and destroy non-admin user', () => {
      associatedOrder.destroy();
      unassociatedOrder.destroy();
      user.destroy();
      agent.post('/logout');
    })
  })

  describe('GET / (as Admin)', () => {
    let user, order;
    const agent = request.agent(app)
    before('Create Admin user and Login', () =>
      db.didSync
        .then(() =>
          User.create(
            {
              name: bobTheAdmin.name,
              email: bobTheAdmin.username,
              password: bobTheAdmin.password,
              isAdmin: bobTheAdmin.isAdmin
            })
        )
        .then(_user => {
          user = _user;
          return agent
            .post('/api/auth/local/login')
            .send(bobTheAdmin)
        })
        .then(res => Order.create())
        .then(_order => order = _order)
    )
    xit('returns all orders if admin', () => agent
      .get('/api/orders/')
      .expect(200)
      .then(res => expect(res.body).to.include(order))
      // TODO: Figure out how to make this test work.
      // I want to check to make sure that res.body
      // contains an order that has the same id as the
      // order stored in the order variable...
    )
    after('logoff and destroy non-admin user', () => {
      user.destroy();
      agent.post('/logout');
    })
  })


  xdescribe('POST / (as Guest)', () => {

  })
  describe('POST / (as Non-Admin)', () => {
    const agent = request.agent(app)
    let user, orderID;
    before('Create Non-Admin user and Login', () =>
      db.didSync
        .then(() =>
          User.create(
            {
              name: dallas.name,
              email: dallas.username,
              password: dallas.password
            })
        )
        .then(_user => {
          user = _user;
          return agent
            .post('/api/auth/local/login')
            .send(dallas)
        })
    )
    it('adds an order associated with the current logged in user', () => agent
      .post('/api/orders/')
      .send({ "shippingCarrier": "UPS" })
      .expect(200)
      .then(res => {
        orderID = res.body.orderID;
        expect(res.body.shippingCarrier).to.equal('UPS');
        expect(res.body).to.have.property('orderID');
        expect(res.body.user_id).to.equal(user.id);
      })
    )
    after('logoff, destroy posts, and destroy non-admin user', () => {
      agent.post('/logout');
      user.destroy();
      if (orderID) {
        Order.findById(orderID)
          .then(order => order.destroy());
      }
    })
  })
  describe('POST / (as Admin)', () => {
    const agent = request.agent(app)
    let user, orderID;
    before('Create Admin user and Login', () =>
      db.didSync
        .then(() =>
          User.create(
            {
              name: bobTheAdmin.name,
              email: bobTheAdmin.username,
              password: bobTheAdmin.password,
              isAdmin: bobTheAdmin.isAdmin
            })
        )
        .then(_user => {
          user = _user;
          return agent
            .post('/api/auth/local/login')
            .send(bobTheAdmin)
        })
    )
    it('adds an order unassociated with a particular user', () => agent
      .post('/api/orders/')
      .send({ "shippingCarrier": "USPS" })
      .expect(200)
      .then(res => {
        orderID = res.body.orderID;
        expect(res.body.shippingCarrier).to.equal('USPS');
        expect(res.body).to.have.property('orderID');
        expect(res.body).to.have.property('user_id');
        expect(res.body.user_id).to.be.null;
      })
    )
    after('logoff, destroy posts, and destroy admin user', () => {
      agent.post('/logout');
      user.destroy();
      Order.findById(orderID)
        .then(order => order.destroy());
    })
  })
})