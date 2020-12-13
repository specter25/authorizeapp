import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !auth.isAuthenticated && !auth.loading ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => {
  return { auth: state.authReducer };
};
export default connect(mapStateToProps, {})(PrivateRoute);
