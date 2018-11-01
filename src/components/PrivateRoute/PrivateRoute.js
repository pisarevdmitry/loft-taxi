import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getAuthState } from '../../modules/Auth';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class PrivateRoute extends PureComponent {
  static propTypes = {
    auth: PropTypes.bool.isRequired
  };

  render() {
    const { Component, auth, ...rest } = this.props;

    return auth ? <Component {...rest} /> : <Redirect to="/" />;
  }
}
const mapStateToProps = state => ({
  auth: getAuthState(state)
});
export default connect(mapStateToProps)(PrivateRoute);
