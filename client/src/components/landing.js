import React, { useState } from 'react';
import Login from './login';
import Signup from './Signup';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Navbar from './Navbar';

const Landing = ({ isAuthenticated, register, login }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <div>
        <Navbar />
        <br />
        <div className="row container-fluid ">
          <div className="col-sm-6">
            <Login />
          </div>
          <div className="col-sm-6">
            <Signup />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};
export default connect(mapStateToProps, {})(Landing);
