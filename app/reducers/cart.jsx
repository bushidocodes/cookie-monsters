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


// var test =


// {
// 	"2": { quantity: 9 },
// 		"3": { quantity: 4 },
// 			"4": { quantity: 2 },
// 				"8": { quantity: 9 }


// }

// { productId: 3, quantity: 10 }

// Constant
const ADD_TO_CART = 'ADD_TO_CART';

// Reducer
const reducer = (lineItems = [], action) => {

	switch (action.type) {
		case ADD_TO_CART:
			let newState = [...lineItems, action.lineItem];
			localStorage.setItem('cart', JSON.stringify(newState))
			return newState;
		default:
			let defrostedCart = localStorage.getItem('cart');
			if (defrostedCart) {
				return JSON.parse(defrostedCart)
			} else {
				return lineItems;
			}
	}
}

// Action Creator
export function addToCart(product, quantity) {
	return {
		type: ADD_TO_CART,
		lineItem: { product, quantity }
	}
};

// props.cart[0].productId
// props.cart[0].quantity

// Dispatch

// addItemToCart

// modifyCountOfItem

// removeItemFromCart


// checkout

export default reducer;