import axios from 'axios';

const ADD_TO_CART = 'ADD_TO_CART';

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

export const addToCart = item => ({
	type: ADD_TO_CART,
	item
});

export default reducer;