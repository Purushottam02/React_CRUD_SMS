import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRegistrationDetails } from "./redux/actions/authActions";
import { signUp } from "../services/authServices";

const Register = () => {
  const navigate = useNavigate();
  const register = useSelector(
    (state) => state.authorisation.registrationDetails
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = {
      ...register,
      [name]: value,
    };
    console.log("form", updatedForm);
    dispatch(setRegistrationDetails(updatedForm));
  };
  console.log("register", register);
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const isRegistered = await signUp(register);

      if (isRegistered) {
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
