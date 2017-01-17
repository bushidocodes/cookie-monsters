import { combineReducers } from 'redux'

// Implement Dan Abramov's suggested solution for reseting a redux store on logout
// Added a localStorage.clear() to make sure that localStorage gets cleared out too
// http://stackoverflow.com/questions/35622588/how-to-reset-the-state-of-a-redux-store

const appReducer = combineReducers({
  auth: require('./auth').default,
  products: require('./products').default,
  cart: require('./cart').default,
  users: require('./users').default
})

const rootReducer = (state, action) => {
  if (action.type === 'AUTHENTICATED' && action.user === '') {
    localStorage.clear();
    state = undefined;
  }
  return appReducer(state, action)
}

export default rootReducer
