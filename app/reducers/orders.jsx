import axios from 'axios';

// Constants
const GET_ORDERS = 'GET_ORDERS';
const SELECT_ORDER = 'SELECT_ORDERS';

// Reducers
export const initialOrdersState = {
  orders: [],
  selectedOrder: {}
};

const reducer = (state = initialOrdersState, action) => {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case GET_ORDERS:
      newState.orders = action.orders;
      break;
    case SELECT_ORDER:
      newState.selectedOrder = action.selectedOrder;
      break;
    default:
      return state;
  }
  return newState
};

// Actions
export const getOrders = orders => ({
  type: GET_ORDERS, orders
});

export const selectOrder = selectedOrder => ({
  type: SELECT_ORDER, selectedOrder
});

export function receiveOrders() {
  console.log("Receiving Orders");
  // Return a thunk
  return function (dispatch) {
    axios.get('/api/orders/')
      .then((res) => dispatch(getOrders(res.data)))
      .catch((err) => alert(err))
  }
}

export default reducer









// dispatch =>
//     axios.get('/api/auth/whoami')
//       .then(response => {
//         const user = response.data
//         dispatch(authenticated(user))
//       })
//       .catch(failed => dispatch(authenticated(null)))