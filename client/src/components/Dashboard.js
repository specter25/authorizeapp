import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';
import { logout } from '../actions/authactions';

const Dashboard = ({ auth: { user, loading }, logout }) => {
  return (
    !loading &&
    user && (
      <div>
        <Navbar />
        <br />
        <br />
        <p>This is the {user.user_name}</p>
        <p>
          Click{' '}
          <a
            href="#!!"
            onClick={(e) => {
              e.preventDefault();
              logout();
            }}>
            Logout
          </a>{' '}
          to get out{' '}
        </p>
      </div>
    )
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};
export default connect(mapStateToProps, { logout })(Dashboard);
