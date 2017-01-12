import axios from 'axios';

const reducer = (state=null, action) => {
  switch(action.type) {
  case RECEIVE_PRODUCTS:
    return action.products
  }
  return state
}

const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const receiveProducts = products => ({
    type: RECEIVE_PRODUCTS,
    products
});

export default reducer
