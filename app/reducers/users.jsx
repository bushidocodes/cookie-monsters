import axios from 'axios';

// Constants
const GET_USERS = 'GET_USERS';
const SELECT_USER = 'SELECT_USER';

// Reducers
const initialUsersState = {
  users: [],
  selectedUser: {}
};

const reducer = (state = initialUsersState, action) => {

  const newState = Object.assign({}, state);

  switch (action.type) {
    case GET_USERS:
      newState.users = action.users;
      break;
    case SELECT_USER:
      newState.selectedUser = action.selectedUser;
      break;
    default:
      return state;
  }
  return newState
};

// Actions
export const getUsers = users => ({
  type: GET_USERS, users
});

export const selectUser = selectedUser => ({
  type: SELECT_USER, selectedUser
});

export function receiveUsers() {
  console.log("Receiving Users");
  // Return a thunk
  return function (dispatch) {
    axios.get('/api/users/')
      .then((res) => dispatch(getUsers(res.data)))
      .catch((err) => alert(err))
  }
}

// export const signup = (username, password) =>
//   dispatch =>
//     axios.post('/api/auth/local/signup',
//       { username, password })
//       .then(() => dispatch(whoami()))
//       .catch(() => dispatch(whoami()))

// export const logout = () =>
//   dispatch => {
//     console.log('dispatch: ', dispatch)
//     axios.post('/api/auth/logout')
//       .then(() => dispatch(whoami()))
//       .catch(() => dispatch(whoami()))
//   }

// export const whoami = () =>
//   dispatch =>
//     axios.get('/api/auth/whoami')
//       .then(response => {
//         const user = response.data
//         dispatch(authenticated(user))
//       })
//       .catch(failed => dispatch(authenticated(null)))

export default reducer
