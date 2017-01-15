import Login from '../components/Login.jsx';
import {login} from '../reducers/auth';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => {
      dispatch(login(username, password));
      browserHistory.push('/');

    }
  }
}
export default connect (
  state => mapStateToProps,
  mapDispatchToProps,
) (Login)
