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
const reducer = (state = [], action) => {
	let newState = Object.assign({}, state);

	switch(action.type) {
		case ADD_TO_CART:
		newState = action.item;
		break;
		default:
			return state;
	}
	return state;
}

// Action Creator
export const addToCart = item => ({
	type: ADD_TO_CART,
	item
});

// Dispatch

export default reducer;