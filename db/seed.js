const db = require('../db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))

const seedProducts = () => db.Promise.map([
  {name: 'Chocolate Chip', description: 'The classic. Enjoy with a tall glass of cold milk.', price: '1.50', quantity: 250, photo: 'images/cookies/chocolate-chip.jpg'},
  {name: 'Chocolate Chip with Walnuts', description: 'The classic favorite but good for your brain. Healthy!', price: '1.50', quantity: 250, photo: 'images/cookies/chocolate-chip-walnut.jpg'},
  {name: 'Oatmeal Raisin', description: 'Why would you order this? Really?.', price: '1.50', quantity: 250, photo: 'images/cookies/oatmeal-raisin.jpg'},
  {name: 'Oatmeal Chocolate Chip', description: 'This is an improvement on oatmeal raisin.', price: '1.50', quantity: 250, photo: 'images/cookies/oatmeal-choc-chip.jpg'},
  {name: 'Sugar Cookie with Frosting & Sprinkles', description: "It's festive and fun.", price: '1.50', quantity: 250, photo: 'images/cookies/sugar-cookie-frosting-sprinkles.jpg'},
  {name: 'Snickerdoodle', description: 'Sugar cookies with cinnamon. Enjoy with high tea.', price: '1.50', quantity: 250, photo: 'images/cookies/snickerdoodle.jpg'},
  {name: 'White Chocolate & Macadamia Nut', description: "Let's be clear: white chocolate is not really chocolate.", price: '1.50', quantity: 250, photo: 'white-choc-macadamia-nut.jpg'},
  {name: 'Gingerbread', description: 'Great all year round!', price: '1.50', quantity: 250, photo: 'images/cookies/gingerbread-man.jpg'},
  {name: 'Salted Caramel Chocolate Chip Cookie', description: 'For the hipsters out there.', price: '1.50', quantity: 250, photo: 'images/cookies/salted-caramel-choc-chip.jpg'},
  {name: 'Black & White Cookie', description: 'The race relations cookie made famous by Jerry Seinfeld.', price: '1.50', quantity: 250, photo: 'images/cookies/black-white.jpg'},
], product => db.model('products').create(product))


db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedProducts)
  .then(products => console.log(`Seeded ${products.length} products OK`))
  .catch(error => console.error(error))
  .finally(() => db.close())
