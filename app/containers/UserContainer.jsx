import User from '../components/User.jsx';
import { connect } from 'react-redux';
import {updateProfile} from '../reducers/users';
import {browserHistory} from 'react-router';

function mapStateToProps(state) {
  return {
    user: state.users.selectedUser,
    auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateProfile: (userId, username) => {
      dispatch(updateProfile(userId, username));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
