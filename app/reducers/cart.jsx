import axios from 'axios';

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

// Constant
const ADD_TO_CART = 'ADD_TO_CART';

// Reducer
const reducer = (lineItems = [], action) => {

  switch (action.type) {
    case ADD_TO_CART:
      console.log("Starting ADD_TO_CART");
      // Clone lineItems to be a pure function
      let newCart = [...lineItems];
      // Create while loop to break when match is found
      let index = 0;
      let foundMatchingItemInCart = false; // we are not sure yet
      // so we search the items in the cart
      while (!foundMatchingItemInCart && index < newCart.length) {
        console.log("Inside of while loop");
        // If we are adding quantity to an item already represented by a line item in the cart
        if (newCart[index].product.id === action.lineItem.product.id) {
          console.log("Start of match found");
          // Update the quantity of the existing line item in the cart
          newCart[index].quantity += action.lineItem.quantity;
          foundMatchingItemInCart = true;
          console.log("Appending quantity to existing cart line item");
        }
        index++;
      }
      // Otherwise add a new line item to the cart.
      if (!foundMatchingItemInCart) {
        newCart.push(action.lineItem);
        console.log("Adding new line item to cart");
      }
      // And then save the cart as a string to localstorage under the key cart
      localStorage.setItem('cart', JSON.stringify(newCart))
      // And then return the new cart to redux
      return newCart;
    default:
      // If the Redux store is empty, check to see if there is cart state frozen in localStorage under 'cart'
      let defrostedCart = localStorage.getItem('cart');
      if (defrostedCart) {
        // and return it if there is.
        return JSON.parse(defrostedCart)
      } else {
        // Otherwise, just return the default params of lineItems
        return lineItems;
      }
  } // state.cart
};

// Action Creator
export function addToCart(product, quantity) {
  return {
    type: ADD_TO_CART,
    lineItem: { product, quantity }
  };
}

export function submitOrder(cart) {
  [
    {
      product: {},
      quantity: 1
    }
  ]

  let orderLineItems = {};
  cart.forEach(item => {
    let itemObj = { quantity: item.quantity };
    orderLineItems[item.product.id] = itemObj;
  })
  let order = {
    shippingCarrier: 'UPS',
    orderLineItems: orderLineItems
  }
  let data = JSON.stringify(order)
  console.log(data);
  return function (dispatch) {
    axios.post('/api/orders/', order)
      .then((order) => alert('',order))
      .catch((err) => alert(err))
  }
}

// props.cart[0].productId
// props.cart[0].quantity
// Dispatch
// addItemToCart
// modifyCountOfItem
// removeItemFromCart
// checkout



export default reducer;
