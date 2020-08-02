import { connect } from 'react-redux';
import Login from '../../modules/Login';
import { setUser } from './index.duck';

const mapDispatchToProps = dispatch => ({
  setUser: value => dispatch(setUser(value))
});

export default connect(null, mapDispatchToProps)(Login);
