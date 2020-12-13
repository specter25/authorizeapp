import React, { useState } from 'react';
import { register } from '../actions/authactions';

import { connect } from 'react-redux';

const Signup = ({ register }) => {
  const [loginData, setlogin] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = loginData;

  const handleLoginChange = (e) => {
    setlogin({ ...loginData, [e.target.name]: e.target.value });
    console.log(loginData);
  };
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log(loginData);

    register(loginData);
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h1 className="card-title text-center">Signup</h1>
          <form onSubmit={(e) => handleLoginSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                onChange={(e) => handleLoginChange(e)}
                type="text"
                name="name"
                className="form-control"
                id="name"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                onChange={(e) => handleLoginChange(e)}
                type="text"
                name="email"
                className="form-control"
                id="email"
                placeholder="Enter your Email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onChange={(e) => handleLoginChange(e)}
                type="password"
                name="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary submit">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { register })(Signup);
