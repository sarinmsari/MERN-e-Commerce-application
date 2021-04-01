import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({
      ...values,
      error: false,
      [name]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("error in signup"));
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New account was created succesfully. Please{" "}
            <Link to="/signin">LogIn Here</Link>
          </div>
        </div>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group mt-3">
              <label htmlFor="name" className="text-right">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleChange("name")}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="Password" className="text-right">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handleChange("password")}
              />
            </div>
            <button
              className="btn btn-success btn-block form-control mt-3"
              onClick={onSubmit}
            >
              SignUp
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign Up page" description="User can sign up here">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
